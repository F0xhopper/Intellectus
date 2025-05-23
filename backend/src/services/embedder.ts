import { supabaseClient } from "../utils/supabaseClient";
import { OpenAI } from "openai";

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Interface for search results
interface SearchResult {
  id: string;
  text: string;
  source_title: string;
  chunk_index: number;
}

/**
 * Chunk text into smaller pieces suitable for embedding
 */
function chunkText(text: string, maxChunkSize: number = 500): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length <= maxChunkSize) {
      currentChunk += (currentChunk ? " " : "") + sentence;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
      }
      currentChunk = sentence;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

/**
 * Convert text to embedding vector using OpenAI
 */
async function convertToEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error("Error creating embedding:", error);
    throw error;
  }
}

/**
 * Process a source and store its embeddings in Supabase with association to the source
 */
export async function embedSource(
  source: string,
  sourceId: number
): Promise<{ chunksProcessed: number }> {
  try {
    const client = supabaseClient();

    const chunks = chunkText(source);
    let chunksProcessed = 0;

    // Process each chunk and store in Supabase
    for (let i = 0; i < chunks.length; i++) {
      const embedding = await convertToEmbedding(chunks[i]);

      const record = {
        source_title: title || "unnamed-source",
        chunk_index: i,
        text: chunks[i],
        embedding,
      };

      // Insert into Supabase
      const { error } = await client.from("embeddings").insert(record);

      if (error) {
        console.error(`Error storing chunk ${i}:`, error);
        throw error;
      }

      chunksProcessed++;
    }

    return { chunksProcessed };
  } catch (error) {
    console.error("Error embedding source:", error);
    throw error;
  }
}

/**
 * Search for relevant content using vector similarity
 */
export async function searchEmbeddings(
  query: string,
  limit: number = 5
): Promise<SearchResult[]> {
  try {
    const client = supabaseClient();
    const queryEmbedding = await convertToEmbedding(query);

    // Search in Supabase using pgvector similarity search
    const { data, error } = await client.rpc("match_sources", {
      query_embedding: queryEmbedding,
      match_threshold: 0.5,
      match_count: limit,
    });

    if (error) {
      console.error("Error searching embeddings:", error);
      throw error;
    }

    return data as SearchResult[];
  } catch (error) {
    console.error("Error searching embeddings:", error);
    throw error;
  }
}

import e from "express";
import { supabaseClient } from "../utils/supabaseClient";
import { isURL } from "../utils/urlDetector";

interface ProcessedSource {
  content: string;
  type: "url" | "text" | "file";
}

/**
 * Function that takes in any source type and stores it in the DB in useful manner and returns
 * the source ID so it can be used in association in when storing the embeds
 * @param source
 * @param title
 * @returns
 */
export async function storeSource(source: any, title: string): Promise<number> {
  const client = supabaseClient();

  const processedSource = await processSource(source);

  const record = {
    title: title || "unnamed-source",
    source: processedSource.content,
    source_type: processedSource.type,
    length: processedSource.content.length,
  };

  const { data, error } = await client
    .from("sources")
    .insert(record)
    .select("id")
    .single();

  if (error) {
    throw new Error(`Failed to store source: ${error.message}`);
  }

  return data.id;
}

/**
 * Function to process any type of document including PDF, .txt, .word, Url etc into basic string
 * that will be stored purely in the DB, so they can be read in the library and referenced
 * when sources are given.
 * @param source
 */
export async function processSource(source: any): Promise<ProcessedSource> {
  if (isURL(source)) {
    const content = await fetchUrl(source);
    return {
      content,
      type: "url",
    };
  }

  // For now, treat everything else as plain text
  return {
    content: String(source),
    type: "text",
  };
}

/**
 * Function fetches the URL and processes the html into useful raw text for DB
 * @param url
 */
export async function fetchUrl(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }
    const html = await response.text();
    // TODO: Add proper HTML to text conversion
    return html;
  } catch (error) {
    throw new Error(
      `Error fetching URL: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

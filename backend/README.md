# Intellectus Backend

This is the backend service for Intellectus, providing APIs for document embedding and AI-powered question answering.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file based on `.env.example` with your credentials:

   ```
   PORT=3000
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   OPENAI_API_KEY=your_openai_api_key
   ```

3. Build the TypeScript code:
   ```
   npm run build
   ```

## Database Setup

The backend requires a Supabase database with a `knowledge_base` table that includes vector support for embeddings. Set up your Supabase database with the following SQL:

```sql
-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the knowledge_base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  text TEXT NOT NULL,
  embedding VECTOR(1536),
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a function to search for similar documents
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id UUID,
  file_path TEXT,
  chunk_index INTEGER,
  text TEXT,
  source_url TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kb.id,
    kb.file_path,
    kb.chunk_index,
    kb.text,
    kb.source_url,
    1 - (kb.embedding <=> query_embedding) AS similarity
  FROM knowledge_base kb
  WHERE 1 - (kb.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;
```

## Running the Server

### Development mode

```
npm run dev
```

### Production mode

```
npm start
```

## API Endpoints

### `POST /api/document`

Processes and embeds a document into the database.

Request body:

```json
{
  "document": "Your document text here...",
  "fileName": "optional-file-name.txt"
}
```

### `POST /api/answer`

Answers questions based on embedded documents.

Request body:

```json
{
  "question": "Your question here?"
}
```

### `GET /health`

Health check endpoint that returns status "ok" if the server is running.

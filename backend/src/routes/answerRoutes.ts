import express from "express";
import { searchEmbeddings } from "../services/embedder";
import { answerQuestion } from "../services/agent";

const router = express.Router();

/**
 * Route to answer questions using the agent
 * POST /api/answer
 */
router.post("/answer", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // Search for relevant content
    const searchResults = await searchEmbeddings(question);

    if (!searchResults || searchResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No relevant information found in the database",
      });
    }

    // Compile context from results
    const context = searchResults.map((result) => result.text).join("\n");

    // Generate answer
    const answer = await answerQuestion(question, context);

    res.status(200).json({
      success: true,
      question,
      answer,
      sources: searchResults.map((result) => ({
        text: result.text,
        filePath: result.file_path,
        sourceUrl: result.source_url,
      })),
    });
  } catch (error) {
    console.error("Error answering question:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
});

export default router;

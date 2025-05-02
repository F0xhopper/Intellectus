import express from "express";
import { embedDocument } from "../services/embedder";

const router = express.Router();

/**
 * Route to process and embed a document
 * POST /api/document
 */
router.post("/document", async (req, res) => {
  try {
    const { document, fileName } = req.body;

    if (!document) {
      return res.status(400).json({ error: "Document content is required" });
    }

    const result = await embedDocument(document, fileName);

    res.status(200).json({
      success: true,
      message: "Document processed successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error processing document:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
});

export default router;

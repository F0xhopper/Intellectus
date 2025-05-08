import express, { Request, Response } from "express";
import { embedSource } from "../services/embedder";
import { storeSource } from "../services/sources";

const router = express.Router();

interface SourceRequest {
  source: string;
  title?: string;
}

/**
 * Route to process and embed a source
 * POST /api/source
 * Can be URL, PDF, .txt etc
 */
router.post(
  "/source",
  async (req: Request<{}, {}, SourceRequest>, res: Response) => {
    try {
      const { source, title = "unnamed-source" } = req.body;

      if (!source) {
        return res.status(400).json({ error: "Source content is required" });
      }

      const sourceId = await storeSource(source, title);
      const embedResult = await embedSource(source, sourceId);

      return res.status(200).json({
        success: true,
        message: "Source processed successfully",
        data: {
          sourceId,
          ...embedResult,
        },
      });
    } catch (error) {
      console.error("Error processing source:", error);
      return res.status(500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }
);

export default router;

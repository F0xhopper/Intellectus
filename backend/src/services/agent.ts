import { OpenAI } from "openai";

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Generate an answer to a question based on the provided context
 */
export async function answerQuestion(
  question: string,
  context: string
): Promise<string> {
  try {
    const prompt = `
Answer the following question based on the context provided. If the answer cannot be found in the context, say "I don't have enough information to answer this question."

Context:
${context}

Question: ${question}

Answer:`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that provides accurate, concise responses based on the provided context. Do not make up information or speculate beyond what is in the context.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    return (
      response.choices[0].message.content ||
      "I couldn't generate an answer. Please try again."
    );
  } catch (error) {
    console.error("Error generating answer:", error);
    throw error;
  }
}

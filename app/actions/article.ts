// app/lib/actions.ts
"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function createArticle(content: string, title: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  if (!userId) throw new Error("Unauthorized");

  const summaryResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Please provide a concise summary of the following article: ${content}`,
  });

  const summary =
    summaryResponse.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? "")
      .join("") ?? "";

  const quizResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate 5 multiple choice questions based on this article: ${content}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`,
  });

  const raw =
    quizResponse.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? "")
      .join("") ?? "";

  const cleaned = raw.replace(/```json|```/g, "").trim();
  const quizzes = JSON.parse(cleaned);

  const article = await prisma.article.create({
    data: {
      title,
      content,
      summary,
      userId,
      quizzes: {
        create: quizzes.map(
          (q: { question: string; options: string[]; answer: string }) => ({
            question: q.question,
            options: q.options,
            answer: q.answer,
          }),
        ),
      },
    },
  });

  return { id: article.id };
}

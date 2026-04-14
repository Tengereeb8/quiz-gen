// // import { GoogleGenAI } from "@google/genai";

// // export async function POST(req: Request) {
// //   try {
// //     const { content } = await req.json();

// //     const ai = new GoogleGenAI({
// //       apiKey: process.env.GEMINI_API_KEY!,
// //     });

// //     const response = await ai.models.generateContent({
// //       model: "gemini-2.5-flash",
// //       contents: `Please provide a concise summary of the following article: ${content}`,
// //     });

// //     const text =
// //       response.candidates?.[0]?.content?.parts
// //         ?.map((p) => p.text ?? "")
// //         .join("") ?? "";

// //     return Response.json({ result: text });
// //   } catch (error) {
// //     console.error(error);

// //     return Response.json({ error: "Something went wrong" }, { status: 500 });
// //   }
// // }

// import { prisma } from "../../lib/prisma";
import { prisma } from "@/app/lib/prisma";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { content, title } = await req.json();

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Please provide a concise summary of the following article: ${content}`,
    });

    const summary =
      response.candidates?.[0]?.content?.parts
        ?.map((p) => p.text ?? "")
        .join("") ?? "";

    const article = await prisma.article.create({
      data: {
        title,
        content,
        summary,
        // userId: "temp-user-id",
      },
    });
    console.log("Saved to DB:", article.id); // 👈

    return Response.json({ id: article.id, summary });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}

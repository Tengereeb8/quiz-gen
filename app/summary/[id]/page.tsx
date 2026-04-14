// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { FileText, SparklesIcon } from "lucide-react";
// import { useState, ChangeEvent } from "react";
// // import { createArticle } from "../functions/createArticle";

// export const QuizGenerator = () => {
//   const [article, setArticle] = useState("");
//   const [content, setContent] = useState("");

//   const [summary, setSummary] = useState("");

//   const getArticle = async () => {
//     if (!content.trim()) return;
//     try {
//       const response = await createArticle(content);
//       setSummary(response);
//     } catch (error) {
//       setSummary("An error occurred. Please try again.");
//     }
//   };

//   const onChangeArticle = (
//     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     setArticle(event.target.value);
//   };

//   const onChangeContent = (
//     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     setContent(event.target.value);
//   };

//   console.log(article);

//   return (
//     <div className="bg-white  mt-12  p-7 rounded-lg w-214 h-110.5">
//       <h1 className=" flex gap-2 font-semibold text-2xl items-center">
//         <SparklesIcon className="size-8" />
//         Article Quiz Generator
//       </h1>
//       <p className="pt-2 text-[#71717a] text-base">
//         Paste your article below to generate a summarize and quiz question. Your
//         articles will saved in the sidebar for future reference.
//       </p>

//       <div className="mt-5">
//         <h1 className="flex mb-1 items-center gap-1 text-sm text-[#71717a]">
//           <FileText className="size-4.75" /> Article Title
//         </h1>
//         <Input
//           value={article}
//           placeholder="Enter a title for your article..."
//           onChange={onChangeArticle}
//         />
//       </div>
//       <div className="mt-5">
//         <h1 className="flex mb-1 items-center gap-1 text-sm text-[#71717a]">
//           <FileText className="size-4.75" /> Article Content
//         </h1>
//         <Textarea
//           className="h-30"
//           value={content}
//           placeholder="Paste your article content here..."
//           onChange={onChangeContent}
//         />
//       </div>
//       <div className="flex mt-5 justify-end">
//         <Button className="bg-black text-white w-40 h-10 " onClick={getArticle}>
//           Generate Summary
//         </Button>
//       </div>
//     </div>
//   );
// };

import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function SummaryPage({
  params,
}: {
  params: { id: string };
}) {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
  });

  if (!article) return notFound();

  return (
    <div className="max-w-2xl mx-auto mt-12 p-7 bg-white rounded-lg">
      <h1 className="text-2xl font-semibold">{article.title}</h1>
      <p className="mt-1 text-sm text-[#71717a]">
        {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-4" />
      <h2 className="font-semibold text-lg mb-2">Summary</h2>
      <p className="text-[#71717a] whitespace-pre-wrap">{article.summary}</p>
      <a href="/" className="mt-6 inline-block text-sm underline">
        ← Back
      </a>
    </div>
  );
}

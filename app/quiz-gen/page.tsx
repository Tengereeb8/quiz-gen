"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, SparklesIcon } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { createArticle } from "../functions/createArticle";
import { useRouter } from "next/navigation";

export const QuizGenerator = () => {
  const [article, setArticle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const router = useRouter();

  const getArticle = async () => {
    setLoading(true);
    if (!content.trim()) return;
    try {
      const { id } = await createArticle(content, article);
      router.push(`/summary/${id}`);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const onChangeArticle = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setArticle(event.target.value);
  };

  const onChangeContent = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };

  const isButtonDisabled = !content.trim() || loading;

  console.log(article);

  return (
    <div className="bg-white  mt-12  p-7 rounded-lg w-214 h-110.5">
      <h1 className=" flex gap-2 font-semibold text-2xl items-center">
        <SparklesIcon className="size-8" />
        Article Quiz Generator
      </h1>
      <p className="pt-2 text-[#71717a] text-base">
        Paste your article below to generate a summarize and quiz question. Your
        articles will saved in the sidebar for future reference.
      </p>

      <div className="mt-5">
        <h1 className="flex mb-1 items-center gap-1 text-sm text-[#71717a]">
          <FileText className="size-4.75" /> Article Title
        </h1>
        <Input
          value={article}
          placeholder="Enter a title for your article..."
          onChange={onChangeArticle}
        />
      </div>
      <div className="mt-5">
        <h1 className="flex mb-1 items-center gap-1 text-sm text-[#71717a]">
          <FileText className="size-4.75" /> Article Content
        </h1>
        <Textarea
          className="h-30"
          value={content}
          placeholder="Paste your article content here..."
          onChange={onChangeContent}
        />
      </div>
      <div className="flex mt-5 justify-end">
        <Button
          className={`bg-black text-white w-40 h-10 ${
            isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#18181B] hover:bg-gray-800"
          }`}
          onClick={getArticle}
        >
          Generate Summary
        </Button>
      </div>
    </div>
  );
};

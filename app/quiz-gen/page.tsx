"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, SparklesIcon, Loader2 } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "../actions/article";

const QuizGenerator = () => {
  const [article, setArticle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    if (!content.trim() || loading) return;

    setLoading(true);
    try {
      const { id } = await createArticle(content, article);
      router.push(`/summary/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !content.trim() || loading;

  return (
    <div className="bg-white mt-12 p-7 rounded-lg w-214 h-fit">
      <h1 className="flex gap-2 font-semibold text-2xl items-center">
        <SparklesIcon className="size-8" />
        Article Quiz Generator
      </h1>
      <p className="pt-2 text-[#71717a] text-base">
        Paste your article below to generate a summary and quiz questions.
      </p>

      <form onSubmit={handleGenerate} className="mt-5 space-y-5">
        <div>
          <h1 className="flex mb-1 items-center gap-1 text-sm text-[#71717a]">
            <FileText className="size-4.75" /> Article Title
          </h1>
          <Input
            value={article}
            placeholder="Enter a title for your article..."
            onChange={(e) => setArticle(e.target.value)}
          />
        </div>

        <div>
          <h1 className="flex mb-1 items-center gap-1 text-sm text-[#71717a]">
            <FileText className="size-4.75" /> Article Content
          </h1>
          <Textarea
            className="h-30"
            value={content}
            placeholder="Paste your article content here..."
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
              }
            }}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-40 h-10 text-white ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#18181B] hover:bg-gray-800"
            }`}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Generate Summary"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuizGenerator;

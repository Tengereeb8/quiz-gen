import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, SparklesIcon } from "lucide-react";

export const QuizGenerator = () => {
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
        <Input placeholder="Enter a title for your article..."></Input>
      </div>
      <div className="mt-5">
        <h1 className="flex mb-1 items-center gap-1 text-sm text-[#71717a]">
          <FileText className="size-4.75" /> Article Content
        </h1>
        <Input
          placeholder="Paste your article content here..."
          className="h-30"
        ></Input>
      </div>
      <div className="flex mt-5 justify-end">
        <Button className="bg-black text-white w-40 h-10 ">
          Generate Summary
        </Button>
      </div>
    </div>
  );
};

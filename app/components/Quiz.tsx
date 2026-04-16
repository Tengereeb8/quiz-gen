"use client";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Quiz = {
  question: string;
  options: string[];
  answer: string;
};

interface QuizProps {
  quizzes: Array<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    question: string;
    options: string[];
    answer: string;
    articleId: string;
  }>;
}

const Quiz = ({ quizzes }: QuizProps) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuiz = quizzes[current];
  const isCorrect = selected === currentQuiz?.answer;

  const handleSelect = (index: string) => {
    if (selected) return; // prevent changing answer
    setSelected(index);
    if (index === currentQuiz.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= quizzes.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  if (finished) {
    return (
      <div className="mt-12 p-7 rounded-lg w-250 h-fit mx-auto">
        <h1 className="flex gap-2 font-semibold text-2xl items-center">
          <SparklesIcon className="size-8" />
          Quick test
        </h1>
        <div className="bg-white w-144.5 p-7 rounded-lg mt-6 text-center">
          <h2 className="text-2xl font-bold">Quiz Complete! </h2>
          <p className="text-[#71717a] mt-2 text-lg">
            You scored {score} out of {quizzes.length}
          </p>
          <Button
            className="mt-6 bg-black text-white"
            onClick={() => {
              setCurrent(0);
              setSelected(null);
              setScore(0);
              setFinished(false);
            }}
          >
            Retry
          </Button>
          <Link href={"/"}>
            <Button className="bg-black text-white pl-2 ">
              Save and Leave
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 p-7 rounded-lg w-fit h-fit mx-auto">
      <h1 className="flex gap-2 font-semibold text-2xl items-center">
        <SparklesIcon className="size-8" />
        Quick test
      </h1>
      <p className="pt-2 text-[#71717a] text-base pb-6">
        Take a quick test about your knowledge from your content
      </p>
      <div className="bg-white w-214 p-7 rounded-lg">
        <h1 className="flex justify-between text-xl font-medium">
          {currentQuiz.question}
          <span className="text-[#71717a] text-base">
            {current + 1}/{quizzes.length}
          </span>
        </h1>
        <div className="py-5 flex flex-col gap-2">
          {currentQuiz.options.map((option, i) => {
            const idx = String(i);
            let variant: "outline" | "default" = "outline";
            let className =
              "w-fit h-10 justify-start border border-[#e4e4e7] text-black bg-white";

            if (selected) {
              if (idx === currentQuiz.answer) {
                className += " border-green-500 text-green-600";
              } else if (idx === selected) {
                className += " border-red-500 text-red-600";
              }
            }

            return (
              <Button
                key={i}
                variant={variant}
                className={className}
                onClick={() => handleSelect(idx)}
              >
                {option}
              </Button>
            );
          })}
        </div>
        {selected && (
          <div className="flex justify-between items-center mt-2">
            <Button className="bg-black text-white" onClick={handleNext}>
              {current + 1 >= quizzes.length ? "Finish" : "Next →"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;

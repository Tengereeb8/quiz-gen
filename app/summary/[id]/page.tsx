import { prisma } from "@/app/lib/prisma";
import { Button } from "@/components/ui/button";
import { FileText, SparklesIcon } from "lucide-react";
import { notFound } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default async function SummaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) return notFound();

  return (
    <div className="bg-white  mt-12  p-7 rounded-lg w-214 h-fit mx-auto">
      <h1 className=" flex gap-2 font-semibold text-2xl items-center">
        <SparklesIcon className="size-8" />
        Article Quiz Generator
      </h1>

      <div className="mt-5">
        <div className="mt-5">
          <h1 className="flex mb-1 items-center gap-1 text-sm text-[#71717a]">
            <FileText className="size-4.75" />
            Summarized Content
          </h1>
          <h1 className="text-2xl font-semibold my-2">{article.title}</h1>
          <p>{article.summary}</p>
        </div>
        <Accordion
          type="single"
          collapsible
          defaultValue="article"
          className="w-fit"
        >
          <AccordionItem value="article">
            <AccordionTrigger className="flex text-[#71717a] gap-1">
              <FileText className="size-4.75" />
              Article Content
            </AccordionTrigger>
            <AccordionContent>{article.content}</AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex mt-5 ">
          <Link href={`/quiz/${id}`}>
            <Button className="bg-black px-5 py-2.5">Take Quiz</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

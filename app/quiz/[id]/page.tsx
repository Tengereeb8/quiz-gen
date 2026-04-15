import Quiz from "@/app/components/Quiz";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
    include: { quizzes: true }, // 👈 fetch quizzes
  });

  if (!article) return notFound();

  return <Quiz quizzes={article.quizzes} />;
}

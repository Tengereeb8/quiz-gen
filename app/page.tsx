import { QuizGenerator } from "./quiz-gen/page";

export default function Home() {
  return (
    <div className="bg-white h-screen w-screen text-black flex justify-center ">
      <QuizGenerator />
    </div>
  );
}

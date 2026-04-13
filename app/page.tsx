import { QuizGenerator } from "./quiz-gen/page";

export default function Home() {
  return (
    <div className=" mt-12 h-screen w-screen text-black flex justify-center ">
      <QuizGenerator />
    </div>
  );
}

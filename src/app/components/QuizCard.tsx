"use client";
import { Button, Card } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db, IntegerQuestion, MCQQuestion } from "../lib/db";
import { seedQuizData } from "../lib/seedData";

const QuizCard = ({ index }: { index: number }) => {
  const router = useRouter();
  const [mcqQuestions, setMcqQuestions] = useState<MCQQuestion[]>([]);
  const [integerQuestions, setIntegerQuestions] = useState<IntegerQuestion[]>(
    []
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      await seedQuizData();
      const storedMcqs = await db.mcqQuestions.toArray();
      const storedIntegers = await db.integerQuestions.toArray();
      setMcqQuestions(storedMcqs);
      setIntegerQuestions(storedIntegers);
    };
    fetchQuestions();
  }, []);

  const totalQuestions = mcqQuestions.length + integerQuestions.length;

  const handleStartQuiz = () => {
    router.push("/quiz");
  };

  return (
    <Card
      className="m-2 sm:m-3 w-full max-w-[300px] mx-auto" // Full width on mobile, capped at 300px on larger screens
      title={
        <span className="text-sm sm:text-base font-semibold">
          Sample Quiz {index}
        </span>
      }
      extra={
        <Button
          className="bg-[#21bb0f] text-white font-bold h-10 px-4 sm:h-12 sm:px-6" // Larger touch area on mobile
          onClick={handleStartQuiz}
        >
          Start
        </Button>
      }
    >
      <p className="text-xs sm:text-sm">No of questions: {totalQuestions}</p>
      <p className="text-xs sm:text-sm">
        Time: {(totalQuestions * 30) / 60} minutes
      </p>
    </Card>
  );
};

export default QuizCard;

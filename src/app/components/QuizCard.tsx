"use client";
import { Button, Card } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db, IntegerQuestion, MCQQuestion } from "../lib/db";
import { seedQuizData } from "../lib/seedData";

const QuizCard = ({ index }) => {
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
      className="m-3"
      title={`Sample quiz ${index}`}
      extra={
        <Button
          className="bg-[#21bb0f] text-white font-bold"
          onClick={handleStartQuiz}
        >
          Start
        </Button>
      }
      style={{ width: 300 }}
    >
      <p>No of questions: {totalQuestions}</p>
      <p>Time : {(totalQuestions * 30) / 60} minutes</p>
    </Card>
  );
};

export default QuizCard;

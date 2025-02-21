/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import { Button, Col, Input, Modal, Result, Row } from "antd";
import React, { useEffect, useState } from "react";
import { db, IntegerQuestion, MCQQuestion } from "../lib/db";
import { seedQuizData } from "../lib/seedData";
import { useRouter } from "next/navigation";

const Quiz = () => {
  const [mcqQuestions, setMcqQuestions] = useState<MCQQuestion[]>([]);
  const [integerQuestions, setIntegerQuestions] = useState<IntegerQuestion[]>(
    []
  );
  const [answers, setAnswers] = useState<{ [key: number]: string | number }>(
    {}
  );
  const [currentQsIndex, setCurrentQsIndex] = useState<number>(0);
  const [currentQsAns, setCurrentQsAns] = useState<{
    [key: number]: string | number;
  }>({});
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [timer, setTimer] = useState(30);
  // const [isTimeUp, setIsTimeUp] = useState(false);
  const [expiredQuestion, setExpiredQuestion] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const router = useRouter();
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

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

  // Track expired questions
  // useEffect(() => {
  //   if (!expiredQuestion.includes(currentQsIndex)) {
  //     setExpiredQuestion((prev) => [...prev, currentQsIndex]);
  //   }
  // }, [currentQsIndex, expiredQuestion]);

  useEffect(() => {
    //if qs is already expired, don't start timer
    if (expiredQuestion.includes(currentQsIndex)) {
      return;
    }
    // Reset timer whenever the question changes
    const localIndex = currentQsIndex;
    setTimer(30);

    if (localIndex == currentQsIndex) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval); // ✅ Stops interval correctly
            setExpiredQuestion((prev) => [...prev, currentQsIndex]); // ✅ Correct way to update state
            // console.log([...expiredQuestion, currentQsIndex]); // ✅ Log actual updated value
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval); // ✅ Cleanup interval on unmount
    }
  }, [currentQsIndex]); // ✅ Runs when the question changes

  const totalQuestions = mcqQuestions.length + integerQuestions.length;

  const showModal = () => {
    setOpen(true);
    console.log(answers);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showResultModal = () => {
    setOpenResult(true);
  };

  // Function to handle OK button click (You can navigate to the homepage here)
  const handleOkResult = () => {
    router.push("/");
    setOpenResult(false);
  };

  // Function to handle modal cancel (close it)
  const handleCancelResult = () => {
    setOpenResult(false);
  };
  const onNextClick = () => {
    setCurrentQsIndex(currentQsIndex + 1);
    setCurrentQsAns("");
    setFeedback("");
    setIsCorrect(false);
  };
  const onPrevClick = () => {
    setCurrentQsIndex(currentQsIndex - 1);
    setCurrentQsAns("");
    setFeedback("");
    setIsCorrect(false);
  };

  const handleAnswerChange = (id: number, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };
  const onSaveClick = () => {
    if (expiredQuestion.includes(currentQsIndex)) return;

    //Get current question Id
    const entries = Object.entries(currentQsAns);
    const [qId, qAns] = entries[0];
    // Get all questions in a Array
    const allQs = [...mcqQuestions, ...integerQuestions];
    //Then check if for current question Id what is the original answer in Array
    const question = allQs?.filter((q) => q.id! === Number(qId));
    const originalAns = question[0].correctAnswer;
    //Compare original answer with current question answer
    const isCorrect = originalAns == qAns;

    //Set result
    setFeedback(qAns?.toString());
    handleAnswerChange(Number(qId), qAns);
    if (isCorrect) {
      setIsCorrect(true);
      setCorrect(correct + 1);
    } else {
      setIsCorrect(false);
      setWrong(wrong + 1);
    }
  };

  return (
    <div className=" flex flex-col h-[calc(100vh-120px)] p-4">
      <Row className="h-[65%]">
        <Col span={16} className="bg-gray-100 flex flex-col p-8">
          {/* Navigation Buttons */}
          <div className="w-full flex justify-between mb-4">
            <Button
              className={`px-6 py-2 rounded-md shadow-md transition-transform transform ${
                currentQsIndex === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:scale-105 hover:bg-blue-600 text-white"
              }`}
              disabled={currentQsIndex === 0}
              onClick={onPrevClick}
            >
              Prev
            </Button>

            {/* Next Button - Disabled for Last Question */}
            <Button
              className={`px-6 py-2 rounded-md shadow-md transition-transform transform ${
                currentQsIndex === totalQuestions - 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:scale-105 hover:bg-green-600 text-white"
              }`}
              disabled={currentQsIndex === totalQuestions - 1}
              onClick={onNextClick}
            >
              Next
            </Button>
          </div>

          {/* Questions */}
          {mcqQuestions.map((q, index) => {
            const show = currentQsIndex === q.id! - 1;
            if (show) {
              return (
                <div key={q.id}>
                  <h2 className="text-lg font-semibold">
                    {index + 1}. {q.question}
                  </h2>
                  <ul className="mt-2">
                    {q.options.map((option, i) => (
                      <li
                        key={i}
                        className="p-2 my-1 cursor-pointer min-w-[400px] flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={option}
                          checked={currentQsAns[q.id!] === option}
                          onChange={() => setCurrentQsAns({ [q.id!]: option })}
                          className="cursor-pointer"
                        />
                        <label
                          onClick={() => setCurrentQsAns({ [q.id!]: option })}
                          className="cursor-pointer"
                        >
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
          })}
          {/* Integer-Type Questions */}
          {integerQuestions.map((q, index) => {
            const show = currentQsIndex === q.id! - 1;
            if (show) {
              return (
                <div key={q.id}>
                  <h2 className="text-lg font-semibold">
                    {mcqQuestions.length + index + 1}. {q.question}
                  </h2>
                  {/* <Input
                    type="number"
                    value={answers[q.id!] || ""}
                    onChange={(e) => console.log(e.target.value)}
                  /> */}
                  <Input
                    type="number"
                    value={answers[q.id!]}
                    onChange={(e) => {
                      e.preventDefault();
                      setCurrentQsAns({ [q.id!]: e?.target?.value! });
                    }}
                    className="mt-2 p-2 bordaer rounded-md w-full max-w-[400px]"
                    placeholder="Enter your answer"
                  />
                </div>
              );
            }
          })}
          <hr className="w-full border-t-2 border-gray-300 mt-6 mb-4 transition-all duration-300 hover:border-gray-500" />

          <div className="w-full flex justify-end">
            <Button
              className={`px-6 py-2 rounded-md shadow-md ${
                expiredQuestion.includes(currentQsIndex) ||
                answers[currentQsIndex + 1]?.toString().trim().length > 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              }`}
              disabled={
                expiredQuestion.includes(currentQsIndex) ||
                answers[currentQsIndex + 1]?.toString().trim().length > 0
              }
              onClick={onSaveClick}
            >
              {expiredQuestion.includes(currentQsIndex) ||
              answers[currentQsIndex + 1]?.toString().trim().length > 0
                ? "Time Up!"
                : "Save Answer"}
            </Button>
          </div>
        </Col>

        <Col span={8} className=" flex items-center justify-center">
          <div className="text-center mt-4 w-[250px]">
            <p className="text-lg font-semibold">⏳ Time Left: {timer}s</p>
          </div>

          <hr className="w-full border-t-2 border-gray-300 mt-6 mb-4 transition-all duration-300 hover:border-gray-500" />
        </Col>
      </Row>
      <Row className="h-[35%] flex items-center justify-center relative">
        {feedback.trim() !== "" && (
          <Result
            status={isCorrect ? "success" : "error"}
            title={isCorrect ? "Correct Answer" : "Wrong Answer"}
            className="animate-fadeIn"
          ></Result>
        )}

        {/* 🚀 Submit  */}
        <Button
          onClick={showModal}
          className="absolute w-40 h-16 bottom-6 right-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-indigo-500 hover:to-purple-600"
        >
          🚀 Submit
        </Button>

        {/* ✨ Custom Styled Modal */}
        <Modal
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          title={
            <div className="text-center text-2xl font-bold text-indigo-600">
              🎉 Quiz Submission
            </div>
          }
          className="p-6"
          footer={() => (
            <div className="flex justify-between p-4">
              <Button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm transition-all duration-200 hover:bg-gray-300"
                onClick={handleCancel}
              >
                ❌ Cancel
              </Button>
              <Button
                className="bg-green-500 text-white px-5 py-2 rounded-md shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600"
                onClick={showResultModal}
              >
                ✅ Confirm
              </Button>
            </div>
          )}
        >
          <p className="text-lg text-gray-700 text-center">
            Are you sure you want to submit your answers? Once submitted, you
            cannot make changes.
          </p>
        </Modal>
        <Modal
          open={openResult}
          title={null} // Remove default title for a custom design
          onOk={handleOkResult}
          onCancel={handleCancelResult}
          zIndex={2000} // Ensures it appears on top
          width="70vw" // 👈 Occupies 70% of screen width
          style={{ height: "70vh", top: "15vh" }} // 👈 Occupies 70% height and centers properly
          className="rounded-lg shadow-xl p-6 bg-gradient-to-br from-indigo-100 to-indigo-300"
          footer={null} // Custom footer below
        >
          {/* 🎉 Title Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-indigo-700 animate-pulse">
              🎉 Quiz Completed!
            </h2>
            <p className="text-gray-600 text-lg mt-2">
              Here’s your performance breakdown:
            </p>
          </div>

          {/* 📊 Score Breakdown */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-green-600">
                ✅ Correct Answers
              </h3>
              <p className="text-2xl font-bold text-green-500">
                {correct} / {totalQuestions}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-red-600">
                ❌ Wrong Answers
              </h3>
              <p className="text-2xl font-bold text-red-500">
                {wrong} / {totalQuestions}
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-yellow-600">⭐ Score</h3>
            <p className="text-2xl font-bold text-yellow-500">
              {(correct / totalQuestions) * 100}%
            </p>
          </div>

          {/* 🚀 Action Buttons */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleOkResult}
              className="bg-green-500 text-white px-6 py-2 rounded-md shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600"
            >
              ✅ Go to HomePage
            </Button>
          </div>
        </Modal>
      </Row>
    </div>
  );
};

export default Quiz;

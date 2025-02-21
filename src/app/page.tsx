import React from "react";
import QuizCard from "./components/QuizCard";
import { Col, Row } from "antd";

const Home = () => {
  const quizes = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="bg-[#9fc89f61] p-10 h-[calc(100vh-156px)]">
      <Row>
        {quizes.map((q, i) => (
          <Col key={i} xs={{ span: 5, offset: 2 }}>
            <QuizCard index={q} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;

import React from "react";
import QuizCard from "./components/QuizCard";
import { Col, Row } from "antd";

const Home = () => {
  const quizes = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="bg-[#9fc89f61] p-4 sm:p-10 min-h-[calc(100vh-156px)]">
      <Row gutter={[16, 16]}>
        {" "}
        {/* Added gutter for consistent spacing */}
        {quizes.map((q, i) => (
          <Col
            key={i}
            xs={{ span: 24 }} // Full width on extra-small screens (mobile)
            sm={{ span: 12 }} // Half width on small screens
            md={{ span: 8 }} // 1/3 width on medium screens
            lg={{ span: 6, offset: 0 }} // 1/4 width on large screens, no offset
          >
            <QuizCard index={q} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;

import { Button, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import React from "react";

const QuizResult = () => {
  return (
    <div>
      <Result
        icon={<SmileOutlined />}
        title="Great, we have done all the operations!"
        extra={<Button type="primary">Next</Button>}
      />
    </div>
  );
};

export default QuizResult;

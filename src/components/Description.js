import React from "react";
import styled from "styled-components";

// 설명 컴포넌트
const Description = ({ des }) => {
  return (
    <div>
      {des
        .split("\n")
        .map((sentence, idx) =>
          sentence === "" ? (
            <br key={idx} />
          ) : (
            <p key={`${sentence}${idx}`}>{sentence}</p>
          )
        )}
    </div>
  );
};

const P = styled.p`
  font-size: 0.9em;
`;
export default React.memo(Description);

import React, { useState } from "react";
import styled from "styled-components";

// 설명 컴포넌트
const Description = ({ des }) => {
  const [isSummary, setIsSummary] = useState(true);

  return (
    <div>
      <DesContainer className={isSummary ? "" : "clicked"}>
        {des
          .split("\n")
          .map((sentence, idx) =>
            sentence === "" ? (
              <br key={idx} />
            ) : (
              <P key={`${sentence}${idx}`}>{sentence}</P>
            )
          )}
      </DesContainer>

      <Btn
        onClick={() => {
          setIsSummary(!isSummary);
        }}
      >
        {isSummary ? "더보기" : "간략히"}
      </Btn>
    </div>
  );
};
const DesContainer = styled.div`
  line-height: 1.4;
  flex-wrap: wrap;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  &.clicked {
    flex-wrap: wrap;
    display: block;
  }
`;
const Btn = styled.div`
  padding-top: 1em;
  font-size: 0.9em;
  cursor: pointer;
`;
const P = styled.p`
  font-size: 0.9em;
`;
export default React.memo(Description);

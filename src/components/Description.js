import React, { useRef, useState } from "react";
import styled from "styled-components";

const Description = ({ des }) => {
  const desRef = useRef(null);
  const [isSummary, setIsSummary] = useState(true);

  return (
    <div>
      <DesContainer ref={desRef} className={isSummary ? "" : "clicked"}>
        {des
          .split("\n")
          .map((sentence, idx) =>
            sentence === "" ? (
              <br key={idx} />
            ) : (
              <p key={`${sentence}${idx}`}>{sentence}</p>
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
  cursor: pointer;
`;
export default React.memo(Description);

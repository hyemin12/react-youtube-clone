import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

/** 더보기 간략하게 토글 버튼 컴포넌트
 * textRef (내용) 높이에 따라 더보기/간략히 버튼 보여짐 여부 결정
 */
const MoreToggle = ({ children }) => {
  const [isSummary, setIsSummary] = useState(true);

  const textRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const containerHeight = textRef.current.clientHeight;
      if (containerHeight > 64) setIsOverflow(true);
    }
  }, []);
  return (
    <>
      <Container className={isSummary ? "" : "clicked"} ref={textRef}>
        {children}
      </Container>

      {isOverflow && (
        <Btn
          onClick={() => {
            setIsSummary(!isSummary);
          }}
        >
          {isSummary ? "더보기..." : "간략히..."}
        </Btn>
      )}
    </>
  );
};
const Container = styled.div`
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
  display:height < 64px ? 'none':'block';
  padding-top: 1em;
  font-size: 0.9em;
  cursor: pointer;
  &:hover{
    font-weight:bold;
  }
`;

export default MoreToggle;

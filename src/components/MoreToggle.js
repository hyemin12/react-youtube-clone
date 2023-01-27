import React, { useState } from "react";
import styled from "styled-components";

/** 더보기 간략하게 토글 버튼 컴포넌트
 * children.props.des: 비디오나 채널 설명정보에서 사용할때는 항상 사용
 * children.props.children.length: 댓글은 길이에 따라서 버튼 활성, 비활성
 */
const MoreToggle = ({ children }) => {
  const [isSummary, setIsSummary] = useState(true);
  return (
    <>
      <Container className={isSummary ? "" : "clicked"}>{children}</Container>

      {children.props.des || children.props.children.length > 400 ? (
        <Btn
          onClick={() => {
            setIsSummary(!isSummary);
          }}
        >
          {isSummary ? "더보기..." : "간략히..."}
        </Btn>
      ) : null}
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

import styled from "styled-components";

// Display-flex 스타일 적용용 컴포넌트
const Row = ({ align, justify, children, gap }) => {
  return (
    <Div align={align} gap={gap} justify={justify}>
      {children}
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  align-items: ${(props) => (props.align ? props.align : "start")};
  justify-content: ${(props) => (props.justify ? props.justify : "start")};
  gap: ${(props) => props.gap}px;
`;

export default Row;

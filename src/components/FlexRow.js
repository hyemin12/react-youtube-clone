import styled from "styled-components";

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
  justify-content: ${(props) => (props.align ? props.justify : "start")}; start;
  gap: ${(props) => props.gap}px;
`;

export default Row;

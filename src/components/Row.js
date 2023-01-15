import styled from "styled-components";

const Row = ({ align, children, gap }) => {
  return (
    <Div align={align} gap={gap}>
      {children}
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  align-items: ${(props) => (props.align ? props.align : "start")};
  justify-content: start;
  gap: ${(props) => props.gap}px;
`;

export default Row;

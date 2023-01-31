import styled, { keyframes } from "styled-components";

const Loading = () => {
  return <Loader />;
};
const spinner = keyframes`
0%{
  transform: rotate(0deg)
}
100%{
  transform: rotate(360deg)
}
`;
const Loader = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid #eee;
  border-bottom-color: #ccc;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: ${spinner} 1.5s linear infinite;
`;

export default Loading;

import styled, { keyframes } from "styled-components";

const SkeletionUi = ({ width, height, borderRadius, marginBottom }) => {
  return (
    <Skeletion
      width={width}
      height={height}
      borderRadius={borderRadius}
      marginBottom={marginBottom}
    />
  );
};
const skeletonLoading = keyframes`
0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;
export const Skeletion = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  borderradius: ${(props) => props.borderRadius};
  marginbottom: ${(props) => props.marginBottom}px;
  background-image: linear-gradient(
    270deg,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.05),
    rgba(0, 0, 0, 0.05),
    rgba(0, 0, 0, 0.3)
  );
  background-size: 400% 100%;
  animation: ${skeletonLoading} 8s ease infinite;
`;
export default SkeletionUi;

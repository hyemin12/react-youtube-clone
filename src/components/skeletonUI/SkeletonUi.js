import styled, { keyframes } from "styled-components";

const SkeletonUi = ({ width, height, borderRadius, marginBottom }) => {
  return (
    <Skeleton
      width={width}
      height={height}
      borderRadius={borderRadius}
      marginBottom={marginBottom}
    />
  );
};
const skeletonLoading = keyframes`
  0%{ 
    background-position:0% 50%
  }
  50
    background-position:100% 50%
  }
  100%{ 
    background-position:0% 50%
  }
`;
export const Skeleton = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "10px"};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 4)}px;
  background-image: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.05),
    rgba(0, 0, 0, 0.05),
    rgba(0, 0, 0, 0.3)
  );
  background-size: 400% 100%;
  animation: ${skeletonLoading} 8s ease infinite;
`;
export default SkeletonUi;

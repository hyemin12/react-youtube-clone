import styled, { keyframes } from "styled-components";
import Row from "./FlexRow";

const SkeletonVideo = () => {
  return (
    <div>
      <Thumbnail />
      <Row gap={14}>
        <Circle />
        <div>
          <Title />
          <TextLine />
          <TextLine />
        </div>
      </Row>
    </div>
  );
};
const skeletonLoading = keyframes`
0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;
export const SkeletionUi = styled.div`
  color: rgba(0, 0, 0, 0);
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
const Thumbnail = styled(SkeletionUi)`
  width: 310px;
  height: 174px;
  border-radius: 10px;
  margin-bottom: 8px;
`;
const Circle = styled(SkeletionUi)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;
const Title = styled(SkeletionUi)`
  width: 252px;
  height: 40px;
  margin-bottom: 4px;
`;
const TextLine = styled(SkeletionUi)`
  width: 200px;
  height: 20px;
  margin-bottom: 2px;
`;
export default SkeletonVideo;

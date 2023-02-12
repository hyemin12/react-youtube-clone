import styled from "styled-components";
import Row from "./FlexRow";

const SkeletonVideo = () => {
  return (
    <div>
      <Thumbnail></Thumbnail>
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

const Thumbnail = styled.div`
  width: 310px;
  height: 174px;
  background-color: #ccc;
  border-radius: 10px;
  margin-bottom: 8px;
`;
const Circle = styled.div`
  width: 36px;
  height: 36px;
  background-color: #ccc;
  border-radius: 50%;
`;
const Title = styled.div`
  width: 252px;
  height: 40px;
  background-color: #ccc;
  margin-bottom: 4px;
`;
const TextLine = styled.div`
  width: 200px;
  height: 20px;
  background-color: #ccc;
  margin-bottom: 2px;
`;
export default SkeletonVideo;

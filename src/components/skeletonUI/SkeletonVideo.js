import Row from "../FlexRow";
import SkeletionUi from "./SkeletonUi";

const SkeletonVideo = () => {
  return (
    <div>
      <SkeletionUi width={310} height={174} marginBottom={8} />
      <Row gap={14}>
        <SkeletionUi width={36} height={36} borderRadius={"50%"} />
        <div>
          <SkeletionUi width={252} height={40} />
          <SkeletionUi width={200} height={18} />
          <SkeletionUi width={200} height={18} />
        </div>
      </Row>
    </div>
  );
};

export default SkeletonVideo;

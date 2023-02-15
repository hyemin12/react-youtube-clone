import Row from "../FlexRow";
import SkeletonUi from "./SkeletonUi";

const SkeletonRecommendItem = () => {
  return (
    <Row gap={10}>
      <SkeletonUi width={200} height={112.5} />
      <div>
        <SkeletonUi width={180} height={40} marginBottom={8} />
        <SkeletonUi width={120} height={18} />
        <SkeletonUi width={180} height={18} />
      </div>
    </Row>
  );
};
export default SkeletonRecommendItem;

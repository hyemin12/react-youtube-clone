import { useParams } from "react-router-dom";
import Header from "../components/Header";

const Video = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <Header />
    </div>
  );
};

export default Video;

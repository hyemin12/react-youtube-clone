import { Link } from "react-router-dom";
import { useSetChnIdContext } from "../hooks/getChannelIdContext";

const ChannelTitle = ({ text, customUrl, id }) => {
  const { setSettingId } = useSetChnIdContext();
  console.log(id);
  return (
    <Link
      to={{ pathname: "/channel", search: `${customUrl}` }}
      onClick={() => {
        setSettingId(id);
      }}
    >
      {text}
    </Link>
  );
};

export default ChannelTitle;

import { Link } from "react-router-dom";

const ChannelTitle = ({ text, customUrl }) => {
  return (
    <Link to={{ pathname: "/channel", search: `${customUrl}` }}>{text}</Link>
  );
};

export default ChannelTitle;

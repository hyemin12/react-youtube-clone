import { Link } from "react-router-dom";

import { useSetChnIdContext } from "../hooks/getChannelIdContext";

/** 페이지 이동 버튼
 * pathname (경로), query (경로 뒤 문구), id (채널아이디) */
const LinkButton = ({ pathname, query, id, children }) => {
  const { setSettingId } = useSetChnIdContext();

  const onClick = () => {
    if (pathname !== "channel" || !id) {
      return;
    }
    setSettingId(id);
  };
  return (
    <Link to={{ pathname: pathname, search: `${query}` }} onClick={onClick}>
      {children}
    </Link>
  );
};
export default LinkButton;

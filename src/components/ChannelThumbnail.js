import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { useSetChnIdContext } from "../hooks/getChannelIdContext";

const ChannelThumbnail = ({ title, url, size, customUrl, id }) => {
  const { pathname } = useLocation();
  const { setSettingId } = useSetChnIdContext();
  return (
    <>
      {pathname === "/channel" ? (
        <Img
          src={url}
          alt={title}
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      ) : (
        <Link
          to={{ pathname: "/channel", search: `${customUrl}` }}
          onClick={() => {
            setSettingId(id);
          }}
        >
          <Img
            src={url}
            alt={title}
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        </Link>
      )}
    </>
  );
};

const Img = styled.img`
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 2px 3px 3px #f1f1f1, 0 -2px 3px 3px #f1f1f1;
`;

export default ChannelThumbnail;

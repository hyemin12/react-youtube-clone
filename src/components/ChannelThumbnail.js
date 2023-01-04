import styled from "styled-components";

const ChannelThumbnail = ({ title, url, size }) => {
  return (
    <Img
      src={url}
      alt={title}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

const Img = styled.img`
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 2px 3px 3px #f1f1f1, 0 -2px 3px 3px #f1f1f1;
`;

export default ChannelThumbnail;

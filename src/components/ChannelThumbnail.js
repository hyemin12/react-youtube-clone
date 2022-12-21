import styled from "styled-components";

const ChannelThumbnail = ({ title, url, size }) => {
  return (
    <Thumbnail
      src={url}
      alt={title}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

const Thumbnail = styled.img`
  border-radius: 50%;
  object-fit: cover;
`;

export default ChannelThumbnail;

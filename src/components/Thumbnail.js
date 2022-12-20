import styled from "styled-components";

const Thumbnail = ({ size, title }) => {
  return (
    <div>
      <ThumbnailImg src={size} alt={title} />
    </div>
  );
};
const ThumbnailImg = styled.img`
  border-radius: 10px;
`;

export default Thumbnail;

import styled from "styled-components";

const Thumbnail = ({ size, title, loading }) => {
  return (
    <div>
      {loading ? (
        <LoadImg width={size.width} height={size.height} />
      ) : (
        <ThumbnailImg src={size.url} alt={title} />
      )}
    </div>
  );
};
const LoadImg = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: #eee;
  border-radius: 10px;
`;
const ThumbnailImg = styled.img`
  border-radius: 10px;
`;

export default Thumbnail;

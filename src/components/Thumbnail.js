import styled from "styled-components";

const Thumbnail = ({ width, height, url, title }) => {
  return (
    <div>
      <Img width={width} height={height} src={url} alt={title} />
    </div>
  );
};

const Img = styled.img`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 10px;
`;

export default Thumbnail;

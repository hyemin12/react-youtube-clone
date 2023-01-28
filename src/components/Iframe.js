import styled from "styled-components";

// 유튜브 영상 (iframe)
const Iframe = ({ id, type, index, width, height }) => {
  return (
    <IframeContainer width={width} height={height}>
      <iframe
        id="ytplayer"
        type="text/html"
        width={"100%"}
        height={"100%"}
        src={
          type === "list"
            ? `https://www.youtube.com/embed?listType=playlist&list=${id}&index=${index}`
            : `https://www.youtube.com/embed/${id}`
        }
        frameborder="0"
        title={id}
        allowfullscreen
      ></iframe>
    </IframeContainer>
  );
};
const IframeContainer = styled.div`
  flex-shrink: 0;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-bottom: 14px;
  @media screen and (min-width: 1541px) {
    width: 67vw;
    height: 78vh;
  }
`;
export default Iframe;

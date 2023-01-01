import styled from "styled-components";

const Iframe = ({ id, width, height }) => {
  console.log(id);

  return (
    <IframeContainer width={width} height={height}>
      <iframe
        id="ytplayer"
        type="text/html"
        width={"100%"}
        height={"100%"}
        src={`https://www.youtube.com/embed/${id}`}
        frameborder="0"
        title={id}
        allowfullscreen
      ></iframe>
    </IframeContainer>
  );
};
const IframeContainer = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-bottom: 14px;
  @media screen and (min-width: 1541px) {
    width: 67vw;
    height: 78vh;
  }
`;
export default Iframe;

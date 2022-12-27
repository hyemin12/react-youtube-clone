const Iframe = ({ id, width, height }) => {
  <iframe
    id="ytplayer"
    type="text/html"
    width={width}
    height={height}
    src={`https://www.youtube.com/embed/${id}`}
    frameborder="0"
    title={id}
    allowfullscreen
    style={{ marginBottom: "10px" }}
  ></iframe>;
};
export default Iframe;

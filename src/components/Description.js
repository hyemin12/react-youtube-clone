import styled from "styled-components";

const Description = ({ des }) => {
  console.log(des);
  return (
    <DesContainer>
      {des
        .split("\n")
        .map((sentence, idx) =>
          sentence === "" ? <br /> : <p key={`${sentence}${idx}`}>{sentence}</p>
        )}
    </DesContainer>
  );
};
const DesContainer = styled.div`
  line-height: 1.4;
`;
export default Description;

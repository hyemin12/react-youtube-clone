import React from "react";
import styled from "styled-components";

const Description = ({ des }) => {
  return (
    <DesContainer>
      {des
        .split("\n")
        .map((sentence, idx) =>
          sentence === "" ? (
            <br key={idx} />
          ) : (
            <p key={`${sentence}${idx}`}>{sentence}</p>
          )
        )}
    </DesContainer>
  );
};
const DesContainer = styled.div`
  line-height: 1.4;
`;
export default React.memo(Description);

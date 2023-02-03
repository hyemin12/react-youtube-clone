import React from "react";
import styled from "styled-components";

// 설명 컴포넌트
const Description = ({ des }) => {
  const urlRegex = /(https?:\/\/[^ ]*)/;

  return (
    <div>
      {des.split("\n").map((sentence, idx) => {
        if (sentence === "") return <br key={idx} />;
        if (sentence.match(urlRegex))
          return sentence.split(urlRegex).map((word) =>
            word.match(urlRegex) ? (
              <Link href={word} target="_blank" rel="noreferrer">
                {word}
              </Link>
            ) : word === "" ? (
              <br />
            ) : (
              <span>{word}</span>
            )
          );
        return <p key={`${sentence}${idx}`}>{sentence}</p>;
      })}
    </div>
  );
};

const Link = styled.a`
  color: blue;
`;

export default React.memo(Description);

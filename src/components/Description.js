import React from "react";

// 설명 컴포넌트
const Description = ({ des }) => {
  return (
    <div>
      {des
        .split("\n")
        .map((sentence, idx) =>
          sentence === "" ? (
            <br key={idx} />
          ) : (
            <p key={`${sentence}${idx}`}>{sentence}</p>
          )
        )}
    </div>
  );
};

export default React.memo(Description);

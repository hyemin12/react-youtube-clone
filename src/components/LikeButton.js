import styled from "styled-components";
import { FaThumbsUp } from "react-icons/fa";

import { Btn, Row } from "./Button";
import { useState } from "react";

const LikeButton = ({ num }) => {
  const [plusLike, setPlusLike] = useState({
    mode: false,
    number: Number(num),
  });
  const convertNum = (n) => {
    if (n < 1000) return `${n}`;
    if (n > 1000 && n < 10000) return `${(n / 1000).toFixed(1)}천 `;
    if (n > 10000) return `${(n / 10000).toFixed(1)}만회 `;
  };
  const increaseLike = () => {
    if (plusLike.mode) {
      setPlusLike({ mode: false, number: plusLike.number - 1 });
    } else {
      setPlusLike({ mode: true, number: plusLike.number + 1 });
    }
  };
  console.log(plusLike);
  return (
    <Btn onClick={increaseLike} mode={plusLike.mode}>
      <Row>
        <FaThumbsUp style={{ color: plusLike.mode ? "tomato" : "#111" }} />
        <p>{convertNum(plusLike.number)}</p>
      </Row>
    </Btn>
  );
};

export default LikeButton;

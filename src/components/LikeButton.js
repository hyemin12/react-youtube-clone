import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

import { Btn, Row } from "./Button";
import { converCount } from "../hooks/converCount";

const LikeButton = ({ num }) => {
  const [plusLike, setPlusLike] = useState({
    mode: false,
    number: Number(num),
  });

  const increaseLike = () => {
    if (plusLike.mode) {
      setPlusLike({ mode: false, number: plusLike.number - 1 });
    } else {
      setPlusLike({ mode: true, number: plusLike.number + 1 });
    }
  };
  return (
    <Btn onClick={increaseLike} mode={plusLike.mode}>
      <Row>
        <FaThumbsUp style={{ color: plusLike.mode ? "tomato" : "#111" }} />
        <p>{converCount(plusLike.number)}</p>
      </Row>
    </Btn>
  );
};

export default LikeButton;

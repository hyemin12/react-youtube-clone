import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

import useAlert from "../hooks/useAlert";
import { converCount } from "../hooks/converCount";

import Alert from "./Alert";
import { Btn, Row } from "./Button";

const LikeButton = ({ num }) => {
  const [plusLike, setPlusLike] = useState({
    mode: false,
    number: Number(num),
  });

  const [isAlert, setIsAlert] = useAlert();

  const increaseLike = () => {
    if (plusLike.mode) {
      setPlusLike({ mode: false, number: plusLike.number - 1 });
    } else {
      setPlusLike({ mode: true, number: plusLike.number + 1 });
      setIsAlert(true);
    }
  };
  return (
    <Btn onClick={increaseLike} mode={plusLike.mode}>
      <Row>
        <FaThumbsUp style={{ color: plusLike.mode ? "tomato" : "#111" }} />
        <p>{converCount(plusLike.number)}</p>
      </Row>
      {isAlert && <Alert text={"좋아요🧡"} position={"top"} />}
    </Btn>
  );
};

export default LikeButton;

import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

import useAlert from "../hooks/useAlert";
import { converCount } from "../hooks/converCount";

import Alert from "./Alert";
import { Btn, Row } from "./Button";

// 좋아요 버튼
const LikeButton = ({ num }) => {
  const [plusLike, setPlusLike] = useState({
    isLike: false,
    number: Number(num),
  });

  const [isAlert, setIsAlert] = useAlert();

  // 좋아요 활성화/비활성화
  const increaseLike = () => {
    if (plusLike.isLike) {
      setPlusLike({ isLike: false, number: plusLike.number - 1 });
    } else {
      setPlusLike({ isLike: true, number: plusLike.number + 1 });
      setIsAlert(true);
    }
  };
  return (
    <Btn onClick={increaseLike} isLike={plusLike.isLike}>
      <Row>
        <FaThumbsUp style={{ color: plusLike.isLike ? "tomato" : "#111" }} />
        <p>{converCount(plusLike.number)}</p>
      </Row>
      {isAlert && <Alert text={"좋아요🧡"} position={"top"} />}
    </Btn>
  );
};

export default LikeButton;

import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

import useAlert from "../hooks/useAlert";
import { convertCount } from "../hooks/convertCount";

import Alert from "./Alert";
import { Btn } from "./Button";
import Row from "./FlexRow";

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
      <Row gap={5} align={"center"}>
        <FaThumbsUp style={{ color: plusLike.isLike ? "tomato" : "#111" }} />
        <p>{convertCount(plusLike.number)}</p>
      </Row>
      {isAlert && <Alert text={"좋아요🧡"} position={"top"} />}
    </Btn>
  );
};

export default LikeButton;

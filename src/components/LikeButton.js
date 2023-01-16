import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

import useAlert from "../hooks/useAlert";
import { convertCount } from "../hooks/convertCount";

import Alert from "./Alert";
import { Btn } from "./Button";
import Row from "./FlexRow";

// 좋아요 버튼
const LikeButton = ({ num, unit, mode, bg }) => {
  const [plusLike, setPlusLike] = useState({
    isLike: false,
    number: typeof num ? num : Number(num),
  });
  const [disLike, setDisLike] = useState(false);
  const [isAlert, setIsAlert] = useAlert();

  // 좋아요 활성화/비활성화
  const clickLike = () => {
    if (plusLike.isLike) {
      setPlusLike({ isLike: false, number: parseInt(plusLike.number) });
    } else {
      setPlusLike({ isLike: true, number: parseInt(plusLike.number) + 1 });
      setIsAlert(true);
    }
  };
  console.log(plusLike);
  const clickDisLike = () => {
    if (disLike) {
      setPlusLike({ isLike: false, number: plusLike.number });
    } else {
      setDisLike(true);
    }
  };
  return (
    <>
      {mode !== "dislike" ? (
        <Btn onClick={clickLike} isLike={plusLike.isLike} bg={bg}>
          <Row gap={5} align={"center"}>
            <FaThumbsUp
              style={{ color: plusLike.isLike ? "tomato" : "#111" }}
            />
            <p>{plusLike.number !== 0 && convertCount(plusLike.number)}</p>
          </Row>
          {isAlert && <Alert text={"좋아요🧡"} position={"top"} />}
        </Btn>
      ) : (
        <Btn onClick={clickDisLike} bg={bg}>
          <Row gap={5} align={"center"}>
            <FaThumbsDown
              style={{ color: plusLike.isLike ? "tomato" : "#111" }}
            />
          </Row>
          {disLike && <Alert text={"싫어요😢"} position={"top"} />}
        </Btn>
      )}
    </>
  );
};

export default LikeButton;

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
    number: typeof num ? num : parseInt(num),
  });
  const [isAlert, setIsAlert] = useAlert();

  // 좋아요 활성화/비활성화
  const clickLike = () => {
    if (plusLike.isLike) {
      setPlusLike({
        isLike: false,
        number: plusLike.number - 1,
      });
    } else {
      setPlusLike({
        isLike: true,
        number: plusLike.number + 1,
      });
      setIsAlert(true);
    }
  };
  return (
    <>
      <Btn onClick={clickLike} bg={bg}>
        <Row gap={5} align={"center"}>
          <FaThumbsUp style={{ color: plusLike.isLike ? "tomato" : "#111" }} />
          <p>{plusLike.number !== 0 && convertCount(plusLike.number)}</p>
        </Row>
        {isAlert && <Alert text={"좋아요🧡"} position={"top"} />}
      </Btn>
    </>
  );
};

export default LikeButton;

import { useState } from "react";
import { FaThumbsUp, FaHeart } from "react-icons/fa";

import useAlert from "../hooks/useAlert";
import { convertCount } from "../hooks/convertCount";

import Alert from "./Alert";
import { Btn } from "./Button";
import Row from "./FlexRow";
import styled from "styled-components";

// 좋아요 버튼
const LikeButton = ({ num, unit, mode, bg }) => {
  const [isAlert, setIsAlert] = useAlert();

  const [plusLike, setPlusLike] = useState({
    isLike: false,
    number: typeof num ? num : parseInt(num),
  });

  // 좋아요 활성화/비활성화
  const toggleLike = () => {
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
      <LikeBtn onClick={toggleLike} bg={bg} isLike={plusLike.isLike}>
        <Row gap={5} align={"center"}>
          <FaHeart />
          <p>{plusLike.number !== 0 && convertCount(plusLike.number)}</p>
        </Row>
        {isAlert && <Alert text={"좋아요🧡"} position={"top"} />}
      </LikeBtn>
    </>
  );
};

const LikeBtn = styled(Btn)`
  background-color: ${(props) => (props.isLike ? "tomato" : props.bg)};
  color: ${(props) => (props.isLike ? "#fff" : "#111")};
`;

export default LikeButton;

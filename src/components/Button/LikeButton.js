import { useState } from "react";
import { FaThumbsUp, FaHeart } from "react-icons/fa";

import useAlert from "../../hooks/useAlert";
import { convertCount } from "../../hooks/convertCount";

import Alert from "../Alert";
import { Btn } from "./CopyButton";
import Row from "../FlexRow";
import styled from "styled-components";

// 좋아요 버튼
const LikeButton = ({ num, bg }) => {
  const [isAlert, setIsAlert] = useAlert();

  const [plusLike, setPlusLike] = useState({
    isLike: false,
    number: typeof num ? num : parseInt(num),
  });

  const { isLike, number } = plusLike;

  // 좋아요 활성화/비활성화
  const toggleLike = () => {
    if (isLike) {
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
      <LikeBtn onClick={toggleLike} isLike={isLike}>
        <Row gap={5} align={"center"} justify={"center"}>
          <FaHeart />
          <p>{number > 0 && convertCount(number)}</p>
        </Row>
        {isAlert && <Alert text={"좋아요🧡"} position={"top"} />}
      </LikeBtn>
    </>
  );
};

const LikeBtn = styled(Btn)`
  min-width: 70px;
  background-color: ${(props) => (props.isLike ? "tomato" : "#eee")};
  color: ${(props) => (props.isLike ? "#fff" : "#111")};
`;

export default LikeButton;

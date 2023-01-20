import { useRef } from "react";
import styled from "styled-components";

import { FaCopy } from "react-icons/fa";

import useAlert from "../../hooks/useAlert";

import Alert from "../Alert";
import Row from "../FlexRow";

const CopyButton = ({ id, text }) => {
  const urlRef = useRef(null);

  const [isAlert, setIsAlert] = useAlert();

  // 영상 주소 복사하는 함수
  const onCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(urlRef.current.value);
    setIsAlert(true);
  };

  return (
    <Btn onClick={onCopy}>
      <Row gap={5} align={"center"}>
        <input
          defaultValue={`${id}`}
          ref={urlRef}
          style={{ display: "none" }}
        />
        <FaCopy />
        <p>{text}</p>
      </Row>
      {isAlert && <Alert text={"복사 성공!"} position={"top"} />}
    </Btn>
  );
};
export const Btn = styled.button`
  height: 100%;
  background-color: #eee;
  padding: 10px;
  border: none;
  border-radius: 20px;
  position: relative;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
    color: #111;
  }
`;

export default CopyButton;

import { useRef } from "react";
import styled from "styled-components";
import { FaYoutube, FaCopy } from "react-icons/fa";

import useAlert from "../hooks/useAlert";

import Alert from "./Alert";
import Row from "./FlexRow";

const Button = ({ id, type, text, func }) => {
  const urlRef = useRef(null);

  const [isAlert, setIsAlert] = useAlert();

  // 영상 주소 복사하는 함수
  const onCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(urlRef.current.value);
    setIsAlert(true);
  };

  return (
    <>
      {type === "link" && (
        <Btn>
          <a
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noreferrer"
          >
            <Row gap={5} align={"center"}>
              <FaYoutube />
              <p>{text}</p>
            </Row>
          </a>
        </Btn>
      )}
      {type === "copy" && (
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
      )}
      {type === "" && (
        <Btn onClick={func()}>
          <p>{text}</p>
        </Btn>
      )}
    </>
  );
};
export const Btn = styled.button`
  height: 100%;
  background-color: ${(props) => (props.bg ? "transparent" : props.bg)};
  padding: 10px;
  border: none;
  border-radius: 20px;
  position: relative;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

export default Button;

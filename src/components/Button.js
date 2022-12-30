import styled from "styled-components";
import { FaYoutube, FaCopy } from "react-icons/fa";
import { useRef } from "react";
import Alert from "./Alert";
import useAlert from "../hooks/useAlert";

const Button = ({ id, type, text }) => {
  const urlRef = useRef(null);
  const { isAlert, setIsAlert } = useAlert();
  console.log(isAlert);
  const onCopy = (e) => {
    console.log(urlRef, urlRef.current.value);
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
            <Row>
              <FaYoutube />
              <p>{text}</p>
            </Row>
          </a>
        </Btn>
      )}
      {type === "copy" && (
        <Btn onClick={onCopy}>
          <Row>
            <input value={`${id}`} ref={urlRef} style={{ display: "none" }} />
            <FaCopy />
            <p>{text}</p>
          </Row>
          {isAlert && <Alert text={"복사 성공!"} position={"top"} />}
        </Btn>
      )}
    </>
  );
};
const Btn = styled.button`
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
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
export default Button;

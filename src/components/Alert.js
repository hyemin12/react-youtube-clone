import styled from "styled-components";

const Alert = ({ text, position }) => {
  return (
    <AlertContainer className={position}>
      <Text className={position}>{text}</Text>
    </AlertContainer>
  );
};
const AlertContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  &.top {
    width: auto;
    height: auto;
    display: inline-block;
    position: absolute;
    top: -34px;
    right: 0px;
  }
  &.top::after {
    content: "";
    width: 0;
    height: 0;
    border-top: 6px solid tomato;
    border-bottom: 6px solid transparent;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    position: absolute;
    left: 50%;
    bottom: -12px;
    transform: translateX(-50%);
  }
`;
const Text = styled.p`
  background-color: #555;
  border-radius: 20px;
  padding: 20px 40px;
  color: #fff;
  font-size: 24px;
  &.top {
    background-color: tomato;
    padding: 5px 7px;
    border-radius: 10px;
    font-size: 14px;
  }
`;
export default Alert;

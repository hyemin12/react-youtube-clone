import styled from "styled-components";

// 비디오 길이 표시
const VideoLength = ({ time }) => {
  // 포맷: PT00M00S
  // M 앞의 숫자가 분/ S앞의 숫자가 초
  const covertTime = (t) => {
    const splitTime = t.split(/[MH]/g);
    if (!t.includes("M") && !t.includes("H")) {
      return `00:${splitTime[0].replaceAll(/[PTS]/g, "").padStart(2, "0")}`;
    }

    return splitTime
      .map((t) =>
        t.includes("PT") || t.includes("M") || t.includes("S")
          ? t.replaceAll(/[PTS]/g, "").padStart(2, "0")
          : "00"
      )
      .join(":");
  };

  return (
    <>
      {time === "P0D" ? (
        <Live>스트리밍...</Live>
      ) : (
        <Time>{covertTime(time)}</Time>
      )}
    </>
  );
};

const Time = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  font-size: 0.7em;
  color: #fff;
  position: absolute;
  bottom: 6px;
  right: 2px;
`;
const Live = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background-color: tomato;
  border-radius: 8px;
  font-size: 0.7em;
  color: #fff;
  position: absolute;
  bottom: 6px;
  right: 2px;
`;

export default VideoLength;

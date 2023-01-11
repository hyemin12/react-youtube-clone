import styled from "styled-components";

// 비디오 길이 표시
const VideoLength = ({ time }) => {
  // 포맷: PT00M00S
  // M 앞의 숫자가 분/ S앞의 숫자가 초
  const covertTime = (t) => {
    const splitTime = t.split(/[MH]/g);
    if (!t.includes("M") && !t.includes("H")) {
      console.log(splitTime);
      return `00:${splitTime[0].replaceAll(/[PTS]/g, "").padStart(2, "0")}`;
    }

    return splitTime
      .map((t) =>
        t.includes("PT") || t.includes("M") || t.includes("S")
          ? t.replaceAll(/[PTS]/g, "").padStart(2, "0")
          : "00"
      )
      .join(":");

    // if (t.includes("H")) {
    //   const splitTime = t.split(/[MH]/g);
    //   return splitTime
    //     .map((t) =>
    //       t.includes("M" || "S")
    //         ? t.replace(/[PTS]/g, "").padStart(2, "0")
    //         : "00"
    //     )
    //     .join(":");
    // } else if (t.includes("M")) {
    //   const splitTime = t.split("M");
    //   min = splitTime[0].replace("PT", "").padStart(2, "0");
    //   sec = splitTime[1].includes("S")
    //     ? splitTime[1].replace("S", "").padStart(2, "0")
    //     : "00";
    //   return `${min}:${sec}`;
    // } else {
    //   sec = t.replaceAll(/[PTS]/g, "").padStart(2, "0");
    //   return `00:${sec}`;
    // }
  };

  return <Time>{covertTime(time)}</Time>;
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

export default VideoLength;

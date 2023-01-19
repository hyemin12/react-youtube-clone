import styled from "styled-components";
import { FaChartLine, FaInfoCircle, FaMapMarker } from "react-icons/fa";

import { convertCountry } from "../../hooks/convertCountry";

import Row from "../FlexRow";

const ChannelInfo = (channelData) => {
  return (
    <div>
      <Row align={"start"} gap={30}>
        <div style={{ width: "69vw" }}>
          <H4>설명</H4>
          {channelData.description ? (
            <>
              {channelData.description
                .split("\n")
                .map((sentence, idx) =>
                  sentence === "" ? (
                    <br key={idx} />
                  ) : (
                    <P key={`${sentence}${idx}`}>{sentence}</P>
                  )
                )}
            </>
          ) : (
            <p>등록된 설명이 없습니다.</p>
          )}
        </div>
        <div style={{ flexGrow: 1 }}>
          <H4>추가정보</H4>
          <Row align={"center"} gap={16}>
            <FaInfoCircle />
            <P>가입일: {channelData.publishedAt.slice(0, 10)}</P>
          </Row>

          <Row align={"center"} gap={16}>
            <FaChartLine />
            <P>조회수: {Number(channelData.viewCount).toLocaleString()}회</P>
          </Row>

          <Row align={"center"} gap={16}>
            <FaMapMarker />
            <P>위치: {convertCountry(channelData.country)}</P>
          </Row>
        </div>
      </Row>
    </div>
  );
};
const P = styled.p`
  padding: 10px 0;
`;
const H4 = styled.h4`
  margin-bottom: 1em;
`;

export default ChannelInfo;

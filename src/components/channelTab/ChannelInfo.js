import styled from "styled-components";
import { FaChartLine, FaInfoCircle, FaMapMarker } from "react-icons/fa";

import { convertCountry } from "../../hooks/convertCountry";

import Description from "../../components/Description";

const ChannelInfo = (channelData) => {
  return (
    <div>
      <Row align={"start"}>
        <div style={{ width: "69vw" }}>
          <H4>설명</H4>
          {channelData.description ? (
            <Description des={channelData.description} />
          ) : (
            <p>등록된 설명이 없습니다.</p>
          )}
        </div>
        <div style={{ flexGrow: 1 }}>
          <H4>추가정보</H4>
          <Row align={"center"}>
            <FaInfoCircle />
            <p>가입일: {channelData.publishedAt.slice(0, 10)}</p>
          </Row>

          <Row align={"center"}>
            <FaChartLine />
            <p>조회수: {Number(channelData.viewCount).toLocaleString()}회</p>
          </Row>

          <Row align={"center"}>
            <FaMapMarker />
            <p>위치: {convertCountry(channelData.country)}</p>
          </Row>
        </div>
      </Row>
    </div>
  );
};
const Row = styled.div`
  display: flex;
  align-items: ${(props) => props.align};
  gap: 16px;
  padding: 10px 0;
`;
const H4 = styled.h4`
  margin-bottom: 1em;
`;

export default ChannelInfo;

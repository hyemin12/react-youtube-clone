import styled from "styled-components";
import { countries } from "countries-list";

import Row from "../FlexRow";
import Description from "../Description";

import { FaChartLine, FaInfoCircle, FaMapMarker } from "react-icons/fa";

const ChannelInfo = (channelData) => {
  const { description, publishedAt, viewCount } = channelData;
  const convertCountry = () => {
    const countriesArr = Object.entries(countries);
    const countryCode = countriesArr.filter(
      (country) => country[0] === channelData.country
    )[0][1];
    return countryCode.native;
  };

  return (
    <div>
      <Row align={"start"} gap={30}>
        <div style={{ width: "69vw" }}>
          <H4>설명</H4>
          {description ? (
            <Description des={description} />
          ) : (
            <p>등록된 설명이 없습니다.</p>
          )}
        </div>
        {/* 오른쪽 사이드 - 추가정보 */}
        <aside style={{ flexGrow: 1 }}>
          <H4>추가정보</H4>
          <Row align={"center"} gap={16}>
            <FaInfoCircle />
            <P>가입일: {publishedAt.slice(0, 10)}</P>
          </Row>

          <Row align={"center"} gap={16}>
            <FaChartLine />
            <P>조회수: {parseInt(viewCount).toLocaleString()}회</P>
          </Row>

          <Row align={"center"} gap={16}>
            <FaMapMarker />
            <P>위치: {convertCountry()}</P>
          </Row>
        </aside>
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

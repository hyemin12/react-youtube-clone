import { useEffect, useState } from "react";
import styled from "styled-components";

import { converCount } from "../hooks/converCount";
import { requestContentDetails } from "../hooks/requestAxios";

import Loading from "./Loading";
import Thumbnail from "./Thumbnail";
import Title from "./Title";
import SubTitle from "./SubTitle";
import ViewUpload from "./ViewUpload";
import LinkButton from "./LinkButton";

// 추천 영상 (아이템)
const RecommendItem = ({ item, channelTitle }) => {
  const { title, publishedAt, thumbnails } = item.snippet;

  const id = item.contentDetails.upload
    ? item.contentDetails.upload.videoId
    : item.id;

  const [statsData, setStatsData] = useState({ viewNum: 0, length: "" });
  const [loading, setLoading] = useState(true);

  // 조회수 가져오는 함수
  const getData = async () => {
    try {
      const res = await requestContentDetails(id);

      setStatsData({
        viewNum: res.data.items[0].statistics.viewCount,
        videolength: res.data.items[0].contentDetails.duration,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LinkButton pathname={"/watch"} query={id}>
          <Row>
            <Thumbnail
              width={200}
              height={200 * (9 / 16)}
              title={title}
              url={thumbnails.medium.url}
              duration={statsData.videolength}
            />

            <ContentText>
              <Title size={16} text={title} cut={true} />
              <SubTitle text={channelTitle} />

              <ViewUpload
                view={converCount(statsData.viewNum)}
                date={publishedAt.slice(0, 19)}
                convert={true}
              />
            </ContentText>
          </Row>
        </LinkButton>
      )}
    </>
  );
};
const Row = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
const ContentText = styled.div`
  width: 180px;
  padding: 4px 0;
`;

export default RecommendItem;

import { useState } from "react";
import styled from "styled-components";

import { convertCount } from "../hooks/convertCount";

import Loading from "./Loading";
import Row from "./FlexRow";
import Thumbnail from "./Thumbnail";
import Title from "./Title";
import SubTitle from "./SubTitle";
import ViewUpload from "./ViewUpload";
import LinkButton from "./Button/LinkButton";
import useGetStatistics from "../hooks/getViewNumVideoLength";

// 추천 영상 (아이템)
const RecommendItem = ({ item, channelTitle }) => {
  const { title, publishedAt, thumbnails } = item.snippet;

  const id = item.contentDetails.upload
    ? item.contentDetails.upload.videoId
    : item.id;

  const [loading, setLoading] = useState(true);

  const { statisticsData } = useGetStatistics(id, setLoading);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LinkButton pathname={"/watch"} query={id}>
          <Row gap={10}>
            <Thumbnail
              width={"200px"}
              height={`${200 * (9 / 16)}px`}
              url={thumbnails.medium.url}
              title={title}
              duration={statisticsData.videoLength}
            />

            <ContentText>
              <Title size={16} text={title} cut={true} />
              <SubTitle text={channelTitle} />

              <ViewUpload
                view={convertCount(statisticsData.viewNum)}
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

const ContentText = styled.div`
  width: 180px;
  padding: 4px 0;
`;

export default RecommendItem;

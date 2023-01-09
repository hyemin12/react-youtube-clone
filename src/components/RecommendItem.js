import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { converCount } from "../hooks/converCount";

import Loading from "./Loading";
import Thumbnail from "./Thumbnail";
import Title from "./Title";
import SubTitle from "./SubTitle";
import ViewUpload from "./ViewUpload";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

// 추천 영상 (아이템)
const RecommendItem = ({ item, channelTitle }) => {
  const { title, publishedAt, thumbnails } = item.snippet;

  const id = item.contentDetails ? item.contentDetails.upload.videoId : item.id;

  const [ectData, setEctData] = useState({ viewNum: 0, length: "" });
  const [loading, setLoading] = useState(true);
  console.log(item.snippet);

  // 조회수 가져오는 함수
  const getData = async () => {
    try {
      const res =
        await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=statistics,contentDetails&key=${KEY}
    `);
      setEctData({
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
        <Link to={`../${id}`}>
          <Row>
            <Thumbnail
              width={200}
              height={200 * (9 / 16)}
              title={title}
              url={thumbnails.medium.url}
              duration={ectData.videolength}
            />

            <ContentText>
              <Title size={16} text={title} cut={true} />
              <SubTitle text={channelTitle} />

              <ViewUpload
                view={converCount(ectData.viewNum)}
                date={publishedAt.slice(0, 19)}
                convert={true}
              />
            </ContentText>
          </Row>
        </Link>
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

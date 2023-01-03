import { Link } from "react-router-dom";
import styled from "styled-components";

import Thumbnail from "./Thumbnail";
import SubTitle from "./SubTitle";
import Title from "./Title";
import UploadDate from "./UploadDate";
import ViewCount from "./ViewCount";
import axios from "axios";
import { useEffect, useState } from "react";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const Recommend = ({ item, channelTitle }) => {
  const { title, publishedAt, thumbnails } = item.snippet;
  const id = item.contentDetails.upload.videoId;

  const [viewNum, setViewNum] = useState(0);
  // 조회수 가져오는 함수
  const getData = async () => {
    try {
      const res =
        await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=statistics&key=${KEY}
    `);
      setViewNum(res.data.items[0].statistics.viewCount);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Link to={`../${id}`}>
      <Row>
        <Thumbnail
          width={200}
          height={200 * (9 / 16)}
          title={title}
          url={thumbnails.medium.url}
        />
        <ContentText>
          <Title size={16} text={title} mode={true} />
          <SubTitle text={channelTitle} />
          <Row>
            <ViewCount viewNum={viewNum} />
            <UploadDate date={publishedAt.slice(0, 19)} />
          </Row>
        </ContentText>
      </Row>
    </Link>
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

export default Recommend;

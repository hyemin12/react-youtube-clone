import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import { requestPlaylistItem } from "../../hooks/requestAxios";
import useGetStatistics from "../../hooks/useGetStatistics";

import LinkButton from "../Button/LinkButton";
import Description from "../Description";
import Row from "../FlexRow";
import Iframe from "../Iframe";
import Title from "../Title";
import ViewUpload from "../ViewUpload";
import ChannelVideoItem from "./ChannelVideoItem";

const ChannelHome = ({ videos, playlist }) => {
  const [loading, setLoading] = useState(true);

  const videolist = videos.result;

  // 최근 비디오 정보
  const recentVideo = {
    data: videolist[0].snippet,
    id: videolist[0].contentDetails.upload
      ? videolist[0].contentDetails.upload.videoId
      : videolist[0].contentDetails.playlistItem.resourceId.videoId,
  };

  // 조회수, 영상길이 가져오기
  const { viewCount } = useGetStatistics(recentVideo.id);

  // 플레이 리스트 정보 가져오기
  const [recentPlaylist, setRecentPlaylist] = useState({ title: "", list: "" });

  const playlistId =
    playlist.length > 0
      ? playlist.filter((item) => item.contentDetails.itemCount > 0)[0].id
      : null;

  const getPlaylistItems = useCallback(async () => {
    try {
      if (playlistId) {
        const resPlaylist = await requestPlaylistItem(playlistId, 10);

        setRecentPlaylist({
          title: playlist[0].snippet.title,
          list: resPlaylist.data.items,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [playlistId]);

  useEffect(() => {
    getPlaylistItems();
  }, []);
  return (
    <div>
      {viewCount && (
        <Row gap={30}>
          <Iframe
            id={recentVideo.id}
            title={recentVideo.data.title}
            width="640"
            height="360"
          />
          <div>
            <LinkButton pathname={"/watch"} query={recentVideo.id}>
              <Title text={recentVideo.data.title} size={18} />
            </LinkButton>
            <ViewUpload
              view={parseInt(viewCount).toLocaleString()}
              date={recentVideo.data.publishedAt}
              convert={true}
            />

            <DesContainer>
              <Description des={recentVideo.data.description} />
            </DesContainer>
            <LinkButton pathname={"/watch"} query={recentVideo.id}>
              자세히보기...
            </LinkButton>
          </div>
        </Row>
      )}
      <Section>
        <Title text="동영상" size={18} />
        <VideoRow>
          {videolist.slice(1, 11).map((video) => (
            <ChannelVideoItem {...video} key={video.etag} />
          ))}
        </VideoRow>
      </Section>
      {!loading && playlistId && (
        <Section>
          <Title text={recentPlaylist.title} size={18} />

          <VideoRow>
            {recentPlaylist.list.map((item) => (
              <ChannelVideoItem {...item} key={item.etag} />
            ))}
          </VideoRow>
        </Section>
      )}
    </div>
  );
};
const DesContainer = styled.div`
  flex-wrap: wrap;
  margin: 20px 0;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;
  position: relative;
`;
const Section = styled.div`
  margin-top: 10px;
  padding-top: 14px;
  border-top: 2px solid #ccc;
`;

const VideoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 0;
`;
export default ChannelHome;

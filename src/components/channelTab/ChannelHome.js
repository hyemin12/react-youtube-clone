import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import getViewNumVideoLength from "../../hooks/getViewNumVideoLength";
import { requestAxios, requestPlaylistItem } from "../../hooks/requestAxios";

import LinkButton from "../Button/LinkButton";
import Description from "../Description";
import Row from "../FlexRow";
import Iframe from "../Iframe";
import Title from "../Title";
import ViewUpload from "../ViewUpload";
import ChannelVideoItem from "./ChannelVideoItem";

const ChannelHome = (videoData) => {
  console.log(videoData);
  const [loading, setLoading] = useState(true);
  const { recentVideo, videos } = videoData;

  const recentVideoId = recentVideo.contentDetails.upload
    ? recentVideo.contentDetails.upload.videoId
    : recentVideo.contentDetails.playlistItem.resourceId.videoId;

  // 조회수, 영상길이
  const { statisticsData } = getViewNumVideoLength(recentVideoId);

  // 플레이 리스트
  const [playlist, setPlaylists] = useState({ title: "", list: "" });
  const playlistIndex = videos.findIndex(
    (element) => !element.contentDetails.upload
  );

  const getPlaylistItems = useCallback(async () => {
    const playlistId =
      videos[playlistIndex].contentDetails.playlistItem.playlistId;

    try {
      const resPLTitle = await requestAxios("playlists", {
        params: { part: "snippet", id: playlistId },
      });

      const resPlaylist = await requestPlaylistItem(playlistId, 10);

      setPlaylists({
        title: resPLTitle.data.items[0].snippet.title,
        list: resPlaylist.data.items,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [playlistIndex]);
  console.log(playlist);

  useEffect(() => {
    getPlaylistItems();
  }, [playlistIndex]);
  return (
    <div>
      {statisticsData && (
        <Row gap={30}>
          <Iframe
            id={recentVideoId}
            title={recentVideo.snippet.title}
            width="640"
            height="360"
          />
          <div>
            <LinkButton pathname={"/watch"} query={recentVideoId}>
              <Title text={recentVideo.snippet.title} size={18} />
            </LinkButton>
            <ViewUpload
              view={parseInt(statisticsData.viewNum).toLocaleString()}
              date={recentVideo.snippet.publishedAt}
              convert={true}
            />

            <DesContainer>
              <Description des={recentVideo.snippet.description} />
            </DesContainer>
            <LinkButton pathname={"/watch"} query={recentVideoId}>
              자세히보기...
            </LinkButton>
          </div>
        </Row>
      )}
      <Section>
        <Title text="동영상" size={18} />
        <VideoRow>
          {videos
            .filter((video) => video.contentDetails.upload !== undefined)
            .slice(1, 11)
            .map((video) => (
              <ChannelVideoItem {...video} key={video.etag} />
            ))}
        </VideoRow>
      </Section>
      <Section>
        <Title text={playlist.title} size={18} />
        {!loading && (
          <VideoRow>
            {playlist.list.map((item) => (
              <ChannelVideoItem {...item} key={item.etag} />
            ))}
          </VideoRow>
        )}
      </Section>
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

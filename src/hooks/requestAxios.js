import axios from "axios";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

/** youtube api 가져오는 인스턴스
 * requestAxios.get('',{params: {}}) 로 작성해서 사용
 * params 안에 part, maxResult, q, type, pageToken 등 옵션 작성
 */
export const requestAxios = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { key: KEY, regionCode: "kr" },
});

/** 영상 목록 가져오기 (default:인기, videoCategory )  */
export const requestPopularVideos = (videoCategory, maxResult = 32) =>
  requestAxios.get("videos", {
    params: {
      part: "snippet,statistics,contentDetails",
      chart: "mostPopular",
      maxResults: maxResult,
      videoCategoryId: videoCategory && videoCategory,
    },
  });

/** 영상 디테일 정보 가져오기 (조회수, 좋아요, 영상길이 등)  */
export const requestContentDetails = (videoId) =>
  requestAxios.get("videos", {
    params: { part: "statistics,contentDetails", id: videoId },
  });

/** 검색결과 (영상 리스트) */
export const requestSearchVideos = (query, maxResult = 32) =>
  requestAxios.get("search", {
    params: {
      part: "snippet",
      maxResults: maxResult,
      q: query,
      type: "video",
    },
  });

/** 채널 정보 가져오기 */
export const requestChannel = (channelId) =>
  requestAxios.get("channels", {
    params: {
      part: "snippet,statistics,contentDetails,brandingSettings",
      id: channelId,
    },
  });

/** 채널 기본정보만 가져오기 (썸네일만 가져올때 사용) */
export const requestChannelThumb = (channelId) =>
  requestAxios.get("channels", {
    params: {
      part: "snippet",
      id: channelId,
    },
  });

/** 채널아이디를 기반으로 영상 목록 가져오기 */
export const requestVideos = (channelId, token) =>
  requestAxios.get("activities", {
    params: {
      part: "snippet,contentDetails",
      channelId: channelId,
      maxResults: 15,
      pageToken: token && token,
    },
  });

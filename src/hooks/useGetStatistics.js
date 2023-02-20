import { useEffect, useState } from "react";
import { requestContentDetails } from "./requestAxios";

/** 조회수, 영상길이 가지고오는 함수
 * viewCount: 조회수
 * duration: 영상길이
 */
const useGetStatistics = (videoId, setLoading) => {
  const [viewCount, setViewCount] = useState("");
  const [duration, setDuration] = useState("");

  const id = typeof videoId === "object" ? videoId.videoId : videoId;

  const getViewCountDuration = async () => {
    try {
      const res = await requestContentDetails(id);

      setViewCount(res.data.items[0].statistics.viewCount);
      setDuration(res.data.items[0].contentDetails.duration);

      setLoading && setLoading(false);
    } catch (err) {
      return console.log(err);
    }
  };

  useEffect(() => {
    getViewCountDuration();
  }, []);

  return { viewCount, duration };
};

export default useGetStatistics;

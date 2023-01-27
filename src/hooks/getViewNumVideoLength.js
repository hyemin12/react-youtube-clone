import { useEffect, useState } from "react";
import { requestContentDetails } from "./requestAxios";

/** 조회수, 영상길이 가지고오는 함수
 * viewNum: 조회수
 * videoLength: 영상길이
 */
const useGetStatistics = (videoId, setLoading) => {
  const [statisticsData, setStatisticData] = useState();

  const getViewNumVideoLength = async () => {
    try {
      const res = await requestContentDetails(videoId);
      setStatisticData({
        viewNum: res.data.items[0].statistics.viewCount,
        videoLength: res.data.items[0].contentDetails.duration,
      });
      setLoading(false);
    } catch (err) {
      return console.log(err);
    }
  };
  useEffect(() => {
    getViewNumVideoLength();
  }, []);

  return { statisticsData };
};

export default useGetStatistics;

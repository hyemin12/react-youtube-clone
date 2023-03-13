const useGetVideoId = (item) => {
  let videoId;
  switch (item.snippet.type) {
    case "upload":
      videoId = item.contentDetails.upload.videoId;
      break;
    case "playlistItem":
      videoId = item.contentDetails.playlistItem.resourceId
        ? item.contentDetails.playlistItem.resourceId.videoId
        : item.contentDetails.videoId;
      break;
    default:
      videoId = item.id;
  }
  return videoId;
};
export default useGetVideoId;

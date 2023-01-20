import { Route, Routes } from "react-router-dom";

import { useSearchContext } from "../hooks/searchContext";
import Home from "../pages/Home";
import Video from "../pages/Video";
import PlayListVideo from "../pages/PlayListVideo";
import Search from "../pages/Search";
import Channel from "../pages/Channel";
import HistoryPage from "../pages/History";
import NotFound from "../pages/NotFound";

const Router = () => {
  const { searchQuery } = useSearchContext();

  return (
    <Routes>
      <Route path={"/channel"} element={<Channel />}></Route>
      <Route
        path={`/results/:search=${searchQuery.q}`}
        element={<Search />}
      ></Route>
      <Route path={"/history"} element={<HistoryPage />}></Route>
      <Route path="/playlist" element={<PlayListVideo />}></Route>
      <Route path="/watch" element={<Video />}></Route>
      <Route exact path="/" element={<Home />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};
export default Router;

import { Route, Routes, useLocation, useParams } from "react-router-dom";

import Home from "../pages/Home";
import Video from "../pages/Video";
import Search from "../pages/Search";

import { useSearchContext } from "../hooks/searchContext";
import NotFound from "../pages/NotFound";
import Channel from "../pages/Channel";

const Router = () => {
  const { searchQuery } = useSearchContext();
  const param = useParams();
  const location = useLocation();
  console.log(param, location);
  return (
    <Routes>
      <Route path={"/channel"} element={<Channel />}></Route>
      <Route
        path={`/results/:search=${searchQuery.q}`}
        element={<Search />}
      ></Route>

      <Route path="/watch" element={<Video />}></Route>
      <Route exact path="/" element={<Home />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};
export default Router;

import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Video from "../pages/Video";
import Search from "../pages/Search";

import { useSearchContext } from "../hooks/searchContext";
import NotFound from "../pages/NotFound";

const Router = () => {
  const { searchQuery } = useSearchContext();
  return (
    <>
      <Routes>
        <Route
          path={`/results/:search=${searchQuery.q}`}
          element={<Search />}
        ></Route>
        <Route path="/watch?/:id" element={<Video />}></Route>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
export default Router;

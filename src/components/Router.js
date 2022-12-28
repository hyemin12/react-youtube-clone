import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Video from "../pages/Video";
import Search from "../pages/Search";

import { useSearchContext } from "../hooks/searchContext";

const Router = () => {
  const { query } = useSearchContext();
  console.log(query);
  return (
    <>
      <Routes>
        <Route path={`/results?search=${query}`} element={<Search />}></Route>
        <Route path="/:id" element={<Video />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
};
export default Router;

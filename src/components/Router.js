import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Video from "../pages/Video";
import Search from "../pages/Search";

import { useSearchContext } from "../hooks/searchContext";

const Router = () => {
  const { searchQuery } = useSearchContext();
  console.log(searchQuery);
  return (
    <>
      <Routes>
        <Route
          path={`/results/:search=${searchQuery.q}`}
          element={<Search />}
        ></Route>
        <Route path="/watch?/:id" element={<Video />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
};
export default Router;

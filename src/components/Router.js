import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Video from "../pages/Video";

const Router = () => {
  return (
    <>
      <Routes>
        <Route to="/:id" element={<Video />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
};
export default Router;

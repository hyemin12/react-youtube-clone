import axios from "axios";
import { useEffect } from "react";

import Router from "./components/Router";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

function App() {
  const getData = async () => {
    const res =
      await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${KEY}
    &part=snippet,contentDetails,statistics,status
`);
    console.log(res);
  };
  useEffect(() => {
    getData();
  });
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;

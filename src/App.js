import Router from "./components/Router";
import { ChannelIdContextProvider } from "./hooks/getChannelIdContext";
import { ContextProvier } from "./hooks/searchContext";

function App() {
  return (
    <div className="App">
      <ContextProvier>
        <ChannelIdContextProvider>
          <Router />
        </ChannelIdContextProvider>
      </ContextProvier>
    </div>
  );
}

export default App;

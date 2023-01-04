import Router from "./components/Router";
import { ContextProvier } from "./hooks/searchContext";

function App() {
  return (
    <div className="App">
      <ContextProvier>
        <Router />
      </ContextProvier>
    </div>
  );
}

export default App;

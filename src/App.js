import "./App.css";
import AppRouter from "./pages/Router";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div
        className="App"
        style={{
          background: "#FAF8FB",
        }}
      >
        <AppRouter />
      </div>
    </RecoilRoot>
  );
}

export default App;

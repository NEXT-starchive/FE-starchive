import "./App.css";
import AppRouter from "./pages/Router";
import EventPractice from "./components/Header/Greeting/Greeting";
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

const Happ = () => {
  return <EventPractice />;
};

export { App, Happ };

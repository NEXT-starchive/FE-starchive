import "./App.css";
import AppRouter from "./pages/Router";
import EventPractice from "./components/Header/Greeting/Greeting";

function App() {
  return (
    <div
      className="App"
      style={{
        background: "#FAF8FB",
      }}
    >
      <AppRouter />
    </div>
  );
}

const Happ = () => {
  return <EventPractice />;
};

export { App, Happ };

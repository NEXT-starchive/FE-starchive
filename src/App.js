import "./App.css";
import Home from "./pages/Home";
import EventPractice from "./components/Header/Greeting/Greeting"

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

const Happ = () => {
  return <EventPractice/>;
};

export { App, Happ };

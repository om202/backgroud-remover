import "./App.css";
import Jumbo from "./components/Jumbo";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="bg-white p-6 h-screen">
      <Nav />
      <Jumbo />
    </div>
  );
}

export default App;

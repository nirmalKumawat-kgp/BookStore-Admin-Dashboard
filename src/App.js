import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;

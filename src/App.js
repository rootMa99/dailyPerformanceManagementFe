import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import "./App.css";
import NavBar from "./components/UI/NavBar";
import Home from "./components/home/Home";
import api from "./service/api";
import { dataActions } from "./components/store/dataSlice";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/dpm/owners`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      dispatch(dataActions.setKpiOwners(data));
    } catch (error) {
      console.error("Error:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    callback();
  }, [callback]);

  useEffect(() => {
    if (currentPath === "/admin") {
      const currentDate = new Date();

      const targetDate = new Date("2024-04-25");

      if (currentDate < targetDate) {
        alert(
          "We have made some updates. If you encounter any problems, please don't hesitate to contact Haidar Oussil or Zeroual Anass via Teams."
        );
      }
    }
  }, [currentPath]);

  return (
    <div className="App">
      <NavBar />
      <Home />
      <p className="sign" >developed by: <a href="https://www.linkedin.com/in/anass-zeroual-54a90b1b8/">Anass Zeroual</a></p>
    </div>
  );
}

export default App;

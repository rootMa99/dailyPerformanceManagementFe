import { useDispatch } from "react-redux";
import { Suspense, useCallback, useEffect } from "react";
import "./App.css";
import NavBar from "./components/UI/NavBar";
import Home from "./components/home/Home";
import api from "./service/api";
import { dataActions } from "./components/store/dataSlice";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ActionExitCriteria from "./components/UI/ActionExitCriteria";

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
      <Suspense>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin" element={<Home />} />
        <Route exact path="/aec" element={<ActionExitCriteria />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Suspense>
      
    </div>
  );
}

export default App;
// <p className="sign">
//         <a href="https://www.aptiv.com/" target="_blank" rel="noreferrer">
//           ©APTIV M4-Meknès.
//         </a>{" "}
//         All Rights Reserved. Designed and developed by:{" "}
//         <a
//           href="https://www.linkedin.com/in/anass-zeroual-54a90b1b8/"
//           target="_blank"
//           rel="noreferrer"
//         >
//           Zeroual Anass
//         </a>
//       </p>
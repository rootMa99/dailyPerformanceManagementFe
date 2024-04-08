import { useDispatch } from "react-redux";
import { useCallback, useEffect } from 'react';
import './App.css';
import NavBar from './components/UI/NavBar';
import Home from './components/home/Home';
import api from './service/api';
import { dataActions } from "./components/store/dataSlice";

function App() {
  const dispatch= useDispatch()
  const callback=useCallback(async ()=>{

    try {
      const response = await fetch(`${api}/dpm/owners`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      dispatch(
        dataActions.setKpiOwners(data)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }, [dispatch])

useEffect(()=>{
  callback();
}, [callback])


  return (
    <div className="App">
      <NavBar />
      <Home />
    </div>
  );
}

export default App;

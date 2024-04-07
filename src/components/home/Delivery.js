import React, { useCallback, useEffect } from "react";
import {  useSelector } from "react-redux";
import api from "../../service/api";

const Delivery=p=>{
    const {date}= useSelector(s=>s.data);
    const callback=useCallback(async ()=>{
        try {
          const response = await fetch(`${api}/dpm/delivery?startDate=${date.start}&endDate=${date.end}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const data = await response.json();
          console.log(data)
        } catch (error) {
          console.error("Error:", error);
        }
   
      }, [date.start, date.end])
    
    useEffect(()=>{
      callback();
    }, [callback])


    return(
        <React.Fragment>

        </React.Fragment>
    )

}

export default Delivery;
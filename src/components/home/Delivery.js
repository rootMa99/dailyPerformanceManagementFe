import React, { useCallback, useEffect, useState } from "react";
import {  useSelector, useDispatch } from "react-redux";
import api from "../../service/api";
import { separateDataByName } from "../functions/newUtils";
import { dataActions } from "../store/dataSlice";
import { getOnlyDay } from "../functions/utils";
import Dtable from "../alphabet/Dtable";
import Profile from "../UI/Profile";
import { useLocation } from "react-router";

const Delivery=p=>{
    const {date, kpiOwners}= useSelector(s=>s.data);
    const [deliveryData, setDeliveryData]= useState([]);
    const dispatch = useDispatch();
    const delivery = kpiOwners.findIndex((f) => f.kpiOwn === "delivery");
    const location = useLocation();
    const currentPath = location.pathname;

    const callback=useCallback(async ()=>{
        try {
          const response = await fetch(`${api}/dpm/delivery?startDate=${date.start}&endDate=${date.end}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const data = await response.json();
          console.log(data, separateDataByName(data))
          const d=separateDataByName(data)
          setDeliveryData(getOnlyDay((d.filter(f=>f.name==="first"))[0].data))
          dispatch(dataActions.addDelevery(d))
        } catch (error) {
          console.error("Error:", error);
        }
   
      }, [dispatch, date.start, date.end])
    
    useEffect(()=>{
      callback();
    }, [callback])


    return(
        <React.Fragment>
          <Dtable data={deliveryData} date={new Date(date.start)}/>
          <Profile
          urlI={delivery !== -1 ? kpiOwners[delivery].uri : ""}
          name={delivery !== -1 ? kpiOwners[delivery].name : "N/A"}
          coName={delivery !== -1 ? kpiOwners[delivery].coName : "N/A"}
          kpiOwn="delivery"
          path={currentPath}
        />
        </React.Fragment>
    )

}

export default Delivery;
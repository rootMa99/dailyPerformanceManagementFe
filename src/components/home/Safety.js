
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import c from "./Delivery.module.css";
import { useLocation } from "react-router";
import { separateDataByName } from "../functions/newUtils";
import { getOnlyDay } from "../functions/utils";
import { dataActions } from "../store/dataSlice";
import api from "../../service/api";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    BarElement,
  } from "chart.js";

const Safety =p=>{
    const { date, kpiOwners } = useSelector((s) => s.data);
    const [deliveryData, setDeliveryData] = useState([]);
    const dispatch = useDispatch();
    const safety = kpiOwners.findIndex((f) => f.kpiOwn === "safety");
    const location = useLocation();
    const currentPath = location.pathname;
  
    const callback = useCallback(async () => {
      try {
        const response = await fetch(
          `${api}/dpm/safety?startDate=${date.start}&endDate=${date.end}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        const data = await response.json();
        console.log(data, separateDataByName(data));
        const d = separateDataByName(data);
        setDeliveryData(getOnlyDay(d.filter((f) => f.name === "first")[0].data));
        dispatch(dataActions.addDelevery(d));
      } catch (error) {
        console.error("Error:", error);
      }
    }, [dispatch, date.start, date.end]);
  
    useEffect(() => {
      callback();
    }, [callback]);
    // const pareto = getParetp(p.data).sort((a, b) => {
    //   return b.percentage - a.percentage;
    // });
    // console.log(pareto);
    console.log(deliveryData);
    const bgcolor = [];
  
    deliveryData.map((m) =>
      m.data.type === "negative"
        ? m.data.real >= m.data.target
          ? bgcolor.push("rgb(88, 3, 3)")
          : bgcolor.push("#005B41")
        : m.data.real >= m.data.target
        ? bgcolor.push("#005B41")
        : bgcolor.push("rgb(88, 3, 3)")
    );
  
    const data = {
      labels: deliveryData.map((m) => m.day),
      datasets: [
        {
          type: "line",
          label: "Target",
          data: deliveryData.map((m) => m.data.target),
          backgroundColor: "#F84018",
          pointHoverBorderColor: "#FAF0E6",
          borderColor: "#3BC6EB",
          fill: false,
          tension: 0.3,
          borderWidth: 3,
          borderCapStyle: "round",
          pointHoverBackgroundColor: "rgb(88, 3, 3)",
          pointHoverRadius: 8,
          pointBorderColor: "#3BC6EB",
          pointBorderWidth: 8,
          pointRadius: 1,
          borderDash: [5, 7],
        },
        {
          type: "bar",
          label: "Actual",
          data: deliveryData.map((m) => m.data.real),
          backgroundColor: bgcolor,
          //hoverBackgroundColor: "#950101",
          // pointHoverBorderColor: "#FAF0E6",
          borderColor: "#F84018",
          fill: false,
          tension: 0.3,
          borderWidth: 1,
          borderCapStyle: "round",
          // pointHoverBackgroundColor: "rgb(88, 3, 3)",
          pointHoverRadius: 8,
          pointBorderColor: bgcolor,
          pointBorderWidth: 8,
          pointRadius: 3,
        },
      ],
    };
    // const paretoChart = {
    //   labels: pareto.map((m) => m.motif),
    //   datasets: [
    //     {
    //       type: "bar",
    //       label: "Pareto",
    //       data: pareto.map((m) => m.percentage),
    //       backgroundColor: "#4E7C88",
    //       hoverBackgroundColor: "#929D96",
    //       borderColor: "black",
    //       borderWidth: 1,
    //     },
    //   ],
    // };
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            color: "white",
            fontWeight: "bold",
          },
        },
        y: {
          grid: {
            color: "#f3f3f34f",
          },
          ticks: {
            display: p.home === undefined ? false : true,
            color: "white",
            fontWeight: "bold",
          },
          y: {
            stacked: true,
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#FAF0E6",
          },
          display: true,
        },
        datalabels: {
          display: true,
        },
      },
      animation: p.home === undefined && {
        onComplete: (animation) => {
          const { chart } = animation;
          const ctx = chart.ctx;
          chart.data.datasets.forEach((dataset, index) => {
            const meta = chart.getDatasetMeta(index);
            meta.data.forEach((element, index) => {
              const data =
                dataset.type === "line"
                  ? p.warn !== "productivity"
                    ? dataset.data[index]
                    : `${dataset.data[index]}%`
                  : `${dataset.data[index]}%`;
              let xPos, yPos;
              if (dataset.type === "bar") {
                xPos = element.x;
                yPos = element.y + 15;
              } else if (dataset.type === "line") {
                xPos = element.x;
                yPos = element.y - 10;
              }
              ctx.save();
              ctx.textAlign = "center";
              ctx.fillStyle = dataset.type === "bar" ? "#FFFAD7" : "#EEEEEE";
              ctx.font = "17px Arial";
              ctx.fillText(data, xPos, yPos);
              ctx.restore();
            });
          });
        },
      },
    };
    ChartJS.register(
      LineElement,
      CategoryScale,
      LinearScale,
      PointElement,
      Tooltip,
      Legend,
      BarElement
    );

    return(
        <React.Fragment>
        </React.Fragment>
    )

}

export default Safety;
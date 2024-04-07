import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../service/api";
import { separateDataByName } from "../functions/newUtils";
import { dataActions } from "../store/dataSlice";
import { formatDate, getOnlyDay } from "../functions/utils";
import Dtable from "../alphabet/Dtable";
import Profile from "../UI/Profile";
import { useLocation } from "react-router";
import c from "./Delivery.module.css";
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
import { Line } from "react-chartjs-2";
import Ttable from "../alphabet/Ttable";
import Stable from "../alphabet/Stable";
import Qletter from "../alphabet/Qletter";
import Itable from "../alphabet/Itable";
import Ptable from "../alphabet/Ptable";
import Ktable from "../alphabet/Ktable";
import BackDrop from "../UI/BackDrop";
import Details from "./Details";
const Delivery = (p) => {
  const [showkpi, setShowKpi] = useState(false);
  const { date, kpiOwners } = useSelector((s) => s.data);
  const [deliveryData, setDeliveryData] = useState([]);
  const dispatch = useDispatch();
  const delivery = kpiOwners.findIndex((f) => f.kpiOwn === p.title);
  const location = useLocation();
  const currentPath = location.pathname;

  const callback = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/dpm/${p.title}?startDate=${date.start}&endDate=${date.end}`,
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
      p.title === "delivery" && dispatch(dataActions.addDelevery(d));

      p.title === "safety" && dispatch(dataActions.addSafety(d));

      p.title === "skills" && dispatch(dataActions.addSkills(d));

      p.title === "quality" && dispatch(dataActions.addQuality(d));

      p.title === "inventory" && dispatch(dataActions.addInventory(d));

      p.title === "productivity" && dispatch(dataActions.addProductivity(d));

      p.title === "kaizen" && dispatch(dataActions.addKaizen(d));
    } catch (error) {
      console.error("Error:", error);
    }
  }, [dispatch, date.start, date.end, p.title]);

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
    // animation: p.home === undefined && {
    //   onComplete: (animation) => {
    //     const { chart } = animation;
    //     const ctx = chart.ctx;
    //     chart.data.datasets.forEach((dataset, index) => {
    //       const meta = chart.getDatasetMeta(index);
    //       meta.data.forEach((element, index) => {
    //         const data =
    //           dataset.type === "line"
    //             ? p.warn !== "productivity"
    //               ? dataset.data[index]
    //               : `${dataset.data[index]}%`
    //             : `${dataset.data[index]}%`;
    //         let xPos, yPos;
    //         if (dataset.type === "bar") {
    //           xPos = element.x;
    //           yPos = element.y + 15;
    //         } else if (dataset.type === "line") {
    //           xPos = element.x;
    //           yPos = element.y - 10;
    //         }
    //         ctx.save();
    //         ctx.textAlign = "center";
    //         ctx.fillStyle = dataset.type === "bar" ? "#FFFAD7" : "#EEEEEE";
    //         ctx.font = "17px Arial";
    //         ctx.fillText(data, xPos, yPos);
    //         ctx.restore();
    //       });
    //     });
    //   },
    // },
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

  const close = (e) => {
    setShowKpi(false);
  };

  return (
    <React.Fragment>
      {showkpi && (
        <React.Fragment>
          <BackDrop click={close} />
          <Details title={showkpi} />
        </React.Fragment>
      )}
      <div className={c.containerData}>
        <div className={c.letter} onClick={(e) => setShowKpi(p.title)}>
          {p.title === "delivery" && (
            <Dtable data={deliveryData} date={new Date(date.start)} />
          )}
          {p.title === "safety" && (
            <Ttable data={deliveryData} date={new Date(date.start)} />
          )}
          {p.title === "skills" && (
            <Stable data={deliveryData} date={new Date(date.start)} />
          )}
          {p.title === "quality" && (
            <Qletter data={deliveryData} date={new Date(date.start)} />
          )}
          {p.title === "inventory" && (
            <Itable data={deliveryData} date={new Date(date.start)} />
          )}
          {p.title === "productivity" && (
            <Ptable data={deliveryData} date={new Date(date.start)} />
          )}
          {p.title === "kaizen" && (
            <Ktable data={deliveryData} date={new Date(date.start)} />
          )}
        </div>
        <Profile
          urlI={delivery !== -1 ? kpiOwners[delivery].uri : ""}
          name={delivery !== -1 ? kpiOwners[delivery].name : "N/A"}
          coName={delivery !== -1 ? kpiOwners[delivery].coName : "N/A"}
          kpiOwn="delivery"
          path={currentPath}
        />
        <div className={c.chartHolder}>
          <div className={c.titletop}>
            <span></span>
            <h3> {p.title} </h3>
            <span></span>
          </div>
          <Line data={data} options={options} />
          {p.home === undefined && (
            <React.Fragment>
              <div className={c.title}>
                <span></span>
                <h3> Action plan </h3>
                <span></span>
              </div>
              <table className={c.table}>
                <thead>
                  <tr>
                    <th>day</th>
                    <th>issue Description</th>
                    <th>causes</th>
                    <th width="30%">contermeasures</th>
                    <th>due Date</th>
                    <th>resp</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryData.map(
                    (m, i) =>
                      m.data.apm != null &&
                      m.data.apm.map((m) => (
                        <tr
                          key={m.id}
                          style={
                            m.dueDate < formatDate(new Date())
                              ? { backgroundColor: "red" }
                              : {}
                          }
                        >
                          <td>{m.day}</td>
                          <td>{m.issueDescription}</td>
                          <td>{m.causes}</td>
                          <td>{m.contermeasures}</td>
                          <td>{m.dueDate}</td>
                          <td>{m.resp}</td>
                          <td>{m.status}</td>
                        </tr>
                      ))
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </React.Fragment>
          )}
        </div>
        );
      </div>
    </React.Fragment>
  );
};

export default Delivery;

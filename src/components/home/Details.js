import React, { useCallback, useEffect, useState } from "react";
import c from "./Details.module.css";
import imglogo from "../../assets/aptiv-logo.svg";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
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
import { formatDate, getOnlyDay } from "../functions/utils";
import Select from "react-select";
import api from "../../service/api";
import { newgetlabelandvalue } from "../functions/newUtils";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "97%",
    height: "auto",
    fontWeight: "600",
    textTransform: "uppercase",
    borderRadius: "5px",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                  "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                  "Segoe UI Symbol"`,
    letterSpacing: "2px",
    textAlign: "center",
    outline: "none",
    border: "1px solid #414141",
    backgroundColor: "transparent",
    boxShadow: "none",
    margin: "auto",
    "&:hover": {
      border: "1px solid #f33716",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    width: "97%",
    padding: "0.5rem",
    color: state.isFocused ? "#f3f3f3" : "#f33716",
    backgroundColor: state.isFocused && "#474b4d",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                  "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                  "Segoe UI Symbol"`,
    textTransform: "uppercase",
    outline: "none",
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#f3f3f3",
  }),
  singleValue: (p) => ({
    ...p,
    color: "#f3f3f3",
  }),
  menuList: (provided) => ({
    maxHeight: "200px",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: "5px",
      backgroundColor: "#535151",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f33716",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),
};

const Details = (p) => {
  const { data } = useSelector((s) => s.data);
  const [kpiListOwner, setKpiListOwner] = useState([]);
  const [kpi, setKpi] = useState({});
  useEffect(() => {
    if (kpiListOwner.length > 0) {
      const d = kpiListOwner.filter((f) => f.kpiName === "first");
      console.log(d);
      setKpi({ label: d[0].alias, value: d[0].kpiName });
    }
  }, [kpiListOwner]);
  console.log(
    data[p.title].length,
    ...kpiListOwner.filter((f) => f.kpiName === "first")
  );
  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/dpm/kpiNames?kpiName=${p.title}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setKpiListOwner(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [p.title]);

  useEffect(() => {
    callback();
  }, [callback]);

  let deliveryData;
  try {
    deliveryData =
      data[p.title].length !== 0
        ? getOnlyDay(data[p.title].filter((f) => f.name === kpi.value)[0].data)
        : [];
  } catch (error) {
    deliveryData = [];
  }

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
  const datac = {
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    // labels: deliveryData.map((m) => m.day),
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
        borderColor: "#F84018",
        borderWidth: 1,
      },
    ],
  };
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
            const data = `${dataset.data[index]}%`;
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


  console.log(kpi.label)

  return (
    <React.Fragment>
      <div className={c["form-container"]}>
        <div className={c.selectContainer}>
          <Select
            options={newgetlabelandvalue(kpiListOwner)}
            styles={customStyles}
            placeholder="select KPI"
            onChange={(e) => setKpi(e)}
            value={kpi}
          />
        </div>
        <div className={c.logo}>
          <img src={imglogo} alt="logo for aptiv" />
        </div>
        <div className={c.holt}>
          <div className={c.employeeT}>
            <span></span>
            <h1>{kpi.label!==undefined ? kpi.label : `${p.title} - no kpi found`}</h1>
          </div>
          <div className={c.title}>
            <span></span>
            <h3> trend </h3>
            <span></span>
          </div>
        </div>

        <div className={c.chartHolder}>
          <Line data={datac} options={options} />
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
                        <tr key={m.id}>
                          <td>{m.issueDescription}</td>
                          <td>{m.causes}</td>
                          <td>{m.contermeasures}</td>
                          <td
                            style={
                              m.dueDate < formatDate(new Date())
                                ? { backgroundColor: "red" }
                                : {}
                            }
                          >
                            {m.dueDate}
                          </td>
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
                  </tr>
                </tfoot>
              </table>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Details;

// const data =
//               dataset.type === "line"
//                 ? p.warn !== "productivity"
//                   ? dataset.data[index]
//                   : `${dataset.data[index]}%`
//                 : `${dataset.data[index]}%`;

import React, { useCallback, useEffect, useState } from "react";
import c from "./Details.module.css";
import imglogo from "../../assets/aptiv-logo.svg";
import { useSelector } from "react-redux";
import { Bar, Line } from "react-chartjs-2";
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
import { formatDate, getOnlyDay, getParetp } from "../functions/utils";
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
      const d =
        kpiListOwner.filter((f) => f.kpiName === "first");
      console.log(d);
      setKpi({ label: d[0].alias, value: d[0].kpiName });
    }
  }, [kpiListOwner, p.title]);
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
  const pareto = getParetp(deliveryData).sort((a, b) => {
    return b.percentage - a.percentage;
  });
  const bgcolor = [];

  deliveryData.map((m) =>
    m.data.type === "negative"
      ? m.data.real > m.data.target
        ? bgcolor.push("#CF3335")
        : bgcolor.push("#00AC9E")
      : m.data.real >= m.data.target
      ? bgcolor.push("#00AC9E")
      : bgcolor.push("#CF3335")
  );
  const datac = {
    labels: deliveryData.map((m) => m.day),
    datasets: [
      {
        type: "bar",
        label: "Real",
        data: deliveryData.map((m) => m.data.real.toFixed(1)),
        backgroundColor: bgcolor,
        borderColor: "#F84018",
        borderWidth: 1,
        yAxisID: 'y',
        order: 3
      },
      {
        type: "line",
        label: "Target",
        data: deliveryData.map((m) => m.data.target.toFixed(1)),
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
        yAxisID: 'y',
        order: 2
      },
      {
        type: "line",
        label: "Cumulative",
        data: (() => {
          let cumsum = 0;
          return deliveryData.map((m) => {
            cumsum += parseFloat(m.data.real);
            return cumsum.toFixed(1);
          });
        })(),
        backgroundColor: "#FFD700",
        borderColor: "#FFD700",
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        yAxisID: 'y1',
        order: 1
      }
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
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "#FFD700",
          fontWeight: "bold",
          display: p.home === undefined ? false : true,
        },
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
      },
    },
    layout: {
      padding: {
        top: 70 
      }
    },
    animation: p.home === undefined && {
      onComplete: (animation) => {
        const { chart } = animation;
        const ctx = chart.ctx;
        
        const chartArea = chart.chartArea;
        
        const positions = {
          Target: chartArea.top - 55,
          Cumulative: chartArea.top - 30,
          Real: null
        };
        
        ['Real', 'Target', 'Cumulative'].forEach(labelType => {
          const dataset = chart.data.datasets.find(ds => ds.label === labelType);
          if (!dataset) return;
          
          const meta = chart.getDatasetMeta(chart.data.datasets.indexOf(dataset));
          meta.data.forEach((element, index) => {
            const data = `${dataset.data[index]}`;
            let xPos = element.x;
            let yPos;
            
            if (labelType === 'Real') {
              yPos = element.y + (element.height ? element.height / 2 : 0);
            } else {
              yPos = positions[labelType];
            }
            
            const colors = {
              Real: "#FFFAD7",
              Target: "#EEEEEE",
              Cumulative: "#FFD700"
            };
            
            ctx.save();
            ctx.textAlign = "center";
            ctx.font = "bold 17px Arial";
            
            const textWidth = ctx.measureText(data).width;
            const padding = 4;
            const height = 20;
            
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(
              xPos - textWidth/2 - padding,
              yPos - height + padding,
              textWidth + (padding * 2),
              height
            );
            
            ctx.fillStyle = colors[labelType];
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
  const paretoChart = {
    labels: pareto.map((m) => m.motif),
    datasets: [
      {
        type: "bar",
        label: "Pareto",
        data: pareto.map((m) => m.percentage),
        backgroundColor: "#4E7C88",
        hoverBackgroundColor: "#929D96",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  console.log(kpi.label);

  return (
    <React.Fragment>
      <div className={c["form-container"]}>
        <div className={c.selectContainer}>
          <Select
            options={newgetlabelandvalue(kpiListOwner, p.title)}
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
            <h1>
              {kpi.label !== undefined
                ? kpi.label
                : `${p.title} - no kpi found`}
            </h1>
          </div>
        </div>

        <div className={c.chartHolder}>
          <div className={c.title}>
            <span></span>
            <h3> trend </h3>
            <span></span>
          </div>
          <div style={{ height: "35rem"}}>
            <Line data={datac} options={options} />
          </div>
          {pareto.length > 0 && (
            <React.Fragment>
              <div className={c.title}>
                <span></span>
                <h3> preto </h3>
                <span></span>
              </div>
              <div style={{ height: "25rem"}}>
                <Bar data={paretoChart} options={options} />
              </div>
            </React.Fragment>
          )}
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
                    <th width="25%">contermeasures</th>
                    <th>open Date</th>
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
                            m.status === "rc fix confirmed"
                              ? { backgroundColor: "#006B63" }
                              : m.status === "action complete"
                              ? { backgroundColor: "#00AC9E" }
                              : {}
                          }
                        >
                          <td>{m.issueDescription}</td>
                          <td>{m.causes}</td>
                          <td>{m.contermeasures}</td>
                          <td>
                            {m.openDate}
                          </td>
                          <td
                            style={
                              m.dueDate < formatDate(new Date()) &&
                              m.status !== "action complete" &&
                              m.status !== "rc fix confirmed"
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

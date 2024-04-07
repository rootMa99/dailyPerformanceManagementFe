import c from "./Charts.module.css";
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
import React from "react";
import { formatDate, getParetp } from "../functions/utils";

const Charts = (p) => {
  const pareto = getParetp(p.data).sort((a, b) => {
    return b.percentage - a.percentage;
  });
  console.log(pareto);
  const bgcolor = [];
  if (p.title === "daily") {
    if (p.warn === "safety" || p.warn === "quality" || p.warn === "inventory") {
      p.data.map((m) =>
        m.data[0].real >= m.data[0].target
          ? bgcolor.push("rgb(88, 3, 3)")
          : bgcolor.push("#005B41")
      );
    } else {
      p.data.map((m) =>
        m.data[0].real >= m.data[0].target
          ? bgcolor.push("#005B41")
          : bgcolor.push("rgb(88, 3, 3)")
      );
    }
  }

  const data = {
    labels: p.data.map((m) => m.day),
    datasets: [
      {
        type: "line",
        label: "Target",
        data: p.data.map((m) => m.data[0].target),
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
        data: p.data.map((m) => m.data[0].real),
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

  return (
    <div className={c.chartHolder}>
      <div className={c.title}>
        <span></span>
        <h3> {p.title} </h3>
        <span></span>
      </div>
      <Line data={data} options={options} />
      {pareto.length > 0 && (
        <React.Fragment>
          <div className={c.title}>
            <span></span>
            <h3> pareto </h3>
            <span></span>
          </div>
          <Bar data={paretoChart} options={options} />
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
              {p.data.map(
                (m, i) =>
                  m.data[0].apm != null && (
                    <tr
                      key={i}
                      style={
                        m.data[0].apm.dueDate < formatDate(new Date())
                          ? { backgroundColor: "red" }
                          : {}
                      }
                    >
                      <td>{m.day}</td>
                      <td>{m.data[0].apm.issueDescription}</td>
                      <td>{m.data[0].apm.causes}</td>
                      <td>{m.data[0].apm.contermeasures}</td>
                      <td>{m.data[0].apm.dueDate}</td>
                      <td>{m.data[0].apm.resp}</td>
                      <td>{m.data[0].apm.status}</td>
                    </tr>
                  )
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
};
export default Charts;

// <tr>
// <td></td>
// <td>we</td>
// <td>always</td>
// <td>do the right thing</td>
// <td>the right</td>
// <td>way</td>
// <td></td>
// </tr>

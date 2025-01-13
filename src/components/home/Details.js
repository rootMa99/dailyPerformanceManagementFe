import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";
import api from "../../service/api";
import { formatDate, getOnlyDay, getParetp } from "../functions/utils";
import { newgetlabelandvalue } from "../functions/newUtils";
import imglogo from "../../assets/aptiv-logo.svg";
import c from "./Details.module.css";

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "97%",
    height: "auto",
    fontWeight: "600",
    textTransform: "uppercase",
    borderRadius: "5px",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                "Helvetica Neue", Arial, sans-serif`,
    letterSpacing: "2px",
    textAlign: "center",
    outline: "none",
    border: "1px solid #414141",
    backgroundColor: "transparent",
    color: "#f3f3f3",
    boxShadow: "none",
    margin: "auto",
    "&:hover": {
      border: "1px solid #f33716",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#f3f3f3" : "#f33716",
    backgroundColor: state.isFocused ? "#474b4d" : "transparent",
    textTransform: "uppercase",
    textAlign: "center",
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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "rgba(0, 0, 0, 0.8)",
        border: "1px solid #f33716",
        padding: "10px",
        borderRadius: "4px"
      }}>
        <p style={{ color: "#fff", margin: "0 0 5px 0" }}>{`Day: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: "2px 0" }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomBarLabel = (props) => {
  const { x, y, value, width, height } = props;
  return (
    <text 
      x={x + (width/2)} 
      y={y + (height/2)} 
      fill="#FFFFFF" 
      fontSize={12} 
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {value}
    </text>
  );
};

const CustomLineLabel = (props) => {
  const { x, y, value } = props;
  return (
    <text 
      x={x} 
      y={y-10} 
      fill={"#fff"}
      fontSize={12} 
      textAnchor="middle"
    >
      {value}
    </text>
  );
};

const Details = (p) => {
  const { data } = useSelector((s) => s.data);
  const [kpiListOwner, setKpiListOwner] = useState([]);
  const [kpi, setKpi] = useState({});

  useEffect(() => {
    if (kpiListOwner.length > 0) {
      const d = kpiListOwner.filter((f) => f.kpiName === "first");
      setKpi({ label: d[0].alias, value: d[0].kpiName });
    }
  }, [kpiListOwner, p.title]);

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

  const chartData = deliveryData.map((item, index) => {
    let cumulative = deliveryData
      .slice(0, index + 1)
      .reduce((sum, curr) => sum + curr.data.real, 0);
    
    return {
      day: item.day,
      real: parseFloat(item.data.real.toFixed(1)),
      target: parseFloat(item.data.target.toFixed(1)),
      cumulative: parseFloat(cumulative.toFixed(1)),
      type: item.data.type,
    };
  });

  const pareto = getParetp(deliveryData).sort((a, b) => {
    return b.percentage - a.percentage;
  });

  return (
    <div className={c["form-container"]}>
      <div className={c.selectContainer}>
        <Select
          options={newgetlabelandvalue(kpiListOwner, p.title)}
          styles={customStyles}
          placeholder="select KPI"
          onChange={setKpi}
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
          <h3>trend</h3>
          <span></span>
        </div>
        
        <div style={{ height: "35rem" }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart 
              data={chartData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(255,255,255,0.1)" 
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fill: "#f3f3f3" }}
                stroke="rgba(255,255,255,0.1)"
                axisLine={false}
              />
              <YAxis 
                yAxisId="left"
                hide={true}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                hide={true}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="real"
                yAxisId="left"
                radius={[10, 10, 10, 10]}
                maxBarSize={50}
                fill="#f33716"
              >
                <LabelList
                  dataKey="real"
                  content={<CustomBarLabel />}
                />
              </Bar>
              <Line
                type="monotone"
                dataKey="target"
                yAxisId="left"
                stroke="#3BC6EB"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 0 }}
                activeDot={{ r: 8 }}
              >
                <LabelList
                  dataKey="target"
                  content={<CustomLineLabel />}
                />
              </Line>
              <Line
                type="monotone"
                dataKey="cumulative"
                yAxisId="right"
                stroke="#FFD700"
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 8 }}
              >
                <LabelList
                  dataKey="cumulative"
                  content={<CustomLineLabel />}
                />
              </Line>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {pareto.length > 0 && (
          <React.Fragment>
            <div className={c.title}>
              <span></span>
              <h3>pareto</h3>
              <span></span>
            </div>
            <div style={{ height: "25rem" }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart 
                  data={pareto}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="rgba(255,255,255,0.1)" 
                    vertical={false}
                  />
                  <XAxis
                    dataKey="motif"
                    tick={{ fill: "#f3f3f3" }}
                    stroke="rgba(255,255,255,0.1)"
                    axisLine={false}
                  />
                  <YAxis hide={true} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="percentage"
                    radius={[10, 10, 10, 10]}
                    maxBarSize={50}
                    fill="#4E7C88"
                  >
                    <LabelList
                      dataKey="percentage"
                      content={<CustomBarLabel />}
                    />
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </React.Fragment>
        )}

        {p.home === undefined && (
          <React.Fragment>
            <div className={c.title}>
              <span></span>
              <h3>Action plan</h3>
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
                        <td>{m.openDate}</td>
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
  );
};

export default Details;
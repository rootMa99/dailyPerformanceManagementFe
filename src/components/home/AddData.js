import React, { useCallback, useEffect, useState } from "react";
import c from "./AddData.module.css";
import Select from "react-select";
import api from "../../service/api";
import { getlabelandvalue } from "../functions/newUtils";

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

const AddData = (p) => {
  const [control, setControl] = useState("ad");
  const [dataAdded, setDataAdded] = useState({
    date: p.dateChoosen,
    real: 0,
    target: 0,
    name: "",
    type: "",
  });
  const [kpiListOwner, setKpiListOwner] = useState(["first"]);

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

  return (
    <div className={c["form-container"]}>
      <ul className={c.underList}>
        <li
          style={
            control === "acp"
              ? { opacity: 1, borderBottom: "2px solid white" }
              : {}
          }
          onClick={(e) => setControl("acp")}
        >
          add action plan
        </li>
        <li
          style={
            control === "ad"
              ? { opacity: 1, borderBottom: "2px solid white" }
              : {}
          }
          onClick={(e) => setControl("ad")}
        >
          add data
        </li>

        <li
          style={
            control === "ap"
              ? { opacity: 1, borderBottom: "2px solid white" }
              : {}
          }
          onClick={(e) => setControl("ap")}
        >
          add pareto
        </li>
      </ul>
      <form className={c.form}>
        <div className={c.inputD}>
          <h3>choose date:</h3>
          <input type="date" required value={dataAdded.date} disabled />
        </div>
        {control === "ad" && (
          <React.Fragment>
            <div className={c["form-group"]} style={{ alignItems: "center" }}>
              <div className={c.inputC}>
                <h3>choose Kpi:</h3>
                <Select
                  options={[
                    ...getlabelandvalue(kpiListOwner),
                    { label: "create new kpi", value: "create new kpi" },
                  ]}
                  id="modality"
                  inputId="modality"
                  styles={customStyles}
                  placeholder="select KPI"
                  onChange={(e) =>
                    setDataAdded((p) => ({ ...p, name: e.value }))
                  }
                />
              </div>
              {dataAdded.name === "create new kpi" && (
                <React.Fragment>
                  OR
                  <div className={c.inputC}>
                    <h3>new Kpi:</h3>
                    <input
                      type="text"
                      placeholder="Enter NEw KPI"
                      required
                      onChange={(e) =>
                        setDataAdded((p) => ({ ...p, name: e.target.value }))
                      }
                    />
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className={c.inputD}>
              <h3>choose type:</h3>
              <Select
                  options={[
                    { label: "negative", value: "negative" },
                    { label: "positive", value: "positive" },
                  ]}
                  id="modality"
                  inputId="modality"
                  styles={customStyles}
                  placeholder="select type"
                  onChange={(e) =>
                    setDataAdded((p) => ({ ...p, type: e.value }))
                  }
                />
            </div>
            <div className={c["form-group"]}>
              <div className={c.inputC}>
                <h3>real data:</h3>
                <input
                  type="number"
                  placeholder="Enter your real data"
                  step="0.01"
                  required
                />
              </div>
              <div className={c.inputC}>
                <h3>target data:</h3>
                <input
                  type="number"
                  placeholder="Enter your target data"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </React.Fragment>
        )}
        <button className={c["form-submit-btn"]} type="submit">
          submit
        </button>
      </form>
    </div>
  );
};
export default AddData;

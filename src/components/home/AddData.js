import React, { useCallback, useEffect, useState } from "react";
import c from "./AddData.module.css";
import Select from "react-select";
import api from "../../service/api";
import {
  getDateOfTomorrow,
  getcostumData,
  newgetlabelandvalue,
} from "../functions/newUtils";
import NetworkNotify from "../UI/NetworkNotify";
import UpdateTable from "../UI/UpdateTable";
import UploadDataForm from "../UI/UploadDataForm";


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



function dataExists(array, key, value) {
  return array.some((obj) => obj[key] === value);
}

const AddData = (p) => {
  const [control, setControl] = useState("ad");
  const [upload, setUpload]= useState(false)
  const [next, setNext] = useState(false);
  const [separateData, setSeparateData] = useState(null);
  const [acp, setAcp]=useState([]);
  const [pareto, setParetp] = useState([{ motif: "", percentage: "" }]);
  const [dataAdded, setDataAdded] = useState({
    date: p.dateChoosen,
    real: "",
    target: "",
    name: null,
    type: "",
    alias: { label: "", value: "" },
  });
 
  console.log(p.data, "passed data");
  const [kpiListOwner, setKpiListOwner] = useState(["first"]);
  const [err, setErr] = useState({ status: false, message: "" });
  const [success, setSuccess] = useState({ status: false, message: "" });

  useEffect(() => {
    try {
      if (dataAdded.name !== null || dataAdded.name !== "create new kpi") {
        const d = p.data.filter((f) => f.name === dataAdded.name)[0].data;
        const i= d.findIndex(f=>f.date===p.dateChoosen);
        console.log(d, i);
        if(i>-1){
          setDataAdded(p=>({...p, real:d[i].data.real, target:d[i].data.target}))
        }else{
          setDataAdded(p=>({...p, real:"", target:""}))
        }
        setSeparateData(d);
      }
    } catch (error) {
      console.error(error);
    }
  }, [dataAdded.name, p.data, p.dateChoosen]);

  useEffect(() => {
    try {
      if (separateData[0].data.type === "positive") {
        if (dataAdded.target > dataAdded.real) {
          setNext(true);
          const d = getcostumData(separateData);
          console.log(d, "see here");
          setParetp(d.pareto);
          setAcp(d.ap)
        } else {
          setNext(false);
        }
      } else {
        console.log("run");
        if (dataAdded.target < dataAdded.real) {
          setNext(true);
          const d = getcostumData(separateData);
          setParetp(d.pareto);
          setAcp(d.ap)
        } else {
          setNext(false);
        }
      }
    } catch (e) {}
  }, [dataAdded.target, dataAdded.real, separateData]);

  console.log(kpiListOwner, dataExists(kpiListOwner, "kpiName", "first"));
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (control === "ad") {
      if (dataAdded.type.trim() === "") {
        alert("Please select a KPI type.");
        return;
      }
      if (isNaN(dataAdded.real)) {
        alert("Please Enter the Actual (Real).");
        return;
      }
      if (isNaN(dataAdded.target)) {
        alert("Please Enter the Target");
        return;
      }
      console.log(dataAdded.date);
      const body =
        dataAdded.name !== null
          ? { ...dataAdded, alias: dataAdded.alias.value }
          : {
              ...dataAdded,
              alias: dataAdded.alias.value,
              name: dataAdded.alias.value,
            };
      try {
        await fetch(`${api}/${p.title}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!next) {
          const confirmation = window.confirm("Want to enter tomorrow's data?");

          if (confirmation) {
            setDataAdded((p) => ({
              date: getDateOfTomorrow(p.date),
              real: "",
              target: "",
              name: p.name,
              alias: p.alias,
              type: p.type,
            }));
          } else {
            setDataAdded((p) => ({
              date: p.date,
              real: "",
              target: "",
              name: p.name,
              alias: p.alias,
              type: p.type,
            }));
          }
        }
        setSuccess({
          status: true,
          message: "data has been successfully added.",
        });
        if (next) {
          setControl("ap");
        }
      } catch (error) {
        console.error("Error:", error);
        setErr({
          status: true,
          message:
            "Something has gone wrong, we were not able to save this action, please try it again.",
        });
      }
    }
    if (control === "ap") {
      console.log(pareto, dataAdded.name, p.title);
      let l = 0;
      pareto.forEach((e) => (l += e.percentage));
      if (l > 100 || l < 100) {
        setErr({
          status: true,
          message: `The Pareto total must be equal 100%. total is: ${l}`,
        });
        return;
      }
      
      try {
        await fetch(
          `${api}/${p.title}/pareto?name=${dataAdded.name}&date=${dataAdded.date}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(pareto),
          }
        );
        setSuccess({
          status: true,
          message: "data has been successfully added.",
        });
        setControl("acp");
      } catch (error) {
        console.error("Error:", error);
        setErr({
          status: true,
          message:
            "Something has gone wrong, we were not able to save this action, please try it again. ",
        });
      }
    }
  };
  if (err.status || success.status) {
    setTimeout(() => {
      setErr({ status: false, message: "" });
      setSuccess({ status: false, message: "" });
    }, 2000);
  }

  const changeKpiOwn = (e) => {
    if (e.value !== "create new kpi") {
      const f = kpiListOwner.filter((f) => f.kpiName === e.value);
      console.log(f);
      setDataAdded((p) => ({
        ...p,
        alias: e,
        type: f[0].type,
        name: f[0].kpiName,
      }));
    } else {
      setDataAdded((p) => ({ ...p, alias: e }));
    }
  };

  console.log(dataAdded);
  return (
    <React.Fragment>
    {
      upload && <UploadDataForm />
    }
      {err.status && <NetworkNotify message={err.message} success={false} />}
      {success.status && (
        <NetworkNotify message={success.message} success={true} />
      )}
      <div className={c["form-container"]}>
        <ul className={c.underList}>
          <li
            style={
              control === "ad"
                ? { opacity: 1, borderBottom: "2px solid white" }
                : {}
            }
          >
            add data
          </li>

          <li
            style={
              control === "ap"
                ? { opacity: 1, borderBottom: "2px solid white" }
                : {}
            }
          >
            add pareto
          </li>
          <li
            style={
              control === "acp"
                ? { opacity: 1, borderBottom: "2px solid white" }
                : {}
            }
          >
            add action plan
          </li>
        </ul>
        <form className={c.form} onSubmit={submitHandler}>
          <div className={c.inputD}>
            <h3>choosen date:</h3>
            <input type="date" required value={dataAdded.date} disabled />
          </div>
          {control === "ad" && (
            <React.Fragment>
              <div className={c["form-group"]} style={{ alignItems: "center" }}>
                <div className={c.inputC}>
                  <h3>choose Kpi:</h3>
                  <Select
                    options={[
                      ...newgetlabelandvalue(kpiListOwner),
                      { label: "create new kpi", value: "create new kpi" },
                    ]}
                    id="modality"
                    inputId="modality"
                    styles={customStyles}
                    placeholder="select KPI"
                    onChange={(e) => changeKpiOwn(e)}
                    value={dataAdded.alias}
                  />
                </div>
                {(dataAdded.name === null ||
                  dataAdded.alias.value === "create new kpi") && (
                  <React.Fragment>
                    OR
                    <div className={c.inputC}>
                      <h3>choose type:</h3>
                      <Select
                        options={[
                          { label: "minimize against target", value: "negative" },
                          { label: "maximize against target", value: "positive" },
                        ]}
                        id="modality"
                        inputId="modality"
                        styles={customStyles}
                        placeholder="select type"
                        onChange={(e) =>
                          setDataAdded((p) => ({ ...p, type: e.value }))
                        }
                        value={{ label: dataAdded.type, value: dataAdded.type }}
                      />
                    </div>
                    {dataAdded.type !== "" && (
                      <div className={c.newK}>
                        <div className={c.inputC}>
                          <h3>new Kpi:</h3>
                          <input
                            type="text"
                            placeholder="Enter New KPI"
                            required
                            onBlur={(e) => {
                              setDataAdded((p) => ({
                                ...p,
                                alias: {
                                  label: e.target.value,
                                  value: e.target.value,
                                },
                              }));
                            }}
                          />
                        </div>
                        {!dataExists(kpiListOwner, "kpiName", "first") && (
                          <div className={c.checkBox}>
                            <input
                              type="checkbox"
                              id="horns"
                              name="horns"
                              onChange={(e) =>
                                setDataAdded((p) => ({
                                  ...p,
                                  name: "first",
                                }))
                              }
                            />
                            <label htmlFor="horns">
                              PRIMARY
                              <span>
                                You will need to check this box if your KPI is a
                                primary KPI.
                              </span>
                            </label>
                          </div>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                )}
              </div>

              {
                <div className={c["form-group"]}>
                  <div className={c.inputC}>
                    <h3>real data:</h3>
                    <input
                      type="number"
                      placeholder="Enter your real data"
                      step="0.01"
                      required
                      onChange={(e) =>
                        setDataAdded((p) => ({ ...p, real: +e.target.value }))
                      }
                      value={dataAdded.real}
                    />
                  </div>
                  <div className={c.inputC}>
                    <h3>target data:</h3>
                    <input
                      type="number"
                      placeholder="Enter your target data"
                      step="0.01"
                      required
                      onChange={(e) =>
                        setDataAdded((p) => ({ ...p, target: +e.target.value }))
                      }
                      value={dataAdded.target}
                    />
                  </div>
                </div>
              }
            </React.Fragment>
          )}
          {control === "acp" && (
            <React.Fragment>
             <UpdateTable data={acp} title={p.title} alias={dataAdded.alias} name={dataAdded.name} date={dataAdded.date} /> 
            </React.Fragment>
          )}
          {control === "ap" && (
            <React.Fragment>
              <h3 className={c.mssg}>
                caution: You will need to add, update, or just confirm Pareto if
                there is no change.
              </h3>
              <div className={c.inputC}>
                <h3>choosen Kpi:</h3>
                <Select
                  id="modality"
                  inputId="modality"
                  styles={customStyles}
                  placeholder="select KPI"
                  value={dataAdded.alias}
                  isDisabled={true}
                />
              </div>
              <React.Fragment>
                {pareto.map((m, i) => (
                  <div className={c["form-group"]} key={i}>
                    <div className={c.inputC}>
                      <h3>motif:</h3>
                      <input
                        type="text"
                        placeholder="Enter Motif"
                        value={m.motif}
                        onChange={(e) => {
                          const newPareto = pareto.map((item, index) => {
                            if (index === i) {
                              return { ...item, motif: e.target.value };
                            }
                            return item;
                          });
                          setParetp(newPareto);
                        }}
                      />
                    </div>
                    <div className={c.inputC}>
                      <h3>percentage:</h3>
                      <input
                        type="number"
                        placeholder="Enter Percentage"
                        step="0.01"
                        max={100}
                        value={m.percentage}
                        onChange={(e) => {
                          const newPareto = pareto.map((item, index) => {
                            if (index === i) {
                              return { ...item, percentage: +e.target.value };
                            }
                            return item;
                          });
                          setParetp(newPareto);
                        }}
                      />
                    </div>
                  </div>
                ))}
                <h4 className={c.addPm}>
                  note: The Pareto total must be equal 100%
                </h4>
                <h4
                  onClick={(e) =>
                    setParetp((p) => [...p, { motif: "", percentage: 0 }])
                  }
                  className={c.addP}
                >
                  add pareto
                </h4>
              </React.Fragment>
            </React.Fragment>
          )}
          {control !== "acp" && (
            <button className={c["form-submit-btn"]} type="submit">
              {!next ? "submit" : "next"}
            </button>
          )}
          {
            control === "ad" && (
              <h4
                  onClick={(e) =>
                    setUpload(true)
                  }
                  className={c.addP}
                >
                  upload data
                </h4>
            )
          }
        </form>
      </div>
    </React.Fragment>
  );
};
export default AddData;













// <div className={c["form-group"]}>
// <div className={c.inputC}>
//   <h3>choosen Kpi:</h3>
//   <Select
//     options={newgetlabelandvalue(kpiListOwner)}
//     id="modality"
//     inputId="modality"
//     styles={customStyles}
//     placeholder="select KPI"
//     value={{ value: dataAdded.name, label: dataAdded.name }}
//     isDisabled={true}
//   />
// </div>
// <div className={c.inputC}>
//   <h3>Issue description:</h3>
//   <input
//     type="text"
//     placeholder="Enter Issue description"
//     value={apm.issueDescription}
//     onChange={(e) =>
//       setApm((p) => {
//         return { ...p, issueDescription: e.target.value };
//       })
//     }
//     required
//   />
// </div>
// <div className={c.inputC}>
//   <h3>Causes:</h3>
//   <input
//     type="text"
//     placeholder="Enter Causes"
//     value={apm.causes}
//     onChange={(e) =>
//       setApm((p) => {
//         return { ...p, causes: e.target.value };
//       })
//     }
//     required
//   />
// </div>
// <div className={c.inputC}>
//   <h3>Contermeasures:</h3>
//   <input
//     type="text"
//     placeholder="Enter Contermeasures"
//     value={apm.contermeasures}
//     onChange={(e) =>
//       setApm((p) => {
//         return { ...p, contermeasures: e.target.value };
//       })
//     }
//     required
//   />
// </div>
// <div className={c.inputC}>
//   <h3>Resp:</h3>
//   <input
//     type="text"
//     placeholder="Enter Resp"
//     value={apm.resp}
//     onChange={(e) =>
//       setApm((p) => {
//         return { ...p, resp: e.target.value };
//       })
//     }
//     required
//   />
// </div>
// <div className={c.inputC}>
//   <h3>Due date:</h3>
//   <input
//     type="date"
//     value={apm.dueDate}
//     required
//     onChange={(e) =>
//       setApm((p) => {
//         return { ...p, dueDate: e.target.value };
//       })
//     }
//   />
// </div>
// <div className={c.inputC}>
//   <h3>Status:</h3>
//   <Select
//     options={dataOp}
//     styles={customStyles}
//     value={{ label: apm.status, value: apm.status }}
//     onChange={(e) =>
//       setApm((p) => {
//         return { ...p, status: e.value };
//       })
//     }
//     menuPlacement="top"
//   />
// </div>
// </div>
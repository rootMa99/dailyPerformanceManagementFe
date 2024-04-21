import React, { useState } from "react";
import { formatDate } from "../functions/utils";
import c from "./UpdateTable.module.css";
import api from "../../service/api";
import Select from "react-select";
import NetworkNotify from "./NetworkNotify";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
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

//   function dataExists(array, key, value) {
//     return array.some((obj) => obj[key] === value);
//   }

const dataOp = [
  { value: "action assigned", label: "action assigned" },
  { value: "action started", label: "action started" },
  { value: "action complete", label: "action complete" },
  { value: "rc fix confirmed", label: "rc fix confirmed" },
];
const UpdateTable = (p) => {
  const [err, setErr] = useState({ status: false, message: "" });
  const [success, setSuccess] = useState({ status: false, message: "" });
  const [apm, setApm] = useState({
    issueDescription: "",
    causes: "",
    contermeasures: "",
    resp: "",
    dueDate: "",
    status: "",
  });
  const [addAp, setAddAp] = useState(false);

  const data = p.data;
  console.log(p.name, p.date, p.title);
  const onSubmitHand = async (e) => {
    console.log(apm);

    try {
      const response = await fetch(
        `${api}/${p.title}/actionPlan?name=${p.name}&date=${p.date}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${isLoged.token}`,
          },
          body: JSON.stringify(apm),
        }
      );
      const datar = await response.json();
      try {
        const index = data.findIndex((f) => f.id === apm.id);
        if (index !== -1) {
          data[index] = apm;
        } else {
          data.push({...datar, dueDate:datar.dueDate.split('T')[0]});
        }
      } catch (e) {}

      setAddAp(false);
      setApm({
        issueDescription: "",
        causes: "",
        contermeasures: "",
        resp: "",
        dueDate: "",
        status: "",
      });
      setSuccess({
        status: true,
        message: "data has been successfully added.",
      });
    } catch (error) {
      console.error("Error:", error);
      setErr({
        status: true,
        message:
          "Something has gone wrong, we were not able to save this action, please try it again. ",
      });
    }
  };
  if (err.status || success.status) {
    setTimeout(() => {
      setErr({ status: false, message: "" });
      setSuccess({ status: false, message: "" });
    }, 2000);
  }

  return (
    <React.Fragment>
    {err.status && <NetworkNotify message={err.message} success={false} />}
    {success.status && (
      <NetworkNotify message={success.message} success={true} />
    )}
    <h3 className={c.mssg}>
                caution: You will need to add, update, or just confirm Pareto if
                there is no change.
              </h3>
      {addAp && (
        <React.Fragment>
          <div className={c["form-group"]}>
            <div className={c.inputC}>
              <h3>choosen Kpi:</h3>
              <Select
                id="modality"
                inputId="modality"
                styles={customStyles}
                placeholder="select KPI"
                value={p.alias}
                isDisabled={true}
              />
            </div>
            <div className={c.inputC}>
              <h3>Issue description:</h3>
              <input
                type="text"
                placeholder="Enter Issue description"
                value={apm.issueDescription}
                onChange={(e) =>
                  setApm((p) => {
                    return { ...p, issueDescription: e.target.value };
                  })
                }
                required
              />
            </div>
            <div className={c.inputC}>
              <h3>Causes:</h3>
              <input
                type="text"
                placeholder="Enter Causes"
                value={apm.causes}
                onChange={(e) =>
                  setApm((p) => {
                    return { ...p, causes: e.target.value };
                  })
                }
                required
              />
            </div>
            <div className={c.inputC}>
              <h3>Contermeasures:</h3>
              <input
                type="text"
                placeholder="Enter Contermeasures"
                value={apm.contermeasures}
                onChange={(e) =>
                  setApm((p) => {
                    return { ...p, contermeasures: e.target.value };
                  })
                }
                required
              />
            </div>
            <div className={c.inputC}>
              <h3>Resp:</h3>
              <input
                type="text"
                placeholder="Enter Resp"
                value={apm.resp}
                onChange={(e) =>
                  setApm((p) => {
                    return { ...p, resp: e.target.value };
                  })
                }
                required
              />
            </div>
            <div className={c.inputC}>
              <h3>Due date:</h3>
              <input
                type="date"
                value={apm.dueDate}
                required
                onChange={(e) =>
                  setApm((p) => {
                    return { ...p, dueDate: e.target.value };
                  })
                }
              />
            </div>
            <div className={c.inputC}>
              <h3>Status:</h3>
              <Select
                options={dataOp}
                styles={customStyles}
                value={{ label: apm.status, value: apm.status }}
                onChange={(e) =>
                  setApm((p) => {
                    return { ...p, status: e.value };
                  })
                }
                menuPlacement="top"
              />
            </div>
          </div>
          <div className={c.buttons}>
            <h4
              className={c.addP}
              onClick={(e) => {
                setAddAp(false);
                setApm({
                  issueDescription: "",
                  causes: "",
                  contermeasures: "",
                  resp: "",
                  dueDate: "",
                  status: "",
                });
              }}
            >
              cancel
            </h4>
            <button className={c["form-submit-btn"]} onClick={onSubmitHand}>
              submit
            </button>
          </div>
        </React.Fragment>
      )}
      {!addAp && (
        <React.Fragment>
          <h4 className={c.addP} onClick={(e) => setAddAp(true)}>
            add action plan
          </h4>
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
              {data.map((m, i) => (
                <tr
                  key={m.id}
                  onClick={(e) => {
                    setAddAp(true);
                    setApm(m);
                  }}
                >
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
              ))}
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
    </React.Fragment>
  );
};

export default UpdateTable;

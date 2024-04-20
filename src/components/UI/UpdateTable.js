import React, { useState } from "react";
import { formatDate } from "../functions/utils";
import c from "./UpdateTable.module.css";


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

    const [apm, setApm] = useState({
        issueDescription: "",
        causes: "",
        contermeasures: "",
        resp: "",
        dueDate: "",
        status: "",
      });


    const data=p.data;

  return (
    <React.Fragment>
    <h4
    className={c.addP}
  >
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
  );
};

export default UpdateTable;

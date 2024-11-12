import { getCurrentMonthDates } from "../functions/utils";
import c from "./Table.module.css";
import api from "../../service/api";
import React, { useCallback, useEffect, useState } from "react";
const initialAp = {
  issueDescription: "",
  causes: "",
  contermeasures: "",
  resp: "",
  openDate: "",
  dueDate: "",
  status: "",
  cb: "",
  rci: "",
  cai: "",
  epd: "",
  lpa: "",
  cav: "",
  pcu: "",
  swoi: "",
  ll: "",
};
const ActionExitCriteria = (p) => {
  console.log(p.data, "here");
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [ap, setAp] = useState(initialAp);
  const callback = useCallback(async () => {
    const dates = getCurrentMonthDates();
    try {
      const response = await fetch(
        `${api}/dpm/aec?startDate=${dates.start}&endDate=${dates.end}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const d = await response.json();
      console.log(d, "00000000000000000000000000000000000000000000000000");

      setData(d);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    callback();
  }, [callback]);

  const submitAp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/dpm/uacp?id=${ap.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ap),
      });

      const d = await response.json();
      console.log(d, "00000000KKKKKKKK");
      data[data.findIndex((f) => f.id === d.id)] = d;
      //   setData(p=>[...p, d]);
      setEdit(false);
      setAp(initialAp);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      {edit ? (
        <form className={c.form} onSubmit={submitAp}>
          <h1>{ap.causes}</h1>
          <h3>{ap.contermeasures}</h3>
          <div>
            <label>containment breakpoint</label>
            <input
              type="text"
              onChange={(e) => setAp((p) => ({ ...p, cb: e.target.value }))}
              value={ap.cb}
            />
          </div>
          <div>
            <label>root cause identified</label>
            <input
              type="text"
              onChange={(e) => setAp((p) => ({ ...p, rci: e.target.value }))}
              value={ap.rci}
            />
          </div>
          <div>
            <label>Corrective Action implemented</label>
            <input
              type="text"
              onChange={(e) => setAp((p) => ({ ...p, cai: e.target.value }))}
              value={ap.cai}
            />
          </div>
          <div>
            <label>Error proof/detection</label>
            <input
              type="text"
              onChange={(e) => setAp((p) => ({ ...p, epd: e.target.value }))}
              value={ap.epd}
            />
          </div>
          <div>
            <label>layred process audits</label>
            <input
              type="text"
              onChange={(e) => setAp((p) => ({ ...p, lpa: e.target.value }))}
              value={ap.lpa}
            />
          </div>
          <div>
            <label>Corrective action validated</label>
            <input
              type="text"
              onChange={(e) => setAp((p) => ({ ...p, cav: e.target.value }))}
              value={ap.cav}
            />
          </div>
          <div>
            <label>pfmea/cp updated</label>
            <input
              type="text"
              onChange={(e) => setAp((p) => ({ ...p, pcu: e.target.value }))}
              value={ap.pcu}
            />
          </div>
          <div>
            <label>standard work operator instructions</label>
            <input
              type="text"
              onChange={(e) => setAp((p) => ({ ...p, swoi: e.target.value }))}
              value={ap.swoi}
            />
          </div>
          <div>
            <label>Lessons learned (institutionalized)</label>
            <input
              type="text"
              onChange={(e) => setAp((p) => ({ ...p, ll: e.target.value }))}
              value={ap.ll}
            />
          </div>
          <button>Submit</button>
          <p
            className={c.cancel}
            onClick={(e) => {
              setEdit(false);
              setAp(initialAp);
            }}
          >
            cancel
          </p>
        </form>
      ) : (
        <table
          className={c.table}
          style={{
            position: "static",
            transform: "translate(0%, 0%)",
            width: "100%",
            maxHeight: "10rem",
            overflow: "scroll",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ position: "sticky", top: 0, left: 0 }}>
            <tr>
              <th width="20%">Root cause</th>
              <th width="30%">Action</th>
              <th width="8%">open date</th>
              <th width="8%">due date</th>
              <th
                style={{
                  fontSize: "12px",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  whiteSpace: "wrap",
                }}
              >
                containment breakpoint
              </th>
              <th
                style={{
                  fontSize: "12px",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  whiteSpace: "wrap",
                }}
              >
                root cause identified
              </th>
              <th
                style={{
                  fontSize: "12px",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  whiteSpace: "wrap",
                }}
              >
                Corrective Action implemented
              </th>
              <th
                style={{
                  fontSize: "12px",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  whiteSpace: "wrap",
                }}
              >
                Error proof/detection
              </th>
              <th
                style={{
                  fontSize: "12px",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  whiteSpace: "wrap",
                }}
              >
                layred process audits
              </th>
              <th
                style={{
                  fontSize: "12px",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  whiteSpace: "wrap",
                }}
              >
                Corrective action validated
              </th>
              <th
                style={{
                  fontSize: "12px",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  whiteSpace: "wrap",
                }}
              >
                pfmea/cp updated
              </th>
              <th
                style={{
                  fontSize: "12px",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  whiteSpace: "wrap",
                }}
              >
                standard work operator instructions
              </th>
              <th
                style={{
                  fontSize: "12px",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  whiteSpace: "wrap",
                }}
              >
                Lessons learned (institutionalized)
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((m, i) => (
                <tr
                  key={m.id}
                  className={c.hoverableRow}
                  onClick={(e) => {
                    setAp(m);
                    setEdit(true);
                  }}
                >
                  <td style={{ padding: "16px 0" }}>{m.causes}</td>
                  <td style={{ padding: "16px 0" }}>{m.contermeasures}</td>
                  <td style={{ padding: "16px 0" }}>{m.openDate}</td>
                  <td style={{ padding: "16px 0" }}>{m.dueDate}</td>
                  <td
                    style={{
                      padding: "16px 0",
                      backgroundColor:
                        m.cb === null
                          ? "transparent"
                          : m.cb.split("")[0].toLowerCase() === "r"
                          ? "red"
                          : "green",
                    }}
                  >
                    {m.cb === null ? "N/A" : m.cb.substring(1)}
                  </td>
                  <td
                    style={{
                      padding: "16px 0",
                      backgroundColor:
                        m.rci === null
                          ? "transparent"
                          : m.rci.split("")[0].toLowerCase() === "r"
                          ? "red"
                          : "green",
                    }}
                  >
                    {m.rci === null ? "N/A" : m.rci.substring(1)}
                  </td>
                  <td
                    style={{
                      padding: "16px 0",
                      backgroundColor:
                        m.cai === null
                          ? "transparent"
                          : m.cai.split("")[0].toLowerCase() === "r"
                          ? "red"
                          : "green",
                    }}
                  >
                    {m.cai === null ? "N/A" : m.cai.substring(1)}
                  </td>
                  <td
                    style={{
                      padding: "16px 0",
                      backgroundColor:
                        m.epd === null
                          ? "transparent"
                          : m.epd.split("")[0].toLowerCase() === "r"
                          ? "red"
                          : "green",
                    }}
                  >
                    {m.epd === null ? "N/A" : m.epd.substring(1)}
                  </td>
                  <td
                    style={{
                      padding: "16px 0",
                      backgroundColor:
                        m.lpa === null
                          ? "transparent"
                          : m.lpa.split("")[0].toLowerCase() === "r"
                          ? "red"
                          : "green",
                    }}
                  >
                    {m.lpa === null ? "N/A" : m.lpa.substring(1)}
                  </td>
                  <td
                    style={{
                      padding: "16px 0",
                      backgroundColor:
                        m.cav === null
                          ? "transparent"
                          : m.cav.split("")[0].toLowerCase() === "r"
                          ? "red"
                          : "green",
                    }}
                  >
                    {m.cav === null ? "N/A" : m.cav.substring(1)}
                  </td>
                  <td
                    style={{
                      padding: "16px 0",
                      backgroundColor:
                        m.pcu === null
                          ? "transparent"
                          : m.pcu.split("")[0].toLowerCase() === "r"
                          ? "red"
                          : "green",
                    }}
                  >
                    {m.pcu === null ? "N/A" : m.pcu.substring(1)}
                  </td>
                  <td
                    style={{
                      padding: "16px 0",
                      backgroundColor:
                        m.swoi === null
                          ? "transparent"
                          : m.swoi.split("")[0].toLowerCase() === "r"
                          ? "red"
                          : "green",
                    }}
                  >
                    {m.swoi === null ? "N/A" : m.swoi.substring(1)}
                  </td>
                  <td
                    style={{
                      padding: "16px 0",
                      backgroundColor:
                        m.ll === null
                          ? "transparent"
                          : m.ll.split("")[0].toLowerCase() === "r"
                          ? "red"
                          : "green",
                    }}
                  >
                    {m.ll === null ? "N/A" : m.ll.substring(1)}
                  </td>
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
      )}
    </React.Fragment>
  );
};
export default ActionExitCriteria;

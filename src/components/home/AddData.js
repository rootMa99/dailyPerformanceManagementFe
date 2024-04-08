import React from "react";
import c from "./AddData.module.css";

const AddData = (p) => {
  return (
    <div className={c.container}>
      <div className={c["form-container"]}>
        <ul className={c.underList}>
          <li>add data</li>
          <li>add action plan</li>
          <li>add pareto</li>
        </ul>
        <form className={c.form}>
          <div className={c.inputD}>
            <h3>choose date:</h3>
            <input type="date" required value={"2013-05-13"} disabled />
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
          <button className={c["form-submit-btn"]} type="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddData;

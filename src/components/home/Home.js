import React, { useState } from "react";
import Delivery from "./Delivery";
import c from "./Home.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/dataSlice";
import { getStartAndEndMonth } from "../functions/utils";
import { useSelector } from "react-redux";
import Table from "../UI/Table";

const Home = (p) => {
  const { gtable } = useSelector((s) => s.data);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
    dispatch(dataActions.setTime(getStartAndEndMonth(date)));
  };
  return (
    <div className={c.holding}>
      {gtable && <Table data={gtable} />}
      <h1 className={c.topTitle}>
        <span></span> daily performance management
      </h1>
      <div className={c.datePicker}>
        <label>PICK A DATE</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
          className={c["custom-datepicker"]}
        />
      </div>
      <div className={c.ndiv} style={{ width: "28%" }}>
        <h1 className={c.ndivh1}>people</h1>
        <div className={c.letterContainer}>
          <div className={c.title}>
            <div className={c.line}></div>
            <h3>safety</h3>
          </div>
          <Delivery title="safety" />
        </div>
        <div className={c.letterContainer}>
          <div className={c.title}>
            <div className={c.line}></div>
            <h3>skills</h3>
          </div>
          <Delivery title="skills" />
        </div>
      </div>
      <div className={c.ndiv} style={{ width: "56%" }}>
        <h1 className={c.ndivh1}>performance</h1>
        <div className={c.letterContainer}>
          <div className={c.title}>
            <div className={c.line}></div>
            <h3>quality</h3>
          </div>
          <Delivery title="quality" />
        </div>
        <div className={c.letterContainer}>
          <div className={c.title}>
            <div className={c.line}></div>
            <h3>Delivery</h3>
          </div>
          <Delivery title="delivery" />
        </div>

        <div className={c.letterContainer}>
          <div className={c.title}>
            <div className={c.line}></div>
            <h3>inventory</h3>
          </div>
          <Delivery title="inventory" />
        </div>
        <div className={c.letterContainer}>
          <div className={c.title}>
            <div className={c.line}></div>
            <h3>productivity</h3>
          </div>
          <Delivery title="productivity" />
        </div>
      </div>
      <div className={c.ndiv} style={{ width: "14%" }}>
        <h1 className={c.ndivh1}>improvement</h1>
        <div className={c.letterContainer}>
          <div className={c.title}>
            <div className={c.line}></div>
            <h3>kaizen</h3>
          </div>
          <Delivery title="kaizen" />
        </div>
      </div>
    </div>
  );
};
export default Home;

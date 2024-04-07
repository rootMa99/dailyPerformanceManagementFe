import { createSlice } from "@reduxjs/toolkit";
import { getCurrentMonthDates } from "../functions/utils";

const dataSlice = createSlice({
  name: "datas",
  initialState: {
    data: [],
    kpiOwners: [],
    date: getCurrentMonthDates(),
  },
  reducers: {
    addData(s, p) {
      s.data = p.payload;
    },
    setTime(s, p) {
      s.date = p.payload;
    },
    setKpiOwners(s, p) {
      s.kpiOwners = p.payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice;

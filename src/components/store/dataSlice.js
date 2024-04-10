import { createSlice } from "@reduxjs/toolkit";
import { getCurrentMonthDates } from "../functions/utils";

const dataSlice = createSlice({
  name: "datas",
  initialState: {
    data: {
      delivery: [],
      safety: [],
      quality: [],
      skills: [],
      inventory: [],
      productivity: [],
      kaizen: [],
    },
    kpiOwners: [],
    date: getCurrentMonthDates(),
    gtable:false

    // date: {
    //   start: "2024-03-01",
    //   end: "2024-03-30",
    // },
  },
  reducers: {
    setgtable(s,p){
      s.gtable=p.payload
    },
    addDelevery(s, p) {
      s.data.delivery = p.payload;
    },
    addSafety(s, p) {
      s.data.safety = p.payload;
    },
    addSkills(s, p) {
      s.data.skills = p.payload;
    },
    addQuality(s, p) {
      s.data.quality = p.payload;
    },
    addInventory(s, p) {
      s.data.inventory = p.payload;
    },
    addProductivity(s, p) {
      s.data.productivity = p.payload;
    },
    addKaizen(s, p) {
      s.data.kaizen = p.payload;
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

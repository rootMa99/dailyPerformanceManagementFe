import { createSlice } from "@reduxjs/toolkit";
// import { getCurrentMonthDates } from "../functions/utils";

const dataSlice = createSlice({
  name: "datas",
  initialState: {
    data: {delivery:[], safety:[], quality:[], skills:[], inventory:[], productivity:[], kaizen:[]},
    kpiOwners: [],
    //date: getCurrentMonthDates(),
    date:{
      start:"2024-03-01",
      end:"2024-03-31"
    }
  },
  reducers: {
   addDelevery(s, p){
    s.data.delivery=p
   },
   addSafety(s, p){
    s.data.safety=p
   },
   addSkills(s, p){
    s.data.skills=p
   },
   addQuality(s, p){
    s.data.quality=p
   },
   addInventory(s, p){
    s.data.inventory=p
   },
   addProductivity(s, p){
    s.data.productivity=p
   },
   addKaizen(s, p){
    s.data.kaizen=p
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

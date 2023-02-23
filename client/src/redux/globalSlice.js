import { createSlice } from "@reduxjs/toolkit";

//createSlice function , Slice combines the reducer & actions together
export const globalSlice = createSlice({
  name: "global",
  initialState : {
    mode: "dark",
    userId: "63701cc1f03239b7f700000e",     //random default user we use (as logged user) instead of Login page
  },
  reducers: {        //the reducer object with the action creators inside it 
    setMode: (state) => {
      state.mode = (state.mode === "light") ? "dark" : "light";
    },
  },
});

//export the actions & the reducer 
export const { setMode } = globalSlice.actions;
export default globalSlice.reducer;
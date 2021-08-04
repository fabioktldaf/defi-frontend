import { createSlice } from "@reduxjs/toolkit";

export const averagesSlice = createSlice({
  name: "averages",
  initialState: {
    averagesByChain: {},
    loading: false,
  },
  reducers: {
    loadAveragesStart: (state) => {
      state.loading = true;
    },
    loadAveragesEnd: (state) => {
      state.loading = false;
    },
    setAverages: (state, action) => {
      const { chainName, averages } = action.payload;
      state.averagesByChain[chainName] = averages;

      console.log("chainName ", chainName);
      console.log("averages ", averages);
    },
  },
});

export const { loadAveragesStart, loadAveragesEnd, setAverages } = averagesSlice.actions;

export default averagesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const tokenHistoricalDataSlice = createSlice({
  name: "tokenHistoricalData",
  initialState: {
    historicalDataByChainAndToken: {},
    loading: false,
  },
  reducers: {
    loadTokenHistoricalDataStart: (state) => {
      state.loading = true;
    },
    loadTokenHistoricalEnd: (state) => {
      state.loading = false;
    },
    setHistoricalData: (state, action) => {
      const { chainName, symbol, historicalData } = action.payload;
      state.historicalDataByChainAndToken[`${chainName}-${symbol}`] = historicalData;
    },
  },
});

export const { loadTokenHistoricalDataStart, loadTokenHistoricalEnd, setHistoricalData } =
  tokenHistoricalDataSlice.actions;

export default tokenHistoricalDataSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const chainSlice = createSlice({
  name: "chains",
  initialState: {
    selected: "",
    loading: false,
    chains: [],
  },
  reducers: {
    loadChainsStart: (state) => {
      state.loading = true;
    },
    loadChainsEnd: (state) => {
      state.loading = false;
    },
    setChains: (state, action) => {
      state.chains = action.payload;
      state.selected = state.chains[0].name;
    },
    changeChain: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { loadChainsStart, loadChainsEnd, setChains, changeChain } = chainSlice.actions;

export default chainSlice.reducer;

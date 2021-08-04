import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "tokens",
  initialState: {
    tokensByChain: {},
    loading: false,
  },
  reducers: {
    loadTokensStart: (state) => {
      state.loading = true;
    },
    loadTokensEnd: (state) => {
      state.loading = false;
    },
    setTokens: (state, action) => {
      const { chainName, tokens } = action.payload;
      state.tokensByChain[chainName] = tokens;
    },
  },
});

export const { loadTokensStart, loadTokensEnd, setTokens } = tokenSlice.actions;

export default tokenSlice.reducer;

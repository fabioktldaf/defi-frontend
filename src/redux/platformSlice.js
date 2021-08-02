import { createSlice } from "@reduxjs/toolkit";

export const plaformSlice = createSlice({
  name: "platforms",
  initialState: {
    platformsByChain: {},
    loading: false,
  },
  reducers: {
    loadPlatformsStart: (state) => {
      state.loading = true;
    },
    loadPlatformsEnd: (state) => {
      state.loading = false;
    },
    setPlatforms: (state, action) => {
      const { chainName, platforms } = action.payload;
      state.platformsByChain[chainName] = platforms;
    },
  },
});

export const { loadPlatformsStart, loadPlatformsEnd, setPlatforms } = plaformSlice.actions;

export default plaformSlice.reducer;

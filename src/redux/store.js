import { configureStore } from "@reduxjs/toolkit";
//import { setupListeners } from "@reduxjs/toolkit/query";

import chainReducer from "./chainSlice";
import platformReducer from "./platformSlice";

export const store = configureStore({
  reducer: {
    chains: chainReducer,
    platforms: platformReducer,
  },
});

//setupListeners(store.dispatch);

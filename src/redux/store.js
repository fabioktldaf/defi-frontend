import { configureStore } from "@reduxjs/toolkit";
//import { setupListeners } from "@reduxjs/toolkit/query";

import chainReducer from "./slices/chainSlice";
import platformReducer from "./slices/platformSlice";
import tokenReducer from "./slices/tokenSlice";
import averagesReducer from "./slices/averagesSlice";

export const store = configureStore({
  reducer: {
    chains: chainReducer,
    platforms: platformReducer,
    tokens: tokenReducer,
    averages: averagesReducer,
  },
});

//setupListeners(store.dispatch);

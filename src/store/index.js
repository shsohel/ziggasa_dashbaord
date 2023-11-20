/** @format */

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from "./auth/reducers";
import users from "./user";
import propertyReducers from "./property/reducers";

import basicReducers from "./basic/reducers";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth,
  basicReducers,
  users,
  propertyReducers,
});

// const middleware = [thunk, createDebounce()];
// const middleware =
//   process.env.NODE_ENV !== 'production'
//     ? [
//         require('redux-immutable-state-invariant').default(),
//         thunk,
//         createDebounce(),
//       ]
//     : [thunk, createDebounce()];

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "productCarts"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(...middleware),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: {
        ignoredPaths: ["propertyReducers"],
      },
    }),

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

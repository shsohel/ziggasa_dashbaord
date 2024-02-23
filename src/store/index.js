/** @format */

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from "./auth/reducers";
import users from "./user";
import blog from "./blog";
import category from "./category";
import tag from "./tag";
import keyword from "./keyword";
import skill from "./skill";
import job from "./job";
import file from "./file-upload";
import company from "./company";

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
  blog,
  job,
  category,
  tag,
  keyword,
  file,
  company,
  skill,
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
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(...middleware),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // ignoredActionPaths: [
        //   'meta.arg',
        //   'payload.timestamp',
        //   'payload.headers',
        // ],
      },
      // immutableCheck: {
      //   ignoredPaths: ['propertyReducers'],
      // },
    }),

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export { store };

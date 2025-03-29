import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import projectWatcher from "./features/project/projectSaga";
import projectReducer from "./features/project/projectSlice";
import commentReducer from "./features/comments/commentSlice";
import commentsWatcher from "./features/comments/commentSaga";
import { all } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      project: projectReducer,
      comment: commentReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);
  return store;
};

function* rootSaga() {
  yield all([projectWatcher(), commentsWatcher()]);
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

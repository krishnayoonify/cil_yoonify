// Import any necessary dependencies
import { put, call, takeLatest, all, select } from "redux-saga/effects";
import loginUserWatcher from "./loginUserSaga";
import getUserWatcher from "./getUserSaga";
import getFutureEmployerWatcher from "./getFutureEmployerSaga";

export default function* rootSaga() {
  yield all([loginUserWatcher(), getUserWatcher(), getFutureEmployerWatcher()]);
}

// Import any necessary dependencies
import { put, call, takeLatest, all, select } from "redux-saga/effects";
import {
  loginUserSuccess,
  loginUserFailure,
  updateAnyState,
} from "../actions/userActions";
import { BASE_BACKEND_URL } from "../constant";
import { toast } from "react-toastify";
import fetchApiHelper from "./fetchAPIHelper";

// const loginUserAPI = async (salesRepOption) => {
//   const response = await fetch(`${BASE_BACKEND_URL}/api/token/`);

//   if (!response.ok) {
//     toast.error("Error fetching file details", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//     throw new Error("Error fetching file details");
//   }

//   const data = await response.json();
//   return data;
// };

function* loginUserWorker(action) {
  //   try {
  //     debugger;
  //     // const salesRepOption = yield select(
  //     //   (state) => state.salesrep.salesRepOption
  //     // );
  //     // const report = yield select((state) => state.salesrep.report);
  //     // if (salesRepOption !== "") {
  //     //   //&& report === 'summary'
  //     //   yield put(updateAnyState({ loading: true }));
  //     //   const data = yield call(loginUserAPI, salesRepOption);
  //     //   yield put(loginUserSuccess(data));
  //     // } else {
  //     //   yield put(updateAnyState({ loading: false }));
  //     // }
  //   } catch (error) {
  //     yield put(loginUserFailure(error.message));
  //   }
  try {
    const response = yield call(
      fetchApiHelper,
      `${BASE_BACKEND_URL}/api/token/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(action.payload.data),
      }
    );
    if (response.status === 200) {
      localStorage.setItem("token", response.body.access);
      yield put({
        type: "UPDATE_ANY_USER_STATE",
        payload: {
          loading: false,
          loggedin: true,
        },
      });
      yield put({
        type: "GET_USER",
        payload: {
          loading: true,
        },
      });
    } else if (response.status === 401) {
      toast.error("Invalid Credentials", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      yield put({
        type: "UPDATE_ANY_USER_STATE",
        payload: {
          loading: false,
          loggedin: false,
        },
      });
    } else if (response.status === 400) {
      toast.error("Invalid Credentials", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      yield put({
        type: "UPDATE_ANY_USER_STATE",
        payload: { loading: false },
      });
    } else {
      toast.error("Can't able to Signin, Please try after some time", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      yield put({
        type: "UPDATE_ANY_USER_STATE",
        payload: { loading: false },
      });
    }
    
  } catch (err) {
    // toast.error("Error occured while signing up", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    console.log('Error occured while signing up')
    yield put({
      type: "UPDATE_ANY_USER_STATE",
      payload: { loading: false },
    });
  }

  yield put({
        type: "UPDATE_ANY_USER_STATE",
        payload: {
          loading: false,
          loggedin: true,
        },
  });
  localStorage.setItem("token",'token');
}

function* loginUserWatcher() {
  yield takeLatest("LOGIN_USER", loginUserWorker);
}
export default loginUserWatcher;

// Import any necessary dependencies
import { put, call, takeLatest, all, select } from "redux-saga/effects";
import {
  getFutureEmployerSuccess,
  getFutureEmployerFailure,
  updateAnyState,
} from "../actions/userActions";
import { BASE_BACKEND_URL } from "../constant";
import { toast } from "react-toastify";
import fetchApiHelper from "./fetchAPIHelper";

// const getFutureEmployerAPI = async (salesRepOption) => {
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

function* getFutureEmployerWorker(action) {
  //   try {
  //     debugger;
  //     // const salesRepOption = yield select(
  //     //   (state) => state.salesrep.salesRepOption
  //     // );
  //     // const report = yield select((state) => state.salesrep.report);
  //     // if (salesRepOption !== "") {
  //     //   //&& report === 'summary'
  //     //   yield put(updateAnyState({ loading: true }));
  //     //   const data = yield call(getFutureEmployerAPI, salesRepOption);
  //     //   yield put(getFutureEmployerSuccess(data));
  //     // } else {
  //     //   yield put(updateAnyState({ loading: false }));
  //     // }
  //   } catch (error) {
  //     yield put(getFutureEmployerFailure(error.message));
  //   }
  try {
    localStorage.setItem("future_employer_token", action.payload.token);
    const response = yield call(
      fetchApiHelper,
      `${BASE_BACKEND_URL}/api/credentials/student_credit/${action.payload.token}`,
      {
        method: "GET",
      }
    );
    if (response.status === 200) {
      yield put({
        type: "UPDATE_ANY_USER_STATE",
        payload: {
          loading: false,
          loggedin: true,
          username: response.body.email,
          groups: response.body.groups,
          institution_id: response.body.institution_id,
          institution_name: response.body.institution_name,
          institution_location: response.body.institution_location,
          institution_country_name: response.body.institution_country_name,
          timer: response.body.created_at,
          credential_data: response.body.credential_data,
          student_name: response.body.username,
          future_employer_email: response.body.email,
        },
      });
    } else if (response.status === 401) {
      // toast.error("Invalid Credentials", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      yield put({
        type: "UPDATE_ANY_USER_STATE",
        payload: {
          loading: false,
          loggedin: false,
        },
      });
    } else if (response.status === 400) {
      // toast.error("Invalid Credentials", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
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
}

function* getFutureEmployerWatcher() {
  yield takeLatest("GET_FUTURE_EMPLOYER", getFutureEmployerWorker);
}
export default getFutureEmployerWatcher;

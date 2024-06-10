// Import any necessary dependencies
import { put, call, takeLatest, all, select } from "redux-saga/effects";
import {
  getUserSuccess,
  getUserFailure,
  updateAnyState,
} from "../actions/userActions";
import { BASE_BACKEND_URL } from "../constant";
import { toast } from "react-toastify";
import fetchApiHelper from "./fetchAPIHelper";

// const getUserAPI = async (salesRepOption) => {
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

function* getUserWorker(action) {
  //   try {
  //     debugger;
  //     // const salesRepOption = yield select(
  //     //   (state) => state.salesrep.salesRepOption
  //     // );
  //     // const report = yield select((state) => state.salesrep.report);
  //     // if (salesRepOption !== "") {
  //     //   //&& report === 'summary'
  //     //   yield put(updateAnyState({ loading: true }));
  //     //   const data = yield call(getUserAPI, salesRepOption);
  //     //   yield put(getUserSuccess(data));
  //     // } else {
  //     //   yield put(updateAnyState({ loading: false }));
  //     // }
  //   } catch (error) {
  //     yield put(getUserFailure(error.message));
  //   }
  try {
    const response = yield call(
      fetchApiHelper,
      `${BASE_BACKEND_URL}/api/user/get_user`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "GET",
      }
    );
    if (response.status === 200) {
      if (response.body.groups.length === 0) {
        localStorage.removeItem("token");

        if (localStorage.getItem("future_employer_token")) {
          yield put({
            type: "GET_FUTURE_EMPLOYER",
            payload: { token: localStorage.getItem("future_employer_token") },
          });
        } else {
          toast.error("You are don't belong to any group", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          yield put({
            type: "LOGOUT_USER",
          });
        }
      } else {
        yield put({
          type: "UPDATE_ANY_USER_STATE",
          payload: {
            loading: false,
            loggedin: true,
            username: response.body.username,
            profile_image: response.body.profile_image,
            resume: response.body.resume,
            groups: response.body.groups,
            institution_id: response.body.institution_id,
            institution_name: response.body.institution_name,
            institution_location: response.body.institution_location,
            institution_country_name: response.body.institution_country_name,
            first_name: response.body.first_name,
            last_name: response.body.last_name,
            aadhar_card_id: response.body.aadhar_card_id,
            email: response.body.email,
            id: response.body.id,
          },
        });
      }
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

      if (localStorage.getItem("future_employer_token")) {
        yield put({
          type: "GET_FUTURE_EMPLOYER",
          payload: { token: localStorage.getItem("future_employer_token") },
        });
      } else {
        yield put({
          type: "UPDATE_ANY_USER_STATE",
          payload: {
            loading: false,
            loggedin: false,
          },
        });
      }
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
      if (localStorage.getItem("future_employer_token")) {
        yield put({
          type: "GET_FUTURE_EMPLOYER",
          payload: { token: localStorage.getItem("future_employer_token") },
        });
      } else {
        yield put({
          type: "UPDATE_ANY_USER_STATE",
          payload: { loading: false },
        });
      }
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

function* getUserWatcher() {
  yield takeLatest("GET_USER", getUserWorker);
}
export default getUserWatcher;

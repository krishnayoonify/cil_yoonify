export const initialState = {
  loading: false,
  error: null,
  loggedin: false,
  username: "",
  groups: [],
  institution_id: null,
  institution_name: "",
  institution_location: "",
  institution_country_name: "",
  timer: null,
  credential_data: [],
  future_employer_email: "",
  student_name: "",
  profile_image: "",
  resume: ""
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const salesrepReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ANY_USER_STATE":
      return Object.assign({}, state, action.payload);
    case "LOGIN_USER":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_USER":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_FUTURE_EMPLOYER":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        loggedin: false,
        username: "",
        groups: [],
      };
    // case FETCH_SALES_REP_RECORDS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: null,
    //     sales_rep: action.payload.data,
    //   };
    // case FETCH_SALES_REP_RECORDS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload,
    //   };
    default:
      return state;
  }
};

export default salesrepReducer;

import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";
import userReducer from "./userReducer";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  user: userReducer,
});

export default reducer;

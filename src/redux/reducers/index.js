import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import bookingsReducer from "./bookingsReducer";

export default combineReducers({
  login: loginReducer,
  bookings: bookingsReducer,
});

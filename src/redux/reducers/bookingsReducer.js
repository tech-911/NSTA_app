import * as type from "../actionCreators/bookings/bookingsType";

const initialState = null;

const bookingsReducer = (state = initialState, loginAction) => {
  switch (loginAction.type) {
    case type.BOOKINGSTYPE:
      return loginAction.payload;

    default:
      return state;
  }
};

export default bookingsReducer;

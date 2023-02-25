import * as type from "../actionCreators/login/loginType";

const initialState = null;

const loginReducer = (state = initialState, loginAction) => {
  switch (loginAction.type) {
    case type.LOGINTYPE:
      return loginAction.payload;

    default:
      return state;
  }
};

export default loginReducer;

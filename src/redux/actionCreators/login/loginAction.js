import * as type from "./loginType";

export const loginAction = (user) => {
  return {
    type: type.LOGINTYPE,
    payload: user,
  };
};

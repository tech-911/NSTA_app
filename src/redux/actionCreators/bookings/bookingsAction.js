import * as type from "./bookingsType";

export const bookingsAction = (books) => {
  return {
    type: type.BOOKINGSTYPE,
    payload: books,
  };
};

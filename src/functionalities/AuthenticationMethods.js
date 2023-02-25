import axios from "axios";

export const signupcall = async (api, data) => {
  try {
    const res = await axios.post(api, data);
    return res;
  } catch (error) {
    return error;
  }
};
export const Logincall = async (api, data) => {
  try {
    const res = await axios.post(api, data);
    return res;
  } catch (error) {
    return error;
  }
};

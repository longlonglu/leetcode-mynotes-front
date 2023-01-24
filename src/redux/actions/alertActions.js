import { SET_ALERT } from "../constants/alertConstants";

export const setAlert = (alertInfo) => {
  return (dispatch) => {
    dispatch({
      type: SET_ALERT,
      alertInfo,
    });
  };
};

import { SET_ALERT } from "../constants/alertConstants";

const reducer = (
  state = {
    open: false,
    severity: "success",
    message: "",
  },
  action
) => {
  switch (action.type) {
    case SET_ALERT:
      return action.alertInfo;
    default:
      return (state = {
        open: false,
        severity: "success",
        message: "",
      });
  }
};

export default reducer;

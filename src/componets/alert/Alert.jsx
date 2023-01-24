import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "../../redux/actions";
import { bindActionCreators } from "redux";

export default function Alert() {
  const alertInfo = useSelector((state) => state.alertReducer);
  const { setAlert } = bindActionCreators(alertActions, useDispatch());

  const alterClose = (event, reason) => {
    if (reason === "clickaway") {
      setAlert({
        open: false,
        severity: "success",
        message: "",
      });
      return;
    }
    setAlert({
      open: false,
      severity: "success",
      message: "",
    });
  };
  return (
    <Snackbar
      open={alertInfo.open}
      autoHideDuration={3000}
      onClose={alterClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MuiAlert elevation={6} variant="filled" severity={alertInfo.severity}>
        {alertInfo.message}
      </MuiAlert>
    </Snackbar>
  );
}

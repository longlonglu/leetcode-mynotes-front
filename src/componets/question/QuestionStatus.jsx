import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import customAxios from "../../hooks";
import { useDispatch } from "react-redux";
import { alertActions, questionActions } from "../../redux/actions";
import { bindActionCreators } from "redux";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CloseIcon from "@mui/icons-material/Close";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Tooltip from "@mui/material/Tooltip";

const axios = customAxios();

export default function QuestionStatusSelect({ questionId, questionStatus }) {
  const [status, setStatus] = useState(questionStatus);
  const { setAlert } = bindActionCreators(alertActions, useDispatch());
  const { loadAllQuestion } = bindActionCreators(
    questionActions,
    useDispatch()
  );

  const handleChange = async (event) => {
    setStatus(event.target.value);
    await axios.get(`/question/status/${questionId}/${event.target.value}`);
    setAlert({
      open: true,
      severity: "success",
      message: "Status updated",
    });
    loadAllQuestion();
  };
  return (
    <FormControl color="info" size="small" margin="dense">
      <InputLabel id="question-status-select-label">Status</InputLabel>
      <Select
        id="question-status-select"
        value={status}
        label="Status"
        onChange={handleChange}
      >
        <MenuItem value={1}>
          <Tooltip title="Got It" placement="right-end">
            <CheckIcon color="success" />
          </Tooltip>
        </MenuItem>
        <MenuItem value={2}>
          <Tooltip title="Still Need Practise" placement="right-end">
            <QuestionMarkIcon color="warning" />
          </Tooltip>
        </MenuItem>
        <MenuItem value={3}>
          <Tooltip title="Pice Of Shit" placement="right-end">
            <ThumbDownAltIcon color="action" />
          </Tooltip>
        </MenuItem>
        <MenuItem value={4}>
          <Tooltip title="Not Yet" placement="right-end">
            <CloseIcon color="error" />
          </Tooltip>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

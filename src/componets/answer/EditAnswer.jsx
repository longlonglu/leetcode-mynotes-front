import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import customAxios from "../../hooks/index";
import { useDispatch } from "react-redux";
import { alertActions } from "../../redux/actions";
import { bindActionCreators } from "redux";

const axios = customAxios();

export default function EditAnswer({ questionId, setAnswers, questionName }) {
  const { setAlert } = bindActionCreators(alertActions, useDispatch());
  const [answerName, setAnswerName] = useState(questionName + " - ");
  const [answerContent, setAnswerContent] = useState(initialAnswerContent);
  const [loading, setLoading] = useState(false);

  const loadAnswers = async () => {
    const { data } = await axios.get(`/answer/${questionId}`);
    setAnswers(data);
  };

  const handleAnswerContentOnChange = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      return;
    }
    setAnswerContent(e.target.value);
  };

  const handleAnswerNameOnChange = (e) => {
    setAnswerName(e.target.value);
  };

  const uploadAnswer = async () => {
    setLoading(true);
    const body = {
      answerName,
      answerContent,
      questionId,
    };
    const { data } = await axios.post("/answer/", body);
    if (data === "success") {
      setAlert({
        open: true,
        severity: "success",
        message: "Answer uploaded",
      });
      setAnswerContent(initialAnswerContent);
      await loadAnswers();
    } else {
      setAlert({
        open: true,
        severity: "error",
        message: "Something bad happened",
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Answer Name"
        id="answerName"
        value={answerName}
        onChange={(e) => {
          handleAnswerNameOnChange(e);
        }}
      />
      <TextField
        value={answerContent}
        fullWidth
        id="answerDetails"
        multiline
        minRows="25"
        margin="dense"
        onChange={(e) => {
          handleAnswerContentOnChange(e);
        }}
        onKeyDown={(e) => {
          handleAnswerContentOnChange(e);
        }}
      />
      <div style={{ float: "right", marginBottom: "1%", marginTop: "1%" }}>
        {loading ? (
          <CircularProgress color="secondary" size="2rem"/>
        ) : (
          <Button
            color="secondary"
            size="small"
            variant="outlined"
            onClick={() => {
              uploadAnswer();
            }}
          >
            Upload Answer
          </Button>
        )}
      </div>
    </div>
  );
}

const initialAnswerContent =
  "## 思路:" +
  "\n" +
  "\n" +
  `<img src=" " width="60%" height="auto"/>` +
  "\n" +
  "\n" +
  "*. " +
  "\n" +
  "*. " +
  "\n" +
  "\n" +
  "___" +
  "\n" +
  "\n" +
  "`Time complexity: O()`" +
  "\n" +
  "\n" +
  "`Space complexity: O()`" +
  "\n" +
  "\n" +
  "```python" +
  "\n" +
  "\n" +
  "```";

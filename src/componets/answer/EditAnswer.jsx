import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import customAxios from "../../hooks/index";
import { useDispatch } from "react-redux";
import { alertActions } from "../../redux/actions";
import { bindActionCreators } from "redux";
import MDEditor, { EditorContext } from "@uiw/react-md-editor";
import IconButton from "@mui/material/IconButton";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

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
      <div data-color-mode="light">
        <MDEditor
          height={"70vh"}
          value={answerContent}
          preview="edit"
          extraCommands={[fullScreen]}
          commands={[]}
          onChange={(val) => setAnswerContent(val)}
        />
      </div>
      <div style={{ float: "right", marginBottom: "1%", marginTop: "1%" }}>
        {loading ? (
          <CircularProgress color="secondary" size="2rem" />
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

const FullScreenButton = () => {
  const { preview, fullscreen, dispatch } = useContext(EditorContext);
  const click = () => {
    dispatch({
      preview: !fullscreen ? "live" : "edit",
      fullscreen: !fullscreen,
    });
  };

  if (preview === "edit") {
    return (
      <IconButton aria-label="fingerprint" color="success" onClick={click}>
        <FullscreenIcon />
      </IconButton>
    );
  }
  return (
    <IconButton aria-label="fingerprint" color="success" onClick={click}>
      <FullscreenExitIcon />
    </IconButton>
  );
};

const fullScreen = {
  name: "fullscreen",
  keyCommand: "fullscreen",
  value: "fullscreen",
  icon: <FullScreenButton />,
};

const initialAnswerContent =
  `<img src="" width="60%" height="auto"/>` +
  "\n" +
  "\n" +
  "## 思路:" +
  "\n" +
  "\n" +
  "1. " +
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

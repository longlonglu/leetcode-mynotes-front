import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LoadAnswer from "../componets/answer/LoadAnswer";
import customAxios from "../hooks/index";
import EditAnswer from "../componets/answer/EditAnswer";
import { useDispatch } from "react-redux";
import { alertActions } from "../redux/actions";
import { bindActionCreators } from "redux";

const axios = customAxios();

export default function Answer({ questionId, questionName }) {
  const [answers, setAnswers] = useState(null);
  const { setAlert } = bindActionCreators(alertActions, useDispatch());
  const [loading, setLoading] = useState(false);

  const loadAnswers = async () => {
    const { data } = await axios.get(`/answer/${questionId}`);
    setAnswers(data);
  };
  useEffect(() => {
    loadAnswers();
  }, []);

  const deleteAnswer = async (answerId) => {
    setLoading(true);
    const { data } = await axios.delete(`/answer/${answerId}`);
    if (data === null) {
      setAlert({
        open: true,
        severity: "error",
        message: "Something bad happened",
      });
    }
    setAlert({
      open: true,
      severity: "success",
      message: "Answer deleted",
    });
    await loadAnswers();
    setLoading(false);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="overline">Add New Answer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EditAnswer
            questionId={questionId}
            setAnswers={setAnswers}
            questionName={questionName}
          />
        </AccordionDetails>
      </Accordion>
      {answers &&
        answers.map((answer, index) => {
          return (
            <Accordion key={answer.ANSWERNAME}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  variant="overline"
                  sx={{ width: "40%", flexShrink: 0 }}
                >
                  {answer.ANSWERNAME}
                </Typography>
                <Typography variant="overline" sx={{ color: "text.secondary" }}>
                  {answer.ANSWERDATE.split("T")[0]}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <LoadAnswer answerUrl={answer.ANSWERURL} />
                <div
                  style={{
                    float: "right",
                    marginBottom: "1%",
                    marginTop: "1%",
                  }}
                >
                  {loading ? (
                    <CircularProgress color="secondary" size="2rem" />
                  ) : (
                    <Button
                      color="secondary"
                      disabled={false}
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        deleteAnswer(answer.ANSWERID);
                      }}
                    >
                      Delete Answer
                    </Button>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
}

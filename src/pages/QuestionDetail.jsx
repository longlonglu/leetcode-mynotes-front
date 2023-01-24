import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customAxios from "../hooks/index";
import QuestionDescription from "../componets/question/QuestionDescription";
import Grid from "@mui/material/Grid";
import QuestionStatusSelect from "../componets/question/QuestionStatus";
import { Paper } from "@mui/material";
import AnsewrPage from "./Answer";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

const axios = customAxios();

export function QuestionDetail() {
  let { questionId } = useParams();
  const [questionDetail, setQuestionDetail] = useState(null);

  useEffect(() => {
    const getQuestionDescription = async () => {
      const { data } = await axios.get(`/question/${questionId}`);
      setQuestionDetail(data);
    };
    getQuestionDescription();
  }, []);

  return (
    <Grid
      container
      spacing={1.5}
      alignItems="flex-start"
      justifyContent="center"
      direction="row"
      marginTop="0vh"
    >
      <Grid item xs={5} key={1}>
        <Paper style={{ height: "95vh", overflowY: "scroll" }}>
          <div style={{ margin: "2vw" }}>
            <Typography
              style={{ textAlign: "center" }}
              variant="button"
              display="block"
              gutterBottom
            >
              Question Description
            </Typography>
            {questionDetail === null ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              <>
                <div style={{ float: "right" }}>
                  <QuestionStatusSelect
                    questionId={questionId}
                    questionStatus={questionDetail.status}
                  />
                </div>
                <div>
                  <Link
                    href={questionDetail.questionUrl}
                    underline="hover"
                    variant="overline"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {questionDetail.questionTitle}
                  </Link>
                </div>
                <div style={{ marginBottom: "4%" }}>
                  {questionDetail.tags.map((tag, index) => {
                    return (
                      <Chip
                        key={index}
                        label={tag}
                        color="success"
                        variant="outlined"
                        size="small"
                        style={{ marginLeft: "0.5vw" }}
                      />
                    );
                  })}
                </div>
                <QuestionDescription
                  contents={questionDetail.questionContent}
                />
              </>
            )}
          </div>
        </Paper>
      </Grid>
      <Grid item xs={7} key={2}>
        <Paper style={{ height: "95vh", overflowY: "scroll" }}>
          {questionDetail && (
            <AnsewrPage
              questionId={questionId}
              questionName={questionDetail.questionTitle}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

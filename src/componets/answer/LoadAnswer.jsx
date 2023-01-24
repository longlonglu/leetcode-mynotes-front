import { useEffect, useState } from "react";
import customAxios from "../../hooks";
import MarkDown from "../markdown/Markdown";
import Skeleton from "@mui/material/Skeleton";

const axios = customAxios();

export default function LoadAnswer({ answerUrl }) {
  const [answerMarkDown, setAnswerMarkDown] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadAnswerMarkDown = async () => {
      setLoading(true);
      const { data } = await axios.get(answerUrl);
      setAnswerMarkDown(data);
      setLoading(false);
    };
    loadAnswerMarkDown();
  }, []);
  return (
    <>
      {loading ? <Skeleton /> : <MarkDown contents={String(answerMarkDown)} />}
    </>
  );
}

import { useEffect, useState } from "react";
import customAxios from "../../hooks";
import MarkDown from "../markdown/Markdown";

const axios = customAxios();

export default function LoadAnswer({ answerUrl }) {
  const [answerMarkDown, setAnswerMarkDown] = useState("");
  useEffect(() => {
    const loadAnswerMarkDown = async () => {
      const { data } = await axios.get(answerUrl);
      setAnswerMarkDown(data);
    };
    loadAnswerMarkDown();
  }, []);
  return (
    <>
       <MarkDown contents={answerMarkDown} />
    </>
  );
}

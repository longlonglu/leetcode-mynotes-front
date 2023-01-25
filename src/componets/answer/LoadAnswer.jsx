import { useEffect, useState } from "react";
import customAxios from "../../hooks";
import MDEditor from "@uiw/react-md-editor";

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
    <div data-color-mode="light">
      <MDEditor.Markdown source={answerMarkDown} />
    </div>
  );
}

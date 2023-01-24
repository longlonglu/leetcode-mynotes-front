import parse from "html-react-parser";
import "./questionDescription.scss";

export default function QuestionDescription({ contents }) {
  return (
    <>
      <div className="md-question-post">{parse(contents)}</div>
    </>
  );
}

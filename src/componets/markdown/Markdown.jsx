import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as highlighterTheme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Typography from "@mui/material/Typography";
import "./markdown-styles.scss";

export default function Markdown({ contents }) {
  const H2 = ({ children }) => (
    <Typography variant="h5" gutterBottom>
      {children}
    </Typography>
  );
  const OL = ({ children }) => <ol className="md-post-ol">{children}</ol>;
  const LI = ({ children }) => (
    <li className="md-post-li">
      <Typography variant="body1" gutterBottom>
        {children}
      </Typography>
    </li>
  );
  return (
    <>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        children={contents}
        components={{
          h2: H2,
          li: LI,
          ol: OL,
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={highlighterTheme}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code
                style={{
                  color: "#8C1F28",
                  borderRadius: "0.3rem",
                  backgroundColor: "#BFBFBF",
                }}
              >
                {children}
              </code>
            );
          },
        }}
      />
    </>
  );
}

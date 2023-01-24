import { QuestionDetail } from "./pages/QuestionDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ImageDrawer from "./componets/image/ImageDrawer";
import Alert from "./componets/alert/Alert";

export default function App() {
  return (
    <div>
      <ImageDrawer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question/:questionId" element={<QuestionDetail />} />
        </Routes>
      </Router>
    <Alert />
    </div>
  );
}

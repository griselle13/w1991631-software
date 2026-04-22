import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuizPage from "./pages/QuizPage";
import QuizCompletedPage from "./pages/QuizCompletedPage";
import ResultsPage from "./pages/ResultsPage";
import NavBar from "./pages/static/navBar";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Memory from "./pages/content/Memory";
import Cognitive from "./pages/content/Cognitive";
import Compensastion from "./pages/content/Compensation";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "60px" }}>
        <Routes>
          <Route path="/quiz-page" element={<QuizPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/quiz-completed" element={<QuizCompletedPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/content/1" element={<Memory />} />
          <Route path="/content/2" element={<Cognitive />} />
          <Route path="/content/3" element={< Compensastion />} />#
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
import { Route, Routes } from "react-router-dom";

import CoursePage from "./pages/CoursePage";
import HomePage from "./pages/HomePage";
import LessonPage from "./pages/LessonPage";
import LoginPage from "./pages/LoginPage";
import ModulePage from "./pages/ModulePage";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/courses/:courseId"
        element={<CoursePage />}
      />

      <Route
        path="/modules/:moduleId"
        element={<ModulePage />}
      />

      <Route
        path="/lessons/:lessonId"
        element={<LessonPage />}
      />

      <Route
        path="/quizzes/:quizId"
        element={<QuizPage />}
      />
    </Routes>
  );
}

export default App;
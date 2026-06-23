import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Navbar from "./components/Navbar";
import Protected from "./components/Protected";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import StudentCourse from "./pages/StudentCourse";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherCourse from "./pages/TeacherCourse";

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/student"
                element={
                  <Protected role="student">
                    <StudentDashboard />
                  </Protected>
                }
              />
              <Route
                path="/student/course/:courseId"
                element={
                  <Protected role="student">
                    <StudentCourse />
                  </Protected>
                }
              />
              <Route
                path="/teacher"
                element={
                  <Protected role="teacher">
                    <TeacherDashboard />
                  </Protected>
                }
              />
              <Route
                path="/teacher/course/:courseId"
                element={
                  <Protected role="teacher">
                    <TeacherCourse />
                  </Protected>
                }
              />
              <Route
                path="*"
                element={
                  <div className="mx-auto max-w-md p-10 text-center">
                    <h2 className="text-xl font-semibold">Page not found</h2>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}
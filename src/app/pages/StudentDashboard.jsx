import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { getEnrolledCourses } from "../../backend/studentService";
import CourseCard from "../components/CourseCard";

export default function StudentDashboard() {
  const { user, info } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getEnrolledCourses(user.uid).then((c) => {
      setCourses(c);
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">Welcome, {info?.Name || "Student"} 👋</h1>
      <p className="mt-1 text-muted-foreground">Your enrolled courses</p>

      {loading ? (
        <div className="mt-10 text-muted-foreground">Loading courses…</div>
      ) : courses.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
          You aren't enrolled in any courses yet. Please contact the admin.
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((id) => (
            <CourseCard key={id} courseId={id} to={`/student/course/${encodeURIComponent(id)}`} />
          ))}
        </div>
      )}
    </div>
  );
}
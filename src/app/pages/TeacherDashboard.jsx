import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { getAssignedCourses } from "../../backend/teacherService";
import CourseCard from "../components/CourseCard";

export default function TeacherDashboard() {
  const { user, info } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getAssignedCourses(user.uid).then((c) => {
      setCourses(c);
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">Welcome, {info?.Name || "Teacher"} 👨‍🏫</h1>
      <p className="mt-1 text-muted-foreground">Courses assigned to you</p>

      {loading ? (
        <div className="mt-10 text-muted-foreground">Loading…</div>
      ) : courses.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
          No courses assigned yet.
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((id) => (
            <CourseCard key={id} courseId={id} to={`/teacher/course/${encodeURIComponent(id)}`} />
          ))}
        </div>
      )}
    </div>
  );
}
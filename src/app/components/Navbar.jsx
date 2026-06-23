import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { logoutUser } from "../../backend/authService";

export default function Navbar() {
  const { user, role, info } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">LS</div>
          <div className="leading-tight">
            <div className="font-semibold text-foreground">Learn Smart</div>
            <div className="text-xs text-muted-foreground">Academy</div>
          </div>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          {!user && (
            <>
              <Link to="/" className="rounded px-3 py-2 text-foreground hover:bg-secondary">Home</Link>
              <Link to="/register" className="rounded px-3 py-2 text-foreground hover:bg-secondary">Register</Link>
              <Link to="/login" className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90">Login</Link>
            </>
          )}
          {user && role === "student" && (
            <Link to="/student" className="rounded px-3 py-2 text-foreground hover:bg-secondary">Dashboard</Link>
          )}
          {user && role === "teacher" && (
            <Link to="/teacher" className="rounded px-3 py-2 text-foreground hover:bg-secondary">Dashboard</Link>
          )}
          {user && (
            <>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                {info?.Name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-secondary"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
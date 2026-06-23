import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../backend/authService";
import { useAuth } from "../AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    if (role === "student") navigate("/student", { replace: true });
    else if (role === "teacher") navigate("/teacher", { replace: true });
  }, [user, role, loading, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await loginUser(form.email.trim(), form.password);
      // useEffect above will route
    } catch (e) {
      setErr(e?.message || "Login failed.");
    } finally {
      setBusy(false);
    }
  }

  const field =
    "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">Sign In</h1>
        <p className="mt-1 text-sm text-muted-foreground">Use the credentials provided by your admin.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="font-medium text-foreground">Email</span>
            <input type="email" required className={field} value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-foreground">Password</span>
            <input type="password" required className={field} value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </label>
          {err && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>}
          <button disabled={busy} className="w-full rounded-md bg-primary px-4 py-2.5 font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60">
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
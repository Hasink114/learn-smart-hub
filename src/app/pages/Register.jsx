import { useState } from "react";
import { COURSES } from "../../backend/courseConstants";

const SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbw8NKJbKbjyy54GlePDOtAK9ODPNG_d8dOvCdJq2jVj57RVo6F8egDjlratwsNgAL28/exec";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    studentClass: "",
    email: "",
    phone: "",
    courses: [],
  });
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  function toggleCourse(id) {
    setForm((f) => ({
      ...f,
      courses: f.courses.includes(id) ? f.courses.filter((c) => c !== id) : [...f.courses, id],
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", msg: "" });
    try {
      const name = form.name.trim();
      const studentClass = form.studentClass.trim();
      const email = form.email.trim();
      const phone = form.phone.trim();
      if (!name || name.length > 100) throw new Error("Name is required (max 100).");
      if (!studentClass || studentClass.length > 50) throw new Error("Class is required.");
      if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 200) throw new Error("Valid email required.");
      if (!/^[+\d\s\-()]{7,20}$/.test(phone)) throw new Error("Valid phone required.");
      if (form.courses.length === 0) throw new Error("Select at least one course.");
      // Use text/plain to avoid a CORS preflight to Apps Script.
      await fetch(SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name,
          studentClass,
          email,
          phone,
          courses: form.courses,
        }),
      });
      setStatus({ state: "success", msg: "Registration submitted! Our admin team will contact you shortly." });
      setForm({ name: "", studentClass: "", email: "", phone: "", courses: [] });
    } catch (err) {
      setStatus({ state: "error", msg: err?.message || "Something went wrong." });
    }
  }

  const field =
    "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground">Register</h1>
      <p className="mt-1 text-muted-foreground">Fill out the form — admin will set up your account.</p>

      <form onSubmit={onSubmit} className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-foreground">Full Name</span>
            <input className={field} required maxLength={100} value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-foreground">Class / Level</span>
            <input className={field} required maxLength={50} value={form.studentClass}
              onChange={(e) => setForm({ ...form, studentClass: e.target.value })} />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-foreground">Email</span>
            <input type="email" className={field} required value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-foreground">Phone</span>
            <input className={field} required value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
        </div>

        <div className="mt-6">
          <div className="text-sm font-medium text-foreground">Select Courses</div>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {COURSES.map((c) => {
              const checked = form.courses.includes(c.id);
              return (
                <label
                  key={c.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition ${
                    checked ? "border-primary bg-primary/5" : "border-border bg-background hover:bg-secondary/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mt-0.5"
                    checked={checked}
                    onChange={() => toggleCourse(c.id)}
                  />
                  <span>
                    <span className="font-medium text-foreground">{c.name}</span>
                    <span className="block text-xs text-muted-foreground">{c.duration} · {c.fee}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {status.msg && (
          <div
            className={`mt-5 rounded-md px-3 py-2 text-sm ${
              status.state === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {status.msg}
          </div>
        )}

        <button
          disabled={status.state === "loading"}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {status.state === "loading" ? "Submitting…" : "Submit Registration"}
        </button>
      </form>
    </div>
  );
}
import { createServerFn } from "@tanstack/react-start";

type Payload = {
  name: string;
  studentClass: string;
  email: string;
  phone: string;
  courses: string[];
};

function validate(input: unknown): Payload {
  if (!input || typeof input !== "object") throw new Error("Invalid payload");
  const o = input as Record<string, unknown>;
  const name = String(o.name || "").trim();
  const studentClass = String(o.studentClass || "").trim();
  const email = String(o.email || "").trim();
  const phone = String(o.phone || "").trim();
  const courses = Array.isArray(o.courses) ? o.courses.map((c) => String(c)) : [];
  if (!name || name.length > 100) throw new Error("Name is required (max 100).");
  if (!studentClass || studentClass.length > 50) throw new Error("Class is required.");
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 200) throw new Error("Valid email required.");
  if (!/^[+\d\s\-()]{7,20}$/.test(phone)) throw new Error("Valid phone required.");
  if (courses.length === 0) throw new Error("Select at least one course.");
  return { name, studentClass, email, phone, courses };
}

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const connKey = process.env.GOOGLE_SHEETS_API_KEY;
    const sheetId = process.env.LEARN_SMART_SHEET_ID;
    const tab = process.env.LEARN_SMART_SHEET_TAB || "Registrations";
    if (!lovableKey || !connKey) throw new Error("Server not configured (gateway keys missing).");
    if (!sheetId) throw new Error("Server not configured (sheet id missing).");

    const range = `${tab}!A:F`;
    const url = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const row = [
      new Date().toISOString(),
      data.name,
      data.studentClass,
      data.email,
      data.phone,
      data.courses.join(", "),
    ];

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": connKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Sheets append failed", res.status, text);
      throw new Error("Could not save registration. Please try again.");
    }
    return { ok: true };
  });
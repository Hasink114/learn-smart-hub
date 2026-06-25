// Hardcoded course catalogue for Learn Smart Academy
export const COURSES = [
  {
    id: "Digital Marketing",
    name: "Digital Marketing",
    description:
      "Master SEO, social media, paid ads and analytics to grow real brands online.",
    fee: "Rs. 6,000 / month",
    duration: "3 Months",
  },
  {
    id: "Vibe Coding",
    name: "Vibe Coding",
    description:
      "Build full apps using AI tools like Lovable, Cursor and ChatGPT — no boring theory.",
    fee: "Rs. 8,000 / month",
    duration: "2 Months",
  },
  {
    id: "Web Development",
    name: "Web Development",
    description:
      "HTML, CSS, JavaScript and React fundamentals to build real responsive websites.",
    fee: "Rs. 7,000 / month",
    duration: "4 Months",
  },
  {
    id: "Google docs/sheets with AI",
    name: "Google Docs & Sheets with AI",
    description:
      "Supercharge office productivity with Google Workspace + AI formulas, automations and add-ons.",
    fee: "Rs. 4,500 / month",
    duration: "1 Month",
  },
];

export const COURSE_IDS = COURSES.map((c) => c.id);

export function getCourseMeta(id) {
  return COURSES.find((c) => c.id === id) || { id, name: id, description: "", fee: "", duration: "" };
}
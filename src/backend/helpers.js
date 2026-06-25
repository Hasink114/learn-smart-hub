export function tsNow() {
  return Date.now();
}

export function youtubeIdFromUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/");
    const idx = parts.indexOf("embed");
    if (idx >= 0) return parts[idx + 1];
    return null;
  } catch {
    return null;
  }
}

export function isValidUrl(s) {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
}

export function objToList(obj) {
  if (!obj) return [];
  return Object.entries(obj).map(([id, value]) => ({ id, ...value }));
}

export function trueKeys(obj) {
  if (!obj) return [];
  return Object.keys(obj).filter((k) => obj[k] === true).map((k) => k.trim().replace(/^["']|["']$/g, ""));
}
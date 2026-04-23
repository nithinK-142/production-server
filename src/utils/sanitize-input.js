export const sanitizeInput = (body) => {
  if (!body) return null;

  // remove sensitive keys
  const blocked = ["password", "token", "accessToken", "refreshToken"];

  const cleaned = {};

  for (const key in body) {
    if (blocked.includes(key)) continue;

    const value = body[key];

    // avoid large payloads
    if (typeof value === "string" && value.length > 500) {
      cleaned[key] = "[TRUNCATED]";
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned;
};
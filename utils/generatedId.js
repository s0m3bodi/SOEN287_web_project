export function generatedId(role) {
  const prefix = role === "teacher" ? "TCH" : "STU";
  const digits = Math.floor(10000000 + Math.random() * 90000000); // 8-digit number
  return `${prefix}-${digits}`;
}
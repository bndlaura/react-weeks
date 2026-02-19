export function getRatingColor(rating) {
  const r = parseFloat(rating);

  if (r >= 8) return "rating-green";
  if (r >= 5) return "rating-yellow";
  return "rating-red";
}

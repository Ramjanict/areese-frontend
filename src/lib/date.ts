export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateWithTime(dateTime: string): string {
  const [datePart, timePart] = dateTime.split(", ");
  const [day, month, year] = datePart.split("/").map(Number);

  const isoString = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${timePart}`;

  const date = new Date(isoString);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

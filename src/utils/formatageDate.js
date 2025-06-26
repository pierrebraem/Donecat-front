export function formatageDate(dateOriginal) {
  return (
    dateOriginal.getDate() +
    "/" +
    (dateOriginal.getMonth() + 1) +
    "/" +
    dateOriginal.getFullYear()
  );
}

export function formatageDate(dateOriginal) {
  if (!(dateOriginal instanceof Date)) {
    return dateOriginal;
  }

  return (
    dateOriginal.getDate() +
    "/" +
    (dateOriginal.getMonth() + 1) +
    "/" +
    dateOriginal.getFullYear()
  );
}

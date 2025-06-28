export const statusTache = [
  { label: "Backlogs", value: "backlogs" },
  { label: "To do", value: "todo" },
  { label: "In Progress", value: "inprogress" },
  { label: "In Review", value: "inreview" },
  { label: "Done", value: "done" },
];

export function traduireValeurParLabel(valeur) {
  for (const status of statusTache) {
    if (status.value == valeur) {
      return status.label;
    }
  }
}

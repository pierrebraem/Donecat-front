export async function getProjets() {
  const response = await fetch(import.meta.env.VITE_API_URL + "/projets");
  const data = await response.json();
  return data;
}

export async function getProjet(id) {
  const response = await fetch(import.meta.env.VITE_API_URL + "/projets/" + id);
  const data = await response.json();
  return data;
}

export async function postProjet(body) {
  await fetch(import.meta.env.VITE_API_URL + "/projets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function putProjet(id, body) {
  await fetch(import.meta.env.VITE_API_URL + "/projets/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function deleteProjet(id) {
  await fetch(import.meta.env.VITE_API_URL + "/projets/" + id, {
    method: "DELETE",
  });
}

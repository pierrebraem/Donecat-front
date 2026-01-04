export async function getEquipes() {
  const response = await fetch(import.meta.env.VITE_API_URL + "/equipes");
  const data = await response.json();
  return data;
}

export async function getEquipe(id) {
  const response = await fetch(import.meta.env.VITE_API_URL + "/equipes/" + id);
  const data = await response.json();
  return data;
}

export async function postEquipe(body) {
  await fetch(import.meta.env.VITE_API_URL + "/equipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function putEquipe(id, body) {
  await fetch(import.meta.env.VITE_API_URL + "/equipes/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function deleteEquipe(id) {
  await fetch(import.meta.env.VITE_API_URL + "/equipes/" + id, {
    method: "DELETE",
  });
}

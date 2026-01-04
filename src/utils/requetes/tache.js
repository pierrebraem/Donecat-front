export async function getTaches() {
  const response = await fetch(import.meta.env.VITE_API_URL + "/taches");
  const data = await response.json();
  return data;
}

export async function getTache(id) {
  const response = await fetch(import.meta.env.VITE_API_URL + "/taches/" + id);
  const data = await response.json();
  return data;
}

export async function postTache(body) {
  await fetch(import.meta.env.VITE_API_URL + "/taches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function putTache(id, body) {
  await fetch(import.meta.env.VITE_API_URL + "/taches/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function deleteTache(id) {
  await fetch(import.meta.env.VITE_API_URL + "/taches/" + id, {
    method: "DELETE",
  });
}

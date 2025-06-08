export async function getEquipes() {
  const response = await fetch("http://localhost:3000/equipes");
  const data = await response.json();
  return data;
}

export async function getEquipe(id) {
  const response = await fetch("http://localhost:3000/equipes/" + id);
  const data = await response.json();
  return data;
}

export async function postEquipe(body) {
  await fetch("http://localhost:3000/equipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function putEquipe(id, body) {
  await fetch("http://localhost:3000/equipes/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function deleteEquipe(id) {
  await fetch("http://localhost:3000/equipes/" + id, {
    method: "DELETE",
  });
}

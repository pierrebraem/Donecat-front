export async function getUtilisateurs() {
  const response = await fetch("http://localhost:3000/utilisateurs");
  const data = await response.json();
  return data;
}

export async function getUtilisateur(id) {
  const response = await fetch("http://localhost:3000/utilisateurs/" + id);
  const data = await response.json();
  return data;
}

export async function postUtilisateur(body) {
  await fetch("http://localhost:3000/utilisateurs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function putUtilisateur(id, body) {
  await fetch("http://localhost:3000/utilisateurs/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function deleteUtilisateur(id) {
  await fetch("http://localhost:3000/utilisateurs/" + id, {
    method: "DELETE",
  });
}

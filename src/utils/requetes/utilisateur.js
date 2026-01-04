export async function getUtilisateurs() {
  const response = await fetch(import.meta.env.VITE_API_URL + "/utilisateurs");
  const data = await response.json();
  return data;
}

export async function getUtilisateursSansAdmin() {
  const response = await fetch(
    import.meta.env.VITE_API_URL + "/utilisateurs?status_ne=Administrateur",
  );
  const data = await response.json();
  return data;
}

export async function getUtilisateur(id) {
  const response = await fetch(
    import.meta.env.VITE_API_URL + "/utilisateurs/" + id,
  );
  const data = await response.json();
  return data;
}

export async function getUtilisateursByEmail(email) {
  const response = await fetch(
    import.meta.env.VITE_API_URL + "/utilisateurs?email=" + email,
  );
  const data = await response.json();
  return data;
}

export async function postUtilisateur(body) {
  await fetch(import.meta.env.VITE_API_URL + "/utilisateurs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function putUtilisateur(id, body) {
  await fetch(import.meta.env.VITE_API_URL + "/utilisateurs/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function deleteUtilisateur(id) {
  await fetch(import.meta.env.VITE_API_URL + "/utilisateurs/" + id, {
    method: "DELETE",
  });
}

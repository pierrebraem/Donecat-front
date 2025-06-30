export async function getTaches() {
  const response = await fetch("http://localhost:3000/taches");
  const data = await response.json();
  return data;
}

export async function getTache(id) {
  const response = await fetch("http://localhost:3000/taches/" + id);
  const data = await response.json();
  return data;
}

export async function postTache(body) {
  await fetch("http://localhost:3000/taches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function putTache(id, body) {
  await fetch("http://localhost:3000/taches/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function deleteTache(id) {
  await fetch("http://localhost:3000/taches/" + id, {
    method: "DELETE"
  })
}

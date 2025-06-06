export async function getProjets(){
    const response = await fetch("http://localhost:3000/projets")
    const data = await response.json()
    return data
}

export async function getProjet(id){
    const response = await fetch("http://localhost:3000/projets/" + id)
    const data = await response.json()
    return data
}

export async function postProjet(body){
    await fetch("http://localhost:3000/projets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
}

export async function putProjet(id, body){
    await fetch("http://localhost:3000/projets/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
}

export async function deleteProjet(id){
    await fetch("http://localhost:3000/projets/" + id, {
        method: "DELETE"
    })
}
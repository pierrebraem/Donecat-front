export async function getEquipes(){
    const response = await fetch("http://localhost:3000/equipes")
    const data = await response.json()
    return data
}

export async function getUtilisateurs(){
    const response = await fetch("http://localhost:3000/utilisateurs")
    const data = await response.json()
    return data
}

export async function getUtilisateur(id){
    const response = await fetch("http://localhost:3000/utilisateurs/" + id)
    const data = await response.json()
    return data
}

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

export async function getTaches(){
    const response = await fetch("http://localhost:3000/taches")
    const data = await response.json()
    return data
}

export async function getTache(id){
    const response = await fetch("http://localhost:3000/taches/" + id)
    const data = await response.json()
    return data
}
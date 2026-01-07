import bcrypt from "bcryptjs";
import { getUtilisateursByEmail } from "@/utils/requetes/utilisateur";

export function verifieChampVide(texte, nomChamp) {
  if (texte == "") {
    return `Le champ "${nomChamp}" ne doit pas être vide.`;
  }
  return;
}

export function inferieurXCarac(texte, limite, nomChamp) {
  if (texte.length >= limite) {
    return `Le champ "${nomChamp}" doit contenir moins de ${limite} caratères.`;
  }
  return;
}

export async function verifieExistanceEmail(email) {
  const response = await getUtilisateursByEmail(email);

  if (response.length > 0) {
    return `L'adresse mail "${email}" existe déjà. Veuillez en prendre un autre.`;
  }
  return;
}

export function verifieValiditeEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return 'Votre saisi dans le champ "Adresse mail" ne correspond pas à une adresse mail.';
  }
  return;
}

export function verifieValiditeMdp(mdp) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#^<>?$])[A-Za-z\d@!#^<>?$]{8,}$/;
  if (!regex.test(mdp)) {
    return "Votre mot de passe doit contenir au minimun 8 caractères, une majuscule, une minuscule, un nombre et un caractère spécial (@, !, #, ^, <, >, ?, $)";
  }
  return;
}

export function compareMdp(saisiMdp, mdpActuel) {
  if (!bcrypt.compareSync(saisiMdp, mdpActuel)) {
    return "Votre saisi de votre ancien mot de passe ne correspond pas à votre mot de passe actuel";
  }
  return;
}

export function mdpIdentiques(mdp, confirmeMdp) {
  if (mdp != confirmeMdp) {
    return 'Les champs "Mot de passe" et "Confirmer mot de passe" ne sont pas les mêmes.';
  }
  return;
}

export function utilisateurAssocieeAuProjet(
  projet_id,
  developpeur_id,
  equipes,
  projets,
) {
  const projet = projets.find((p) => p.id == projet_id);
  const equipe = equipes.find((e) => e.id == projet.equipe_id);
  const trouverUtilisateur = equipe.membres.find((m) => m == developpeur_id);
  const trouverManager = equipe.manager == developpeur_id;

  if (!trouverUtilisateur && !trouverManager) {
    return "Le développeur que vous avez choisi ne fais pas partie du projet.";
  }
  return;
}

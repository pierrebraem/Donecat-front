import bcrypt from "bcryptjs";

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

export function verifieValiditeEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return 'Votre saisi dans le champ "Adresse mail" ne correspond pas à une adresse mail.';
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

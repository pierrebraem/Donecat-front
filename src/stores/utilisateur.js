import { defineStore } from "pinia";
import { ref } from "vue";
import { getUtilisateursByEmail } from "@/utils/requetes/utilisateur";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";

export const useUtilisateurStore = defineStore("utilisateur", () => {
  const utilisateur = ref(null);

  async function login(email, password) {
    let utilisateurs = [];

    if (email != "") {
      utilisateurs = await getUtilisateursByEmail(email);
    }

    const res = utilisateurs[0];

    if (res == undefined || !bcrypt.compareSync(password, res.motdepasse))
      return false;

    utilisateur.value = {
      id: res.id,
      status: res.status,
      nom: res.prenom + " " + res.nom,
    };

    Cookies.set("utilisateur", JSON.stringify(utilisateur.value), {
      expires: 1,
    });
    return true;
  }

  function logout() {
    Cookies.remove("utilisateur");
    utilisateur.value = null;
  }

  function checkIfCookiesIsSet() {
    if (Cookies.get("utilisateur") != undefined) {
      utilisateur.value = JSON.parse(Cookies.get("utilisateur"));
    }
  }

  return { utilisateur, login, logout, checkIfCookiesIsSet };
});

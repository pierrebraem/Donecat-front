/* eslint-disable */
const url = Cypress.config("baseUrl") + "/profil";

const cookie = {
  id: 1,
  status: "Administrateur",
  nom: "Françoise LaPierre",
  lastLoginTime: new Date(),
};

describe("Accès à la page", () => {
  it("Quand le cookie de connexion n'est pas présent", () => {
    cy.visit(url);
    cy.url().should("eq", Cypress.config("baseUrl") + "/connexion");
  });
  it("Quand le cookie de connexion est présent", () => {
    cy.setCookie("utilisateur", JSON.stringify(cookie));
    cy.visit(url);
  });
});

describe("Vérifie que les données se charge correctement", () => {
  it("Au chargement de la page, les données de l'utilisateur sont chargées", () => {
    cy.setCookie("utilisateur", JSON.stringify(cookie));

    cy.intercept("GET", "/utilisateurs/1", { fixture: "profil/admin.json" });
    cy.visit(url);

    cy.get('div[id="profil-nom"]').should("contain", "Nom : LaPierre");
    cy.get('div[id="profil-prenom"]').should("contain", "Prénom : Françoise");
    cy.get('div[id="profil-email"]').should(
      "contain",
      "Email : francoise.lapierre@test.com",
    );
    cy.get('div[id="profil-pseudo"]').should(
      "contain",
      "Pseudo : FrançoiseDu80",
    );
    cy.get('div[id="profil-status"]').should(
      "contain",
      "Status : Administrateur",
    );
  });
});

describe('Tests de la modal "Modification du profil"', () => {
  beforeEach(() => {
    cy.setCookie("utilisateur", JSON.stringify(cookie));

    cy.intercept("GET", "/utilisateurs/1", { fixture: "profil/admin.json" });
    cy.visit(url);

    cy.wait(5000);

    cy.get(".p-dialog-header").should("not.exist");

    cy.get('button[aria-label="Modifier le profil"]').click();
    cy.get(".p-dialog-header").should("exist");
  });

  it("A l'ouverture de la modal, toutes les données de l'utilisateur doivent être chargé", () => {
    cy.get('[name="nom"]').should("have.value", "LaPierre");
    cy.get('[name="prenom"]').should("have.value", "Françoise");
    cy.get('[name="email"]').should(
      "have.value",
      "francoise.lapierre@test.com",
    );
    cy.get('[name="pseudo"]').should("have.value", "FrançoiseDu80");
  });

  it('Clique sur le bouton "Annuler", pour vérifier que la modal se ferme bien', () => {
    cy.get("#modifier-utilisateur-annuler").click();
    cy.get(".p-dialog-header").should("not.exist");
  });

  it('Supprime le contenu de champ "Nom" et clique sur le bouton "Modifier"', () => {
    cy.get('[name="nom"]').clear();
    cy.get("#modifier-utilisateur-valider").click();

    cy.get(".p-dialog-header").should("exist");
    cy.get("#modifier-utilisateur-erreurs").should(
      "contain",
      'Le champ "Nom" ne doit pas être vide.',
    );
  });

  it('Saisie plus de 100 caractères dans le champ "Nom" et clique sur le bouton "Modifier"', () => {
    cy.wait(5000);

    cy.get('[name="nom"]').type(
      "coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou",
    );
    cy.get("#modifier-utilisateur-valider").click();

    cy.get(".p-dialog-header").should("exist");
    cy.get("#modifier-utilisateur-erreurs").should(
      "contain",
      'Le champ "Nom" doit contenir moins de 100 caratères.',
    );
  });

  it('Supprime le contenu de champ "Prénom" et clique sur le bouton "Modifier"', () => {
    cy.get('[name="prenom"]').clear();
    cy.get("#modifier-utilisateur-valider").click();

    cy.get(".p-dialog-header").should("exist");
    cy.get("#modifier-utilisateur-erreurs").should(
      "contain",
      'Le champ "Prenom" ne doit pas être vide.',
    );
  });

  it('Saisie plus de 100 caractères dans le champ "Prénom" et clique sur le bouton "Modifier"', () => {
    cy.wait(5000);

    cy.get('[name="prenom"]').type(
      "coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou",
    );
    cy.get("#modifier-utilisateur-valider").click();

    cy.get(".p-dialog-header").should("exist");
    cy.get("#modifier-utilisateur-erreurs").should(
      "contain",
      'Le champ "Prénom" doit contenir moins de 100 caratères.',
    );
  });

  it('Supprime le contenu de champ "Adresse mail" et clique sur le bouton "Modifier"', () => {
    cy.get('[name="email"]').clear();
    cy.get("#modifier-utilisateur-valider").click();

    cy.get(".p-dialog-header").should("exist");
    cy.get("#modifier-utilisateur-erreurs").should(
      "contain",
      'Le champ "Adresse mail" ne doit pas être vide.',
    );
  });

  it('La saisie dans le champ "Adresse mail" n\'est pas une adresse mail et clique sur le bouton "Modifier"', () => {
    cy.wait(5000);

    cy.get('[name="email"]').clear().type("coucou");
    cy.get("#modifier-utilisateur-valider").click();

    cy.get(".p-dialog-header").should("exist");
    cy.get("#modifier-utilisateur-erreurs").should(
      "contain",
      'Votre saisi dans le champ "Adresse mail" ne correspond pas à une adresse mail.',
    );
  });

  it('Saisie une adresse mail déjà existant et clique sur le bouton "Modifier"', () => {
    cy.wait(5000);

    cy.intercept("GET", "/utilisateurs?email=ancelina.beausoleil@test.com", {
      fixture: "utilisateurs.json",
    });

    cy.get('[name="email"]').clear().type("ancelina.beausoleil@test.com");
    cy.get("#modifier-utilisateur-valider").click();

    cy.get(".p-dialog-header").should("exist");
    cy.get("#modifier-utilisateur-erreurs").should(
      "contain",
      'L\'adresse mail "ancelina.beausoleil@test.com" existe déjà. Veuillez en prendre un autre.',
    );
  });

  it('Supprime le contenu de champ "Pseudo" et clique sur le bouton "Modifier"', () => {
    cy.get('[name="pseudo"]').clear();
    cy.get("#modifier-utilisateur-valider").click();

    cy.get(".p-dialog-header").should("exist");
    cy.get("#modifier-utilisateur-erreurs").should(
      "contain",
      'Le champ "Pseudo" ne doit pas être vide.',
    );
  });

  it('Saisie plus de 100 caractères dans le champ "Pseudo" et clique sur le bouton "Modifier"', () => {
    cy.wait(5000);

    cy.get('[name="pseudo"]').type(
      "coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou coucou",
    );
    cy.get("#modifier-utilisateur-valider").click();

    cy.get(".p-dialog-header").should("exist");
    cy.get("#modifier-utilisateur-erreurs").should(
      "contain",
      'Le champ "Pseudo" doit contenir moins de 100 caratères.',
    );
  });

  it("Mettre à jour l'utilisateur sans changer d'adresse mail", () => {
    cy.intercept("PUT", "/utilisateurs/1", "success");
    cy.wait(5000);

    cy.get('[name="nom"]').clear().type("Doyon");
    cy.get('[name="prenom"]').clear().type("Michèle");
    cy.get('[name="pseudo"]').clear().type("MicheleDu59");

    cy.intercept("GET", "/utilisateurs/1", {
      fixture: "profil/admin_update_1.json",
    });

    cy.get("#modifier-utilisateur-valider").click();

    cy.get('div[id="profil-nom"]').should("contain", "Nom : Doyon");
    cy.get('div[id="profil-prenom"]').should("contain", "Prénom : Michèle");
    cy.get('div[id="profil-email"]').should(
      "contain",
      "Email : francoise.lapierre@test.com",
    );
    cy.get('div[id="profil-pseudo"]').should("contain", "Pseudo : MicheleDu59");
    cy.get('div[id="profil-status"]').should(
      "contain",
      "Status : Administrateur",
    );
  });

  it("Mettre à jour l'utilisateur en changeant l'adresse mail", () => {
    cy.intercept("PUT", "/utilisateurs/1", "success");
    cy.wait(5000);

    cy.get('[name="nom"]').clear().type("Patry");
    cy.get('[name="prenom"]').clear().type("Marmion");
    cy.get('[name="email"]').clear().type("marmion.patry@test.com");
    cy.get('[name="pseudo"]').clear().type("MicheleDu59");

    cy.intercept("GET", "/utilisateurs/1", {
      fixture: "profil/admin_update_2.json",
    });

    cy.get("#modifier-utilisateur-valider").click();

    cy.get('div[id="profil-nom"]').should("contain", "Nom : Patry");
    cy.get('div[id="profil-prenom"]').should("contain", "Prénom : Marmion");
    cy.get('div[id="profil-email"]').should(
      "contain",
      "Email : marmion.patry@test.com",
    );
    cy.get('div[id="profil-pseudo"]').should(
      "contain",
      "Pseudo : PatryMarmion",
    );
    cy.get('div[id="profil-status"]').should(
      "contain",
      "Status : Administrateur",
    );
  });
});

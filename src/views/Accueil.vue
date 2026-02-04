<script setup>
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
  Card,
  Image,
} from "primevue";

const coucou = "coucou";
</script>

<template>
  <div class="flex justify-center pt-4">
    <Card class="w-11/12">
      <template #content>
        <Accordion value="0">
          <AccordionPanel value="0">
            <AccordionHeader>Présentation de l'outil</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                Donecat est un outil web de gestion des tâches, similaire à Jira
                ou GitHub Projects, développé avec Vue 3. En plus de la gestion
                des tâches, il permet aussi de gérer les équipes et les projets.
              </p>
              {{ coucou }}
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="1">
            <AccordionHeader>Gestion des utilisateurs</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                En tant qu'administrateur, vous pouvez gérer les utilisateurs
                dans votre outil : créer des comptes pour les développeurs et
                les managers, modifier leurs informations à tout moment, ou
                supprimer un compte, par exemple lorsqu'un employé quitte
                l'entreprise.
              </p>
              <div class="flex justify-center pt-4">
                <Image
                  src="accueil/creation_utilisateur.png"
                  width="500"
                  preview
                />
              </div>
              <div class="flex justify-center pt-4">
                <Image
                  src="accueil/liste_utilisateurs.png"
                  width="500"
                  preview
                />
              </div>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="2">
            <AccordionHeader>Gestion des équipes</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                En tant qu'administrateur, vous pouvez gérer les équipes dans
                votre outil. Une équipe est un groupe composé de plusieurs
                développeurs et d'un manager. Ce dernier a pour rôle de créer
                des projets et de les affecter à son équipe.
              </p>
              <div class="flex justify-center pt-4">
                <Image
                  src="accueil/creation_equipe.png"
                  width="500"
                  preview
                />
              </div>
              <div class="flex justify-center pt-4">
                <Image
                  src="accueil/liste_equipes.png"
                  width="500"
                  preview
                />
              </div>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="3">
            <AccordionHeader>Gestion des projets</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                En tant que manager d'une équipe, vous pouvez gérer les
                différents projets associés à celle-ci. Vous avez la possibilité
                de créer, modifier ou supprimer une équipe. Tous les
                utilisateurs peuvent consulter le suivi des tâches à l'aide de
                graphiques.
              </p>
              <div class="flex justify-center pt-4">
                <Image
                  src="accueil/creation_projet.png"
                  width="500"
                  preview
                />
              </div>
              <div class="flex justify-center pt-4">
                <Image
                  src="accueil/liste_projets.png"
                  width="500"
                  preview
                />
              </div>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="4">
            <AccordionHeader>Gestion des tâches</AccordionHeader>
            <AccordionContent>
              <p class="m-0">
                Vous pouvez facilement suivre la progression de vos tâches sur
                les différents projets. Il vous suffit de cliquer sur une tâche
                pour consulter ses informations, et de cliquer sur le texte pour
                en modifier le statut. En tant que manager, vous pouvez
                également créer des tâches et modifier leurs informations en
                cliquant sur le texte correspondant lors de la visualisation
                d'une tâche.
              </p>
              <div class="flex justify-center pt-4">
                <Image
                  src="accueil/creation_tache.png"
                  width="500"
                  preview
                />
              </div>
              <div class="flex justify-center pt-4">
                <Image
                  src="accueil/liste_taches.png"
                  width="500"
                  preview
                />
              </div>
              <div class="flex justify-center pt-4">
                <Image
                  src="accueil/modification_tache.png"
                  width="500"
                  preview
                />
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </template>
    </Card>
  </div>
</template>

# Introduction
## Présentation de l'outil
Donecat est un gestionnaire de tâches open source développé avec Vue 3. Le but de Donecat est de vous permettre d’avoir votre propre système de gestion de tâches. Vous avez peur de confier vos données à une entreprise tierce ? Aucun souci : vous pouvez installer l’outil sur vos propres serveurs afin de garder un contrôle total sur vos données.

De plus, l’outil est open source sous [licence MIT](https://github.com/pierrebraem/Donecat-front/blob/main/LICENSE), ce qui signifie que vous pouvez le modifier à votre guise. Adaptez le code pour obtenir le système de gestion de tâches qui vous convient.

## Fonctionnement global de l'outil
L’outil fonctionne de la manière suivante :
- Tout d’abord, nous avons les équipes. Elles sont créées et gérées par un administrateur. Une équipe est composée d’un manager et de plusieurs développeurs. L’objectif est de permettre la structuration de vos équipes de développement pour les intégrer à des projets.
- Un projet est créé et géré par un manager. Il correspond à une liste de tâches associées.
- Enfin, nous avons les tâches. Elles sont créées et gérées par le manager et permettent de suivre l’avancement du projet.

# Gestion des équipes
La gestion d’une équipe est uniquement réservée aux administrateurs.

## Créer une équipe
En tant qu’administrateur, allez sur le tableau de bord. Vous verrez en haut à droite un bouton « Créer une équipe ».

Une fenêtre devrait s’ouvrir. À partir de là, vous devez entrer un nom, sélectionner un manager ainsi que les développeurs à intégrer dans l’équipe.

Pour sélectionner plusieurs développeurs, choisissez-en un dans la liste déroulante, puis cliquez sur le bouton « Ajouter un développeur » en bas à droite de la fenêtre. Une nouvelle liste déroulante apparaîtra. Répétez l’opération jusqu’à avoir ajouté tous les développeurs souhaités.

Si vous avez ajouté trop de listes déroulantes, cliquez sur l’icône de la poubelle pour en supprimer.

Une fois toutes les informations saisies, cliquez sur le bouton « Ajouter ». La fenêtre se fermera et vous verrez votre équipe apparaître dans le tableau de bord.

## Modifier une équipe
Vous souhaitez modifier une équipe ? Aucun problème. Cliquez sur l’icône en forme de crayon correspondant à l’équipe concernée. Une nouvelle fenêtre apparaîtra.

Vous pourrez modifier le nom, le manager ou la composition des développeurs.

Si vous souhaitez supprimer un développeur sans le remplacer, cliquez sur l’icône de la poubelle pour retirer la liste déroulante correspondante.

Après avoir effectué vos modifications, cliquez sur « Modifier ». La fenêtre se fermera et les informations seront mises à jour dans le tableau de bord.

## Supprimer une équipe
Pour supprimer une équipe, cliquez sur l’icône de la poubelle correspondante dans le tableau de bord.

**Attention : veillez à supprimer tous les projets et les tâches associés à cette équipe avant de la supprimer. La version actuelle de l’outil ne permet pas de supprimer automatiquement les projets et les tâches associés.**

# Gestion des projets
La gestion des projets est uniquement réservée aux managers.

## Créer un projet
En tant que manager, allez dans votre tableau de bord et cliquez sur « Créer un projet » en haut à droite de la page. Une nouvelle fenêtre s’ouvrira. Entrez les informations du projet et cliquez sur « Ajouter ».

Une fois le projet ajouté, il apparaîtra dans votre tableau de bord, sans graphique (chart), car aucune tâche n’a encore été créée.

## Modifier un projet
Pour modifier un projet, cliquez sur l’icône en forme de crayon en haut à droite du graphique correspondant. Une nouvelle fenêtre s’ouvrira. Modifiez les informations, puis cliquez sur « Modifier ». La fenêtre se fermera et les informations seront mises à jour.

## Supprimer un projet
Pour supprimer un projet, cliquez sur l’icône en forme de poubelle en haut à droite du graphique concerné. Une fenêtre de confirmation s’affichera : cliquez sur « Supprimer ».

**Attention : veillez à supprimer toutes les tâches associées au projet avant de le supprimer. La version actuelle de l’outil ne permet pas la suppression automatique des tâches associées.**

# Gestion des tâches
## Créer une nouvelle tâche
Seules les personnes ayant le rôle Manager peuvent créer des tâches dans les projets qui leur sont attribués.

Pour créer une tâche, allez sur la page « Liste des tâches », puis cliquez sur le bouton en haut à droite. Une fenêtre s’ouvrira. Entrez les informations nécessaires à la création de la tâche, puis cliquez sur « Ajouter ». La fenêtre se fermera, et la tâche apparaîtra dans le tableau du projet correspondant.

## Visualiser une tâche
Pour consulter les informations d’une tâche, pointez votre curseur sur une carte (la carte contient un résumé de la tâche : titre, nom du développeur, date de fin). La carte changera de couleur. Cliquez dessus : une fenêtre s’ouvrira avec toutes les informations détaillées de la tâche.

## Modifier une tâche
### En tant que manager
Ouvrez la fenêtre de consultation d’une tâche (voir « Visualiser une tâche »). Pointez votre curseur sur l’information que vous souhaitez modifier : le texte changera de couleur. Cliquez dessus, modifiez l’information, puis cliquez sur « Valider ». Les informations seront mises à jour dans le tableau du projet.

### En tant que développeur
En tant que développeur, vous ne pouvez modifier que le statut des tâches qui vous sont attribuées.

Ouvrez la fenêtre de consultation d’une tâche (voir « Visualiser une tâche »). Pointez votre curseur sur le statut : le texte changera de couleur. Cliquez dessus, modifiez le statut, puis cliquez sur « Valider ». Les informations seront mises à jour dans le tableau du projet.
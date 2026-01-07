# Donecat
Donecat est un gestionnaire de tâches open source développé avec Vue 3. Le but de Donecat est de vous permettre d’avoir votre propre système de gestion de tâches. Vous avez peur de confier vos données à une entreprise tierce ? Aucun souci : vous pouvez installer l’outil sur vos propres serveurs afin de garder un contrôle total sur vos données.

De plus, l’outil est open source sous [licence MIT](https://github.com/pierrebraem/Donecat-front/blob/main/LICENSE), ce qui signifie que vous pouvez le modifier à votre guise. Adaptez le code pour obtenir le système de gestion de tâches qui vous convient.

# Versions de Node recommandées
- 20.19.2 (/!\ La fin du support officiel de Node 20 est le 30 avril 2026)
- 20.19.6 (/!\ La fin du support officiel de Node 20 est le 30 avril 2026)
- 22.21.1

Vous pouvez télécharger les différentes versions de Node à [cette adresse](https://nodejs.org/fr/about/previous-releases).

# Documentation
Vous pouvez trouver une documentation utilisateur dans le dossier `documentation` :
- [Documentation utilisateur](https://github.com/pierrebraem/Donecat-front/blob/main/documentation/documentationUtilisateurs.md)

# Installation
Pour installer le projet en local, vous devez d'abord cloner le projet avec la commande suivante :
```
git clone https://github.com/pierrebraem/Donecat-front.git
```
Ensuite, allez sur le dossier du projet :
```
cd Donecat-front
```
Puis, installez les dépendances avec la commande suivante :
```
npm install
```

# Lancement de l'API
Dans un terminal, à la racine du projet, lancer la commande suivante pour démarrer l'API :
```
npm run launchapi
```

# Mise en place du fichier .env
A la racine du projet, vous trouverez un fichier `.env.sample`.

Copiez le contenu du fichier, toujours à la racine du projet, créez un fichier `.env`.

A l'intérieur du fichier `.env`, collez le contenu du fichier `.env.sample`.

Au lancement de l'API, une URL devrait s'afficher. Mettez cette URL dans la variable `VITE_API_URL`.

Exemple de ce que votre fichier `.env` devrait ressembler :
```
VITE_API_URL="http://example.com"
```

# Lancement du projet
Dans un autre terminal (ne fermez surtout pas le terminal où l'API est en cours d'exécution), toujours à la racine du projet, démarrez l’interface utilisateur avec la commande suivante :
```
npm run dev
```

# Comptes par défaut
Voici les adresses mails, les mots de passe et les rôles des comptes precréés :
```
email : pierre.braem@test.com
mot de passe : admin
rôle : Administrateur

email : martin.dupont@test.com
mot de passe : 123456
rôle : Manager

email : jean.rain@test.com
mot de passe : azerty
rôle : Développeur

email : dev1.dev1@test.com
mot de passe : qwerty
rôle : Développeur
```
# Roadmap pour la version 0.2.0
La version 0.2.0 est en cours de développement. Elle inclura les fonctionnalités suivantes :
- Un back-end séparé du front-end.
- La dockerisation du front.
- La gestion des sprints.
- La mise en place d’un système multilingue (français et anglais)
- Et bien plus encore...

En attendant, la version 0.1.X aura encore quelques implémentations de nouvelles fonctionalités, correction de bugs si il y a et maintenue.

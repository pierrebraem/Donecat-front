# Donecat
Donecat est un gestionnaire de tâches open source développé avec Vue 3. Le but de Donecat est de vous permettre d’avoir votre propre système de gestion de tâches. Vous avez peur de confier vos données à une entreprise tierce ? Aucun souci : vous pouvez installer l’outil sur vos propres serveurs afin de garder un contrôle total sur vos données.

De plus, l’outil est open source sous [licence MIT](https://github.com/pierrebraem/Donecat-front/blob/main/LICENSE), ce qui signifie que vous pouvez le modifier à votre guise. Adaptez le code pour obtenir le système de gestion de tâches qui vous convient.

# Version de Node conseillée à utiliser
La version de Node conseillée pour faire tourner le projet est la v20.19.2. Vous pouvez la télécharger à [cette adresse](https://nodejs.org/fr/about/previous-releases).

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
Si après l'installation vous avez une erreur `'husky' n'est pas reconnue comme une commande externe`, vous pouvez l'ignorer. Elle n'a pas d'impact sur l'installation.

Une fois l’installation terminée, lancez d'abord la version API de l’outil :
```
npm run launchapi
```
Dans un autre terminal, toujours à la racine du projet, démarrez l’interface utilisateur avec la commande suivante :
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

En attendant, la version 0.1.X restera maintenue en cas de bugs ou de mises à jour de dépendances. La branche de développement de cette version sera : `0.1.X`.

# <%= name %>

# Démarrer

Ce serveur d'application est conçu pour s'exécuter dans un conteneur Docker.

## Pré-requis

Pour contribuer au développement, vous devez avoir installé les logiciels suivants sur votre poste de travail :

- Docker & Docker Compose
- Node.js v20
- Visual Studio Code

## Configuration

Avant de pouvoir lancer l'application pour la première fois, vous devez définir la configuration de l'application à l'aide de variables d'environnement définies dans le fichier `.env`.

S'il n'existe pas encore, créez une copie du fichier `.env.example` appelée `.env`, puis renseignez les valeurs comme décrit ci-dessous :

| Variable     | Description                                                                               |
| ------------ | ----------------------------------------------------------------------------------------- |
| `NODE_ENV`   | Indique le mode d'optimisation de l'application. Doit être `development` ou `production`. |
| `SERVE_DOCS` | Si présent et `true`, expose la documentation Swagger de l'API à la racine du serveur.    |

## Construire l'image

Avant la toute première utilisation, vous devez construire l'image Docker de l'application :

```sh
docker compose build api
```

## Lancer le serveur

Assurez-vous d'avoir suivi les étapes précédentes, puis exécutez la commande suivante dans le répertoire project pour démarrer le conteneur :

```sh
docker compose up -d
```

Vous pourrez ensuite arrêter l'application avec

```sh
docker compose stop
```

Lorsqu'il est lancé, le serveur est disponible sur http://localhost:3000.

## Débogage

Vous pouvez inspecter l'exécution du serveur en mode pas-à-pas à l'aide du débogueur Node.js intégré à Visual Studio Code.

A tout moment lorsque le serveur est en cours d'exécution, vous pouvez lancer la configuration "Attach debugger" pour lancer la session de débogage (ou appuyer sur F5). Lorsque vous exécutez la requête que vous voulez déboguer, l'exécution s'arrêtera au niveau des points d'arrêt que vous avez placé dans le code.

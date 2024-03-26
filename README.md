## <a name="table">Table of Contents</a>

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Screens](#screens)
4. [Features](#features)
5. [Stockage](#stockage)
6. [Quick Start](#quick-start)

## <a name="introduction">Introduction</a>

Vous trouveverez ici les informations générales de notre projet comme les explications des différents écrans et fonctionnalités.

## <a name="tech-stack">Tech Stack</a>

- React Native
- Expo
- Expo Router
- Firebase

## <a name="screens"> Screens</a>

**Login** : Écran de connexion /inscription permettant à l'utilisateur de s'authentifier

**Home** :

- Écran principale de l'application affichant une liste d'évennements populaires
- Un clique sur un évennements permet d'accéder à l'écran de détail de l'évennement
- Un clique long sur un évennement, affiche sa description
- Un bouton "voir tous" permet d'accéder à l'écran recherche d'évennements
- Une barre de recherche permet d'accéder à l'écran recherche d'évennements en lancant une recherche avec le texte saisi

**Map** : Écran de permettant de visualiser les évennements sur une carte intéractive

**Profil** : Écran de de profil, affichant les informations sur l'utilisateur connecté ainsi que les informations concernant son parcours. L'utilisateur peut également se déconnecter via cet écran

**Détail événnemet** :

- Écran affichant les informations sur l'évennement (image, type d'animation)
- Onglet "A propos" affichant des informations générales sur l'événnement
- Onglet "Adresse" affichant des informations sur le lieu de l'événnement
- Onglet "Carte" affichant l'événnement sur une Map

## <a name="features"> Features</a>

**Recherche**: La fonction recherche permet de récupérer des événnements en foction de plusieurs critères comme le type d'animation (visite, spectacle, jeu etc...) ou la note.

**Carte intéractive**: L'écran Carte permet de récupérer et d'afficher les évennements proches de l'utilisateur

**Authentification**: L'application permmet de s'authentifier en utilisant un service Firebase d'authentification (email / mot de passe). Si l'utilisateur est connecté, une session encapsule l'application à l'aide de Session Provider. Il n'est pas possible d'acceder aux écrans principaux si on est pas authentifié.

**Noter un événnements**: Si l'utilisateur a le rôle "visitor" (Visiteur), il peut noter un évennements quand il est sur l'écran de détail. La note et le nombre de votes sont alors mis à jours en base de données.

**Remplissage d'un l'évennement**: Si l'utilisateur a le rôle "contributor" (Contributeur), il peut noter mettre à jour le taux de remplissage d'un évennements. Le remplissage de l'évennementsvotes est alors mis à jour en base de données.

**Ajout d'un évennement à un parcours**: Si l'utilisateur a le rôle "visitor" (Visiteur), il peut ajouter n évennements quand il est sur l'écran de détail. L'évennement est alors ajouter à la liste des évennements référencés dans la collection route dont le creatorId est l'id de l'utilisateur.

**Ajout d'un évennement à son calendrier**: Il est possible d'ajouter un évenement à son calendrier en cliquant sur le menu burger dans l'écran détail d'un évennement. Un clique sur la ligne "Ajouter au calendrier" ouvre une boîe de dialogue proposant différents horaires. Au clique sur un horaire, l'évennements est ajouté au calendrier de l'utilisateur.

**Réservation par téléphone**: Il est possible d'appeler pour réserver un évenement en cliquant sur le menu burger dans l'écran détail d'un évennement. Un clique sur la ligne "Appeler pour réserver" ouvre l'application téléphone du terminal avec le numéro de réservation

**Réservation par mail**: Il est possible d'envoyer un mail pour réserver un évenement en cliquant sur le menu burger dans l'écran détail d'un évennement. Un clique sur la ligne "Mail de réservation" ouvre l'application mail du terminal avec le numéro de réservation en spécifiant le destinataire ainsi que l'objet du mail

**Réservation par mail**: Il est possible de consulter le site internet d'un évenement en cliquant sur le menu burger dans l'écran détail d'un évennement. Un clique sur la ligne "Voir sur le site" ouvre le lien dans le navigateur

## <a name="stockage"> Stockage</a>

Utilisation d'une base de données Firestore pour gérer la persistence des données

- Collection events (évennements), users (utilisateur) et routes (parcours)
- Les données ont été insérées par un script (firestoreService.js) en ajoutant des valeurs aléatoires pour ajouter une note et un nombre de vote

## <a name="quick-start">Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Cloning the Repository**

```bash
git
cd
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

```bash
npx expo
```

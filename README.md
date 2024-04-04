## <a name="table">Table of Contents</a>

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Screens](#screens)
4. [Features](#features)
5. [Stockage](#stockage)
6. [Quick Start](#quick-start)

## <a name="introduction">Introduction</a>

Vous trouverez ici les informations générales de notre projet comme les explications des différents écrans et fonctionnalités.

## <a name="tech-stack">Tech Stack</a>

- React Native
- Expo
- Expo Router
- Firebase

## <a name="screens"> Screens</a>

**Login** : Écran de connexion/inscription permettant à l'utilisateur de s'authentifier

**Home** :

- Écran principale de l'application affichant une liste d'événements populaires
- Un clique sur un événements permet d'accéder à l'écran de détail de l'événement
- Un clique long sur un événement, affiche sa description
- Un bouton "voir tous" permet d'accéder à l'écran recherche d'événements
- Une barre de recherche permet d'accéder à l'écran recherche d'événements en lançant une recherche avec le texte saisi

**Map** :

- Écran de permettant de visualiser les événements sur une carte interactive
- Il est possible de recentrer la vue sur notre position actuel
- Il est possible d'actualiser la recherche pour afficher les événements proche de la région sélectionnée
- Un clique sur un marker permet d'afficher des informations sur l'événement et d'accéder à l'écran de détails
- Il est possible d'ouvrir l'itinéraire vers événement sélectionné dans google map


**Profil** : Écran de de profil, affichant les informations sur l'utilisateur connecté ainsi que les informations concernant son parcours. L'utilisateur peut également se déconnecter via cet écran

**Détail événement** :

- Écran affichant les informations sur l'événement (image, type d'animation)
- Onglet "A propos" affichant des informations générales sur l'événement
- Onglet "Adresse" affichant des informations sur le lieu de l'événement
- Onglet "Carte" affichant l'événement sur une Carte

**Détail parcours** :

- Écran affichant les informations sur un parcours (titre, description, liste des événements)
- Il est possible d'accéder aux détail d'un événement en cliquant dessus

## <a name="features"> Features</a>

**Recherche**: La fonction recherche permet de récupérer des événements en fonction de plusieurs critères comme le type d'animation (visite, spectacle, jeu etc...) ou la note.

**Carte interactive**: L'écran Carte permet de récupérer et d'afficher les événements proches de l'utilisateur

**Authentification**: L'application permet de s'authentifier en utilisant un service Firebase d'authentification (email / mot de passe). Si l'utilisateur est connecté, une session encapsule l'application à l'aide de Session Provider. Il n'est pas possible d'accéder aux écrans principaux si on est pas authentifié.

**Noter un événements**: Si l'utilisateur a le rôle "visitor" (Visiteur), il peut noter un événements quand il est sur l'écran de détail. La note et le nombre de votes sont alors mis à jours en base de données.

**Remplissage d'un l'événement**: Si l'utilisateur a le rôle "contributor" (Contributeur), il peut mettre à jour le taux de remplissage d'un événement. Le remplissage de l'événement est alors mis à jour en base de données.

**Ajout d'un événement à un parcours**: Si l'utilisateur a le rôle "visitor" (Visiteur), il peut ajouter un événement quand il est sur l'écran de détail. L'événement est alors ajouter à la liste des événements référencés dans la collection route dont le creatorId est l'id de l'utilisateur.

**Ajout d'un événement à son calendrier**: Il est possible d'ajouter un événement à son calendrier en cliquant sur le menu burger dans l'écran détail d'un événement. Un clique sur la ligne "Ajouter au calendrier" ouvre une boîte de dialogue proposant différents horaires. Au clique sur un horaire, l'événement est ajouté au calendrier de l'utilisateur.

**Réservation par téléphone**: Il est possible d'appeler pour réserver un événement en cliquant sur le menu burger dans l'écran détail d'un événement. Un clique sur la ligne "Appeler pour réserver" ouvre l'application téléphone du terminal avec le numéro de réservation

**Réservation par mail**: Il est possible d'envoyer un mail pour réserver un événement en cliquant sur le menu burger dans l'écran détail d'un événement. Un clique sur la ligne "Mail de réservation" ouvre l'application mail du terminal avec le numéro de réservation en spécifiant le destinataire ainsi que l'objet du mail

**Réservation par mail**: Il est possible de consulter le site internet d'un événement en cliquant sur le menu burger dans l'écran détail d'un événement. Un clique sur la ligne "Voir sur le site" ouvre le lien dans le navigateur

## <a name="stockage"> Stockage</a>

Utilisation d'une base de données Firestore pour gérer la persistance des données

- Collection events (événements), users (utilisateur) et routes (parcours)
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

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

**Login** :
- Écran de connexion/inscription permettant à l'utilisateur de s'authentifier

**Home** :

- Écran principal de l'application affichant une liste d'événements et de parcours populaires
- Un clique sur un événements permet d'accéder à l'écran de détail de l'événement
- Un clique sur un parcours permet d'accéder à l'écran de détail du parcours
- Un clique long sur un événement, affiche sa description
- Un bouton "voir tous" permet d'accéder à l'écran recherche d'événements
- Une barre de recherche permet d'accéder à l'écran recherche d'événements ~~en lançant une recherche avec le texte saisi~~

**Map** :

- Écran permettant de visualiser les événements sur une carte interactive

**Profil** :
- Écran de  profil, affichant les informations de l'utilisateur connecté ainsi que les informations concernant son parcours.
- L'utilisateur peut se déconnecter via cet écran

**Détail événement** :

- Écran affichant les informations sur l'événement (image, type d'animation...)
- Onglet "A propos" affichant des informations générales sur l'événement
- Onglet "Adresse" affichant des informations sur le lieu de l'événement
- Onglet "Carte" affichant l'événement sur une Carte
- Bouton "Noter l'événement" ou "Remplissage" en fonction du rôle de l'utilisateur pour respectivement noter ou définir le taux de remplissage de l'événement
- Bouton "+" ou "-" pour ajouter ~~ou supprimer~~ l'événement à son parcours
- Burger Menu permettant d'effectuer certaines action tel que réserver par téléphone ou ajouter l'événement à son calendrier

**Détail parcours** :

- Écran affichant les informations sur un parcours (titre, description, liste des événements)
- Il est possible d'accéder aux détails d'un événement en cliquant dessus

## <a name="features"> Features</a>

**Recherche**: La fonction recherche permet de récupérer des événements en fonction de plusieurs critères comme le type d'animation (visite, spectacle, jeu etc...) ou d'une note minimale.

**Carte interactive**:
- l'Écran permettant de visualiser les événements sur une carte interactive
- Il est possible de recentrer la vue sur notre position actuel
- Il est possible d'actualiser la recherche pour afficher les événements proche de la région sélectionnée
- Un clique sur un marker permet d'afficher des informations sur l'événement et d'accéder à l'écran de détails
- Il est possible d'ouvrir l'itinéraire vers événement sélectionné dans google map

**Authentification**: L'application permet de s'authentifier en utilisant un service Firebase d'authentification (email / mot de passe). Si l'utilisateur est connecté, une session encapsule l'application à l'aide de Session Provider. Il n'est pas possible d'accéder aux écrans principaux si on est pas authentifié.

**Noter un événements**: Si l'utilisateur a le rôle "visitor" (Visiteur), il peut noter un événements quand il est sur l'écran de détail. La note et le nombre de votes sont alors mis à jours en base de données.

**Remplissage d'un l'événement**: Si l'utilisateur a le rôle "contributor" (Contributeur), il peut mettre à jour le taux de remplissage d'un événement. Le remplissage de l'événement est alors mis à jour en base de données.

**Ajout d'un événement à un parcours**: Si l'utilisateur a le rôle "visitor" (Visiteur), il peut ajouter un événement quand il est sur l'écran de détail. L'événement est alors ajouter à la liste des événements référencés dans la collection route dont le creatorId est l'id de l'utilisateur.

**Ajout d'un événement à son calendrier**: Il est possible d'ajouter un événement à son calendrier en cliquant sur le menu burger dans l'écran détail d'un événement. Un clique sur la ligne "Ajouter au calendrier" ouvre une boîte de dialogue proposant différents horaires. Au clique sur un horaire, l'événement est ajouté au calendrier de l'utilisateur.

**Réservation par téléphone**: Il est possible d'appeler pour réserver un événement en cliquant sur le menu burger dans l'écran détail d'un événement. Un clique sur la ligne "Appeler pour réserver" ouvre l'application téléphone du terminal avec le numéro de réservation

**Réservation par mail**: Il est possible d'envoyer un mail pour réserver un événement en cliquant sur le menu burger dans l'écran détail d'un événement. Un clique sur la ligne "Mail de réservation" ouvre l'application mail du terminal avec le numéro de réservation en spécifiant le destinataire ainsi que l'objet du mail

**Visite du site**: Il est possible de consulter le site internet d'un événement en cliquant sur le menu burger dans l'écran détail d'un événement. Un clique sur la ligne "Voir sur le site" ouvre le lien dans le navigateur

## <a name="stockage">Architecture</a>

- le dossier app/(app) contient les fichiers  JavaScript sources du projet accessible seulement si la session est valide
Utilisation du local storage pour persister certaines données comme les informations sur l'utilisateur connecté
- Utilisation de la navigation par layout avec Expo Router
- Le dossier (tabs) correspond par exemple aux écrans (HomeScreen, Map et Profile) navigable par la tabBar

## <a name="stockage">Stockage</a>

Utilisation d'une base de données Firestore pour gérer la persistance des données

- Collection events (événements), users (utilisateur) et routes (parcours)
- Les données ont été insérées par un script (firestoreService.js)
- Création d'index pour améliorer la performance des requêtes de recherche
- Ajout d'un champ "geohash", valeur hasher de la géolocalisation permettant de faire des requêtes géospatiales
- Ajout de valeurs aléatoires pour les nouveaux champs note (rating), nombre de vote (votes) et remplissage (filling)

## <a name="quick-start">Quick Start</a>

Suivre ces étapes pour installer le projet sur votre machine

**Cloner le Repository**

```bash
git
cd
```

**Installation**

Installer les dépendances npm:

```bash
npm install
```

```bash
npx expo
```

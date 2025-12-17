# Challenge Authentication

## 1. Formulaire de connexion

- Créé un state pour stocker le token d'authentification, un pour stocker le pseudo et un autre pour les éventuels messages d'erreur.

- A la validation du formulaire de connexion, envoie une requête POST à l'URL `/login` avec les données du formulaire:

  - Si tu reçois un code de statut HTTP 200, enregistre le token et le pseudo dans un state
  - Si tu reçois un code de statut HTTP 401, enregistre un message d'erreur dans un state

- Utilise ces états pour afficher le pseudo de l'utilisateur connecté (+ un bouton de déconnexion) ou le message d'erreur si nécessaire.

- Au click sur le bouton de déconnexion, supprime le token et le pseudo du state.

## 2. Authentification des requêtes

- Créé une route `/favorites` mais conditionne son rendu à la présence du token d'authentification dans le state.

- Créé un nouveau lien dans le menu de navigation qui pointe vers cette route `/favorites`. Ce lien ne doit être visible que si l'utilisateur est connecté (c'est-à-dire si le token d'authentification est présent dans le state).

- Cette route affiche un nouveau composant `Favorites` qui affiche la liste des favoris de l'utilisateur connecté.
- Dans le composant `Favorites`, envoie une requête GET à l'URL `/favorites` avec le token d'authentification dans les headers:
  - Si tu reçois un code de statut HTTP 200, affiche la liste des favoris
  - Si tu reçois un code de statut HTTP 401, redirige l'utilisateur vers la page de connexion

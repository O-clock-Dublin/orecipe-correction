# Test de l'application O'Recipes avec authentification

## ✅ Fonctionnalités implémentées

### 1. Système d'authentification complet
- **Formulaire de connexion dédié** : Page `/login` avec interface moderne
- **Gestion des états** : Token, username et messages d'erreur stockés dans le contexte React
- **Persistance** : Token et username sauvegardés dans localStorage
- **Validation** : Gestion des erreurs 401 avec messages appropriés

### 2. Protection des routes
- **Route `/favorites` protégée** : Accessible uniquement aux utilisateurs connectés
- **Redirection automatique** : Vers `/login` si non authentifié
- **Composant ProtectedRoute** : Réutilisable pour d'autres routes protégées

### 3. Interface utilisateur
- **Header dynamique** : 
  - Affiche "Se connecter" si non connecté
  - Affiche "Bienvenue [pseudo]" + bouton "Déconnexion" si connecté
- **Navigation conditionnelle** : 
  - Lien "Favoris" visible uniquement si connecté
  - Styles modernes et intuitifs

### 4. Gestion des favoris
- **API sécurisée** : Requêtes avec token Bearer dans les headers
- **Gestion d'erreurs** : Déconnexion automatique si token invalide (401)
- **Interface** : Liste des recettes favorites avec liens vers les détails

## 🚀 Comment tester l'application

### Démarrer l'application
\`\`\`bash
npm run dev
\`\`\`

### Scénarios de test

#### 1. Navigation sans authentification
1. Ouvrir http://localhost:5173/
2. ✅ Vérifier que le header affiche "Se connecter"
3. ✅ Vérifier que le lien "Favoris" n'est PAS visible dans le menu
4. ✅ Tenter d'accéder à `/favorites` → Redirection vers `/login`

#### 2. Processus de connexion
1. Cliquer sur "Se connecter" ou aller sur `/login`
2. ✅ Utiliser les identifiants de test :
   - Email: `test@example.com` (ou selon l'API)
   - Password: `password` (ou selon l'API)
3. ✅ Vérifier la redirection vers l'accueil après connexion
4. ✅ Vérifier que le header affiche maintenant "Bienvenue [pseudo]"

#### 3. Navigation avec authentification
1. ✅ Vérifier que le lien "Favoris" est maintenant visible
2. ✅ Cliquer sur "Favoris" → Accès autorisé à la page
3. ✅ Vérifier l'affichage de la liste des favoris

#### 4. Gestion de session
1. ✅ Rafraîchir la page → L'utilisateur reste connecté (localStorage)
2. ✅ Cliquer sur "Déconnexion" → Retour à l'état non connecté
3. ✅ Vérifier que `/favorites` redirige vers `/login` après déconnexion

#### 5. Gestion des erreurs
1. ✅ Tenter une connexion avec de mauvais identifiants
2. ✅ Vérifier l'affichage du message d'erreur
3. ✅ Si le token expire, vérifier la déconnexion automatique

## 📁 Structure du code

### Contexte d'authentification
- `src/context/userContext.tsx` : Contexte React pour l'état global
- États gérés : `token`, `username`, `errorMessage`

### Composants
- `src/component/header/Header.tsx` : Header avec login/logout
- `src/component/navbar/Navbar.tsx` : Navigation conditionnelle
- `src/component/ProtectedRoute.tsx` : Protection des routes

### Pages
- `src/page/login/LoginPage.tsx` : Page de connexion dédiée
- `src/page/favorites/FavoritesPage.tsx` : Page des favoris protégée

### Fonctionnalités clés
- ✅ Authentification POST `/login`
- ✅ Récupération favoris GET `/favorites` avec Bearer token
- ✅ Gestion erreurs HTTP 401
- ✅ Protection des routes
- ✅ Persistance localStorage
- ✅ Interface utilisateur moderne

## 🔧 API attendue

L'application s'attend à ces endpoints :

### POST `/login`
\`\`\`json
// Request
{
  "email": "user@example.com",
  "password": "password"
}

// Response 200
{
  "token": "jwt_token_here",
  "pseudo": "username"
}

// Response 401
{
  "message": "Invalid credentials"
}
\`\`\`

### GET `/favorites`
\`\`\`
Headers: Authorization: Bearer <token>

// Response 200
{
  "favorites": [
    {
      "id": 1,
      "title": "Recipe Name",
      "thumbnail": "image_url",
      "difficulty": "Easy",
      "slug": "recipe-slug"
    }
  ]
}

// Response 401 → Déconnexion automatique
\`\`\`

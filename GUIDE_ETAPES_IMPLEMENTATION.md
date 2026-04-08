# Guide d'etapes d'implementation

Ce document sert de carte rapide du projet: ou se trouvent les couches techniques, comment la data circule, et dans quel ordre implementer les prochains modules.

## 1) Architecture actuelle (vue d'ensemble)

- Entree app: `src/main.jsx`
- Routeur principal: `src/AppRouter.jsx`
- Contexte auth: `src/context/AuthContext.jsx`
- Page principale metier: `src/pages/FonctionnairePage.jsx`
- API client: `src/api/axiosInstance.js`
- Endpoints DAP: `src/api/endpoints.js`
- Services metier: `src/services/fonctionnaireservice.js`
- Mappers/modeles: `src/models/fonctionnaire/models.model.js`

## 2) Ou sont les couches

### `Views` (presentation UI)

- Pages:
  - `src/pages/FonctionnairePage.jsx`
  - `src/pages/Account/Login.jsx`
  - `src/pages/Account/FirstActivation.jsx`
  - `src/pages/Account/ForgotPassword.jsx`
- Composants layout:
  - `src/layouts/GuestLayout.jsx`
  - `src/layouts/AuthenticatedLayout.jsx`
  - `src/components/DAP/Layout/DAPLayout.jsx`
  - `src/components/DAP/Layout/SideCard/SideCard.jsx`
- Composants detail (sections metier):
  - `src/components/DAP/details/*`

### `Logic Metier` (orchestration front)

- Navigation par section: `src/pages/FonctionnairePage.jsx`
- Etat auth/login/logout: `src/context/AuthContext.jsx`
- Etat auth reducer: `src/reducers/AuthReducer.js`
- Hook metier (agregation de donnees): `src/hooks/useFonctionnaire.js`

### `Services` (acces API)

- Service principal DAP: `src/services/fonctionnaireservice.js`
- Service auth: `src/services/authService.js`
- Wrappers compat:
  - `src/services/fonctionnaire.service.js`
  - `src/services/axiosInstance.js` (legacy)

### `Modeles / Mappers`

- Mappers centralises:
  - `src/models/fonctionnaire/models.model.js`
- Wrappers compat:
  - `src/models/fonctionnaire.model.js`
  - `src/models/fonc.mapper.js`

### `Infra / Config`

- Axios + interceptors: `src/api/axiosInstance.js`
- Normalisation reponses API: `src/utils/apihelper.js`
- Endpoints: `src/api/endpoints.js`
- Dev local (bypass auth + fonct id): `src/config/devLocal.js`
- Theme RTL arabe: `src/themes/main.js`
- Alias `@` Vite: `vite.config.js`
- URL backend local: `.env.local`

## 3) Flux de donnees (de l'API vers l'ecran)

1. Vue appelle un service (`getInfo...`) dans `src/services/fonctionnaireservice.js`.
2. Service utilise `getRequest` (`src/utils/apihelper.js`).
3. `getRequest` appelle Axios (`src/api/axiosInstance.js`).
4. Reponse brute backend est normalisee (`normalizeList` / `normalizeObject`).
5. Donnees sont transformees par un mapper (`src/models/fonctionnaire/models.model.js`).
6. Composant affiche les rows/objets normalises.

## 4) Etat d'implementation actuel

- Routing:
  - Route protegee en place via `ProtectedRoute` dans `src/AppRouter.jsx`.
  - Route guest en place via `GuestRoute`.
- Auth:
  - Mode dev local actif (bypass) via `src/config/devLocal.js`.
- API:
  - Base URL lue depuis `.env.local` (`VITE_API_BASE_URL`).
  - Fallback URL defini dans `src/api/axiosInstance.js`.
- DAP:
  - Sections UI presentes dans `src/components/DAP/details`.
  - Services connectes aux endpoints DAP.

## 5) Convention recommandee pour ajouter un nouveau module

Exemple: module "Sanctions".

1. Ajouter endpoint dans `src/api/endpoints.js`.
2. Ajouter methode service dans `src/services/fonctionnaireservice.js`.
3. Ajouter mapper dans `src/models/fonctionnaire/models.model.js`.
4. Creer composant vue dans `src/components/DAP/details/Sanctions/Sanctions.jsx`.
5. Ajouter entree menu dans `src/components/DAP/Layout/SideCard/navData.js`.
6. Brancher le rendu dans `src/pages/FonctionnairePage.jsx` (switch case).
7. Tester en local avec `LOCAL_FONCT_ID` dans `src/config/devLocal.js`.

## 6) Plan d'etapes d'implementation (pratique)

### Etape 1 - Stabiliser la base

- Unifier les noms de fichiers (eviter doublons `service` vs `service.js`).
- Supprimer les imports legacy quand migration terminee.
- Ajouter un ecran d'erreur API user-friendly (pas seulement `console.error`).

### Etape 2 - Fiabiliser la donnee

- Centraliser l'ID fonctionnaire actif (contexte unique au lieu de valeurs hardcodees).
- Verifier chaque mapper face aux payloads reels backend.
- Ajouter valeurs par defaut pour champs nulls.

### Etape 3 - Industrialiser les vues

- Standardiser les tables (loader, empty state, erreur) avec composants communs.
- Ajouter pagination/filtre si endpoints volumineux.
- Extraire les textes en constantes i18n si besoin.

### Etape 4 - Repasser du mode dev au mode reel

- Mettre `BYPASS_AUTH_LOCAL` a `false` dans `src/config/devLocal.js`.
- Reactiver auth backend complete.
- Valider les droits et routes protegees.

## 7) Checklist rapide avant livraison

- `npm run build` passe sans erreurs.
- Toutes les sections SideCard chargent des donnees.
- RTL et arabe corrects sur toutes les pages.
- Erreurs API affichees proprement a l'utilisateur.
- Aucun import mort/legacy non utilise.


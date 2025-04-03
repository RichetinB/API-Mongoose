# API Mongoose - Gestion des profils

## Routes de l'API

- GET /profiles : Récupérer tous les profils

- GET /profiles/:id : Récupérer un profil par ID

- POST /profiles : Créer un nouveau profil

- PUT /profiles/:id : Mettre à jour un profil par ID

- DELETE /profiles/:id : Supprimer un profil par ID (Soft-Delete)

- POST /profiles/:id/experience : Ajouter une expérience à un profil

- DELETE /profiles/:id/experience/:exp : Supprimer une expérience d'un profil

- POST /profiles/:id/skills : Ajouter une compétence à un profil

- DELETE /profiles/:id/skills/:skill : Supprimer une compétence d'un profil

- PUT /profiles/:id/information : Mettre à jour les informations d'un profil

- POST /profiles/:id/friends : Ajouter un ami à un profil

- DELETE /profiles/:id/friends/:friendId : Supprimer un ami d'un profil

## Lancer l'application

- 1 Construire et démarrer l'application avec Docker :

```
docker-compose up --build
```

- 2 Accéder à l'API :

  • URL : http://localhost:5000/

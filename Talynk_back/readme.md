# Structure du Projet - Plateforme de Recrutement

## 📁 Architecture des Dossiers

```
recruitment-platform/
│
├── 📂 controllers/
│   ├── authController.js          # Gestion authentification
│   ├── cvController.js             # Gestion des CVs
│   ├── jobController.js            # Gestion des offres d'emploi
│   ├── applicationController.js    # Gestion des candidatures
│   └── interviewController.js      # Gestion des entretiens
│
├── 📂 middleware/
│   ├── auth.js                     # Middleware d'authentification JWT
│   ├── validation.js               # Validation des données
│   └── errorHandler.js             # Gestion des erreurs
│
├── 📂 models/
│   └── index.js                    # Modèles MongoDB (fourni)
│
├── 📂 routes/
│   ├── index.js                    # Routes principales
│   ├── authRoutes.js               # Routes authentification
│   ├── cvRoutes.js                 # Routes CVs
│   ├── jobRoutes.js                # Routes jobs
│   ├── applicationRoutes.js        # Routes candidatures
│   └── interviewRoutes.js          # Routes entretiens
│
├── 📂 config/
│   └── database.js                 # Configuration MongoDB
│
├── 📂 utils/
│   ├── emailService.js             # Service d'envoi d'emails
│   └── videoService.js             # Intégration vidéo (Zoom/WebRTC)
│
├── .env                    # Variables d'environnement
├── .gitignore
├── app.js                          # Point d'entrée de l'application
├── package.json
└── README.md
```

## 🚀 Installation et Démarrage

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer les variables d'environnement
```bash

# Modifier .env avec vos configurations
```

### 3. Démarrer MongoDB
```bash
# Avec Docker
docker run -d -p :27017 --name mongodb mongo:latest

# Ou localement
mongod
```
url  :  [http//:localhost:5000](http://localhost:5000/)
### 4. Démarrer le serveur
```bash
# Mode développement
npm run dev

# Mode production

```

## 📋 Routes API Disponibles

### **Authentification** (`/api/auth`)
- `POST /register` - Inscription
- `POST /login` - Connexion
- `GET /profile` - Profil utilisateur (protégé)

### **CVs** (`/api/cvs`)
- `POST /` - Créer un CV
- `GET /` - Liste des CVs de l'utilisateur
- `GET /:id` - Détails d'un CV
- `PUT /:id` - Modifier un CV
- `DELETE /:id` - Supprimer un CV

### **Jobs** (`/api/jobs`)
- `GET /` - Liste des offres (public)
- `GET /:id` - Détails d'une offre (public)
- `POST /` - Créer une offre (RH)
- `PUT /:id` - Modifier une offre (RH)
- `DELETE /:id` - Supprimer une offre (RH)

### **Candidatures** (`/api/applications`)
- `POST /` - Postuler à un job
- `GET /` - Mes candidatures
- `GET /:id` - Détails d'une candidature
- `GET /job/:jobId` - Candidatures pour un job (RH)
- `PUT /:id/status` - Modifier le statut (RH)
- `DELETE /:id` - Annuler une candidature

### **Entretiens** (`/api/interviews`)
- `POST /` - Créer une session d'entretien
- `GET /` - Mes sessions
- `GET /stats` - Statistiques des entretiens
- `GET /:id` - Détails d'une session
- `PUT /:id` - Mettre à jour une session
- `POST /:id/response` - Ajouter une réponse
- `DELETE /:id` - Supprimer une session

## 🔐 Authentification

Toutes les routes protégées nécessitent un token JWT dans le header :
```
Authorization: Bearer <votre_token_jwt>
```

## 📊 Exemples d'utilisation

### Inscription
```bash
POST /api/auth/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe"
}
```

### Créer un CV
```bash
POST /api/cvs
Authorization: Bearer <token>
{
  "title": "CV Développeur Full-Stack",
  "language": "fr",
  "content": {
    "experience": [...],
    "education": [...],
    "skills": [...]
  }
}
```
### Créer un job
```bash
POST /api/jobs
Authorization: Bearer <token>
{
  "title": "Développeur Full Stack JavaScript",
  "company": "Tech Solutions SARL",
  "description": "Nous recherchons un développeur full stack passionné pour rejoindre notre équipe dynamique. Vous serez responsable du développement et de la maintenance d'applications web modernes.",
  "requirements": [
    "Diplôme en informatique ou équivalent",
    "3+ années d'expérience en développement JavaScript",
    "Maîtrise de React.js et Node.js",
    "Expérience avec les bases de données MongoDB et SQL",
    "Connaissance des pratiques DevOps et CI/CD"
  ],
  "responsibilities": [
    "Développer de nouvelles fonctionnalités front-end et back-end",
    "Collaborer avec l'équipe design pour créer des interfaces utilisateur optimisées",
    "Participer aux revues de code et aux tests unitaires",
    "Résoudre les bugs et améliorer les performances des applications"
  ],
  "skills": [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Express.js",
    "Git",
    "Docker"
  ],
  "location": "Casablanca, Maroc",
  "salary_range": {
    "min": 15000,
    "max": 25000,
    "currency": "MAD"
  },
  "employment_type": "CDI",
  "experience_level": "Intermediaire",
  "education_level": "Bac+4",
  "remote_work": true,
  "contact_email": "rh@techsolutions.ma",
  "application_deadline": "2024-12-31T23:59:59.000Z",
  "category": "Développement",
  "tags": ["javascript", "react", "nodejs", "fullstack", "remote"],
  "benefits": [
    "Assurance maladie",
    "Formation continue",
    "Télétravail partiel",
    "Ticket restaurant",
    "Événements d'entreprise"
  ]
}
```
### Postuler à un job
```bash
POST /api/applications
Authorization: Bearer <token>
{
  "job_id": "65abc123...",
  "cv_id": "65def456...",
  "notes": "Je suis très intéressé par ce poste"
}
```

### Créer une session d'entretien
```bash
POST /api/interviews
Authorization: Bearer <token>
{
  "job_title": "Développeur Full-Stack",
  "questions": [
    {
      "id": 1,
      "text": "Parlez-moi de vous",
      "duration": 120
    }
  ]
}
```

## 🛠️ Fonctionnalités à Implémenter

### Phase 1 ✅
- [x] Authentification utilisateur
- [x] Gestion des CVs
- [x] Gestion des offres d'emploi
- [x] Système de candidature
- [x] Sessions d'entretien

### Phase 2 (À venir)
- [ ] Intégration vidéo pour entretiens en ligne (Zoom/WebRTC)
- [ ] Notifications par email
- [ ] Analyse IA des réponses d'entretien
- [ ] Système de notation automatique
- [ ] Dashboard RH
- [ ] Matching CV/Job avec IA
- [ ] Calendrier d'entretiens
- [ ] Messagerie intégrée

## 🎯 Intégration Vidéo pour Entretiens

Pour les entretiens en ligne, vous pouvez intégrer :

### Option 1: Zoom
```javascript
// utils/videoService.js
const zoom = require('@zoom/videosdk');
// Configuration et création de meetings
```

### Option 2: WebRTC (Agora, Daily.co)
```javascript
// utils/videoService.js
const AgoraRTC = require('agora-rtc-sdk-ng');
// Configuration WebRTC
```

### Option 3: Jitsi Meet (Open Source)
```javascript
// Intégration iframe Jitsi
const meetingUrl = `https://meet.jit.si/${roomName}`;
```

## 📝 Notes Importantes

1. **Sécurité** : Changez toujours `JWT_SECRET` en production
2. **Validation** : Toutes les routes utilisent express-validator
3. **Erreurs** : Gestion centralisée des erreurs
4. **MongoDB** : Index créés pour optimiser les requêtes
5. **CORS** : Configuré pour accepter les requêtes du frontend

## 🤝 Contribution

Pour contribuer au projet :
1. Créer une branche : `git checkout -b feature/ma-fonctionnalite`
2. Commit : `git commit -m 'Ajout de ma fonctionnalité'`
3. Push : `git push origin feature/ma-fonctionnalite`
4. Créer une Pull Request
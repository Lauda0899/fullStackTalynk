 const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const routes = require('./src/routes');
const { notFound, errorHandler } = require('./src/middleware/errorHandler');

const app = express();

// Middleware de sécurité
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080'||'*/*'||'http://localhost:8081',
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api', routes);

// Route de base
app.get('/', (req, res) => {
  res.json({
    message: 'API de Recrutement en Ligne',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      cvs: '/api/cvs',
      jobs: '/api/jobs',
      applications: '/api/applications',
      interviews: '/api/interviews'
    }
  });
});

// Gestion des erreurs
app.use(notFound);
app.use(errorHandler);

// Connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://guirate:guirate@cluster0.yscpv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connecté à MongoDB');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    process.exit(1);
  }
};

// Démarrage du serveur
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
      console.log(`📡 Environnement: ${process.env.NODE_ENV || 'development'}`);
    });
  });
}

module.exports = app;
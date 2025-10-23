const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Inscription
exports.register = async (req, res) => {
  try {
    const { username, email, password, first_name, last_name } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'Un utilisateur avec cet email ou username existe déjà' 
      });
    }

    // Hasher le mot de passe
    const password_hash = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = new User({
      username,
      email,
      password_hash,
      first_name,
      last_name
    });

    await user.save();

    // Générer le token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Inscription réussie',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Générer le token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
};

// Profil utilisateur
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password_hash');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
  }
};
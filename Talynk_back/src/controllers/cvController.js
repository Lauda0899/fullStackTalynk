const { CV } = require('../models');

// Créer un CV
exports.createCV = async (req, res) => {
  try {
    const { title, language, content } = req.body;

    const cv = new CV({
      user_id: req.userId,
      title,
      language: language || 'en',
      content
    });

    await cv.save();

    res.status(201).json({
      message: 'CV créé avec succès',
      cv
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du CV' });
  }
};

// Récupérer tous les CVs de l'utilisateur
exports.getUserCVs = async (req, res) => {
  try {
    const cvs = await CV.find({ user_id: req.userId }).sort({ created_at: -1 });
    res.json({ cvs, count: cvs.length });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des CVs' });
  }
};

// Récupérer un CV spécifique
exports.getCVById = async (req, res) => {
  try {
    const cv = await CV.findOne({
      _id: req.params.id,
      user_id: req.userId
    });

    if (!cv) {
      return res.status(404).json({ error: 'CV non trouvé' });
    }

    res.json({ cv });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du CV' });
  }
};

// Mettre à jour un CV
exports.updateCV = async (req, res) => {
  try {
    const { title, language, content } = req.body;

    const cv = await CV.findOneAndUpdate(
      { _id: req.params.id, user_id: req.userId },
      { 
        title, 
        language, 
        content,
        updated_at: Date.now()
      },
      { new: true }
    );

    if (!cv) {
      return res.status(404).json({ error: 'CV non trouvé' });
    }

    res.json({
      message: 'CV mis à jour avec succès',
      cv
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du CV' });
  }
};

// Supprimer un CV
exports.deleteCV = async (req, res) => {
  try {
    const cv = await CV.findOneAndDelete({
      _id: req.params.id,
      user_id: req.userId
    });

    if (!cv) {
      return res.status(404).json({ error: 'CV non trouvé' });
    }

    res.json({ message: 'CV supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du CV' });
  }
};
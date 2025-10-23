const { InterviewSession } = require('../models');

// Créer une session d'entretien
exports.createSession = async (req, res) => {
  try {
    const { job_title, questions } = req.body;

    const session = new InterviewSession({
      user_id: req.userId,
      job_title,
      questions: questions || []
    });

    await session.save();

    res.status(201).json({
      message: 'Session d\'entretien créée',
      session
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la création de la session' 
    });
  }
};

// Récupérer toutes les sessions de l'utilisateur
exports.getUserSessions = async (req, res) => {
  try {
    const sessions = await InterviewSession.find({ user_id: req.userId })
      .sort({ created_at: -1 });

    res.json({ 
      sessions,
      count: sessions.length 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des sessions' 
    });
  }
};

// Récupérer une session spécifique
exports.getSessionById = async (req, res) => {
  try {
    const session = await InterviewSession.findOne({
      _id: req.params.id,
      user_id: req.userId
    });

    if (!session) {
      return res.status(404).json({ error: 'Session non trouvée' });
    }

    res.json({ session });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la récupération de la session' 
    });
  }
};

// Mettre à jour une session (ajouter réponses, scores)
exports.updateSession = async (req, res) => {
  try {
    const { 
      responses, 
      analysis, 
      confidence_score, 
      speech_score, 
      expression_score 
    } = req.body;

    const updateData = {};
    if (responses) updateData.responses = responses;
    if (analysis) updateData.analysis = analysis;
    if (confidence_score !== undefined) updateData.confidence_score = confidence_score;
    if (speech_score !== undefined) updateData.speech_score = speech_score;
    if (expression_score !== undefined) updateData.expression_score = expression_score;

    const session = await InterviewSession.findOneAndUpdate(
      { _id: req.params.id, user_id: req.userId },
      updateData,
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ error: 'Session non trouvée' });
    }

    res.json({
      message: 'Session mise à jour',
      session
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la mise à jour de la session' 
    });
  }
};

// Ajouter une réponse à une session
exports.addResponse = async (req, res) => {
  try {
    const { question_id, response_text, response_video_url } = req.body;

    const session = await InterviewSession.findOne({
      _id: req.params.id,
      user_id: req.userId
    });

    if (!session) {
      return res.status(404).json({ error: 'Session non trouvée' });
    }

    session.responses.push({
      question_id,
      response_text,
      response_video_url,
      answered_at: new Date()
    });

    await session.save();

    res.json({
      message: 'Réponse ajoutée',
      session
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de l\'ajout de la réponse' 
    });
  }
};

// Supprimer une session
exports.deleteSession = async (req, res) => {
  try {
    const session = await InterviewSession.findOneAndDelete({
      _id: req.params.id,
      user_id: req.userId
    });

    if (!session) {
      return res.status(404).json({ error: 'Session non trouvée' });
    }

    res.json({ message: 'Session supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la suppression de la session' 
    });
  }
};

// Récupérer les statistiques des entretiens
exports.getUserStats = async (req, res) => {
  try {
    const sessions = await InterviewSession.find({ user_id: req.userId });

    const stats = {
      total_sessions: sessions.length,
      avg_confidence_score: 0,
      avg_speech_score: 0,
      avg_expression_score: 0
    };

    if (sessions.length > 0) {
      const validSessions = sessions.filter(s => 
        s.confidence_score !== undefined && 
        s.speech_score !== undefined && 
        s.expression_score !== undefined
      );

      if (validSessions.length > 0) {
        stats.avg_confidence_score = validSessions.reduce((sum, s) => 
          sum + s.confidence_score, 0) / validSessions.length;
        stats.avg_speech_score = validSessions.reduce((sum, s) => 
          sum + s.speech_score, 0) / validSessions.length;
        stats.avg_expression_score = validSessions.reduce((sum, s) => 
          sum + s.expression_score, 0) / validSessions.length;
      }
    }

    res.json({ stats });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des statistiques' 
    });
  }
};
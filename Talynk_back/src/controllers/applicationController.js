const { JobApplication, Job, CV } = require('../models');

// Postuler à un job
exports.applyToJob = async (req, res) => {
  try {
    const { job_id, cv_id, notes } = req.body;

    // Vérifier si le job existe
    const job = await Job.findById(job_id);
    if (!job) {
      return res.status(404).json({ error: 'Job non trouvé' });
    }

    // Vérifier si le CV appartient à l'utilisateur
    const cv = await CV.findOne({ _id: cv_id, user_id: req.userId });
    if (!cv) {
      return res.status(404).json({ error: 'CV non trouvé ou non autorisé' });
    }

    // Vérifier si l'utilisateur a déjà postulé
    const existingApplication = await JobApplication.findOne({
      user_id: req.userId,
      job_id
    });

    if (existingApplication) {
      return res.status(400).json({ 
        error: 'Vous avez déjà postulé à cette offre' 
      });
    }

    // Créer la candidature
    const application = new JobApplication({
      user_id: req.userId,
      job_id,
      cv_id,
      notes
    });

    await application.save();

    res.status(201).json({
      message: 'Candidature envoyée avec succès',
      application
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'envoi de la candidature' });
  }
};

// Récupérer les candidatures de l'utilisateur
exports.getUserApplications = async (req, res) => {
  try {
    const { status } = req.query;
    const query = { user_id: req.userId };
    
    if (status) query.status = status;

    const applications = await JobApplication.find(query)
      .populate('job_id')
      .populate('cv_id')
      .sort({ applied_at: -1 });

    res.json({ 
      applications,
      count: applications.length 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des candidatures' 
    });
  }
};

// Récupérer une candidature spécifique
exports.getApplicationById = async (req, res) => {
  try {
    const application = await JobApplication.findOne({
      _id: req.params.id,
      user_id: req.userId
    })
      .populate('job_id')
      .populate('cv_id');

    if (!application) {
      return res.status(404).json({ error: 'Candidature non trouvée' });
    }

    res.json({ application });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la récupération de la candidature' 
    });
  }
};

// Mettre à jour le statut d'une candidature (pour RH)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    ).populate('user_id', 'first_name last_name email');

    if (!application) {
      return res.status(404).json({ error: 'Candidature non trouvée' });
    }

    res.json({
      message: 'Statut de candidature mis à jour',
      application
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la mise à jour de la candidature' 
    });
  }
};

// Récupérer toutes les candidatures pour un job (pour RH)
exports.getJobApplications = async (req, res) => {
  try {
    const { status } = req.query;
    const query = { job_id: req.params.jobId };
    
    if (status) query.status = status;

    const applications = await JobApplication.find(query)
      .populate('user_id', 'first_name last_name email username')
      .populate('cv_id')
      .sort({ applied_at: -1 });

    res.json({ 
      applications,
      count: applications.length 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des candidatures' 
    });
  }
};

// Supprimer une candidature
exports.deleteApplication = async (req, res) => {
  try {
    const application = await JobApplication.findOneAndDelete({
      _id: req.params.id,
      user_id: req.userId
    });

    if (!application) {
      return res.status(404).json({ error: 'Candidature non trouvée' });
    }

    res.json({ message: 'Candidature supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur lors de la suppression de la candidature' 
    });
  }
};
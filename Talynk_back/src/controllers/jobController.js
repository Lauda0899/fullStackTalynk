const { Job } = require('../models');

// Récupérer tous les jobs (avec filtres)
exports.getAllJobs = async (req, res) => {
  try {
    const { 
      job_type, 
      remote, 
      company, 
      location,
      min_salary,
      search,
      page = 1,
      limit = 20 
    } = req.query;

    const query = {};

    if (job_type) query.job_type = job_type;
    if (remote !== undefined) query.remote = remote === 'true';
    if (company) query.company = new RegExp(company, 'i');
    if (location) query.location = new RegExp(location, 'i');
    if (min_salary) query.salary_min = { $gte: Number(min_salary) };
    
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { company: new RegExp(search, 'i') }
      ];
    }

    const jobs = await Job.find(query)
      .sort({ posted_date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Job.countDocuments(query);

    res.json({
      jobs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des jobs' });
  }
};

// Récupérer un job spécifique
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job non trouvé' });
    }

    res.json({ job });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du job' });
  }
};
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      location,
      requirements = [],
      skills = [],
      salary_range,
      employment_type = 'CDI',
      experience_level = 'Intermediaire',
      remote_work = false,
      contact_email,
      application_deadline,
      category
    } = req.body;

    // Validation des champs requis
    if (!title || !company || !description || !location) {
      return res.status(400).json({
        error: 'Champs manquants',
        details: 'Title, company, description et location sont requis'
      });
    }

    const jobData = {
      title,
      company,
      description,
      location,
      requirements: Array.isArray(requirements) ? requirements : [requirements],
      skills: Array.isArray(skills) ? skills : [skills],
      employment_type,
      experience_level,
      remote_work: Boolean(remote_work),
      created_by: req.user._id,
      status: 'active'
    };

    // Champs optionnels
    if (salary_range) jobData.salary_range = salary_range;
    if (contact_email) jobData.contact_email = contact_email;
    if (application_deadline) jobData.application_deadline = application_deadline;
    if (category) jobData.category = category;

    const job = new Job(jobData);
    await job.save();

    res.status(201).json({
      message: 'Job créé avec succès',
      job: {
        _id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        employment_type: job.employment_type,
        created_at: job.created_at
      }
    });

  } catch (error) {
    console.error('Erreur création job:', error);
    
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ 
        error: 'Erreur de validation', 
        details: errors 
      });
    }
    
    res.status(500).json({ 
      error: 'Erreur serveur lors de la création du job',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Mettre à jour un job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ error: 'Job non trouvé' });
    }

    res.json({
      message: 'Job mis à jour avec succès',
      job
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du job' });
  }
};

// Supprimer un job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job non trouvé' });
    }

    res.json({ message: 'Job supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du job' });
  }
};
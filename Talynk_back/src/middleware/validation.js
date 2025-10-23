import { body, param, validationResult } from 'express-validator';

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation for registration
const validateRegister = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 80 })
    .withMessage('Le username doit contenir entre 3 et 80 caractères'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email invalide')
    .isLength({ max: 120 })
    .withMessage('Email trop long'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('Le prénom est requis')
    .isLength({ max: 50 })
    .withMessage('Prénom trop long'),
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Le nom est requis')
    .isLength({ max: 50 })
    .withMessage('Nom trop long'),
  handleValidationErrors,
];

// Validation for login
const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email invalide'),
  body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis'),
  handleValidationErrors,
];

// Validation for creating a CV
const validateCV = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Le titre est requis')
    .isLength({ max: 100 })
    .withMessage('Titre trop long'),
  body('content')
    .notEmpty()
    .withMessage('Le contenu est requis'),
  body('language')
    .optional()
    .isLength({ max: 10 })
    .withMessage('Code langue trop long'),
  handleValidationErrors,
];

// Validation for creating a job
const validateJob = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Le titre est requis')
    .isLength({ max: 200 })
    .withMessage('Titre trop long'),
  body('company')
    .trim()
    .notEmpty()
    .withMessage('La compagnie est requise')
    .isLength({ max: 200 })
    .withMessage('Nom de compagnie trop long'),
  body('location')
    .trim()
    .notEmpty()
    .withMessage('La localisation est requise')
    .isLength({ max: 200 })
    .withMessage('Localisation trop longue'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('La description est requise'),
  body('requirements')
    .trim()
    .notEmpty()
    .withMessage('Les exigences sont requises'),
  body('job_type')
    .optional()
    .isIn(['full-time', 'part-time', 'contract'])
    .withMessage('Type de job invalide'),
  body('remote')
    .optional()
    .isBoolean()
    .withMessage('Remote doit être un booléen'),
  handleValidationErrors,
];

// Validation for applying to a job
const validateApplication = [
  body('job_id')
    .trim()
    .notEmpty()
    .withMessage("L'ID du job est requis")
    .isMongoId()
    .withMessage('ID de job invalide'),
  body('cv_id')
    .trim()
    .notEmpty()
    .withMessage("L'ID du CV est requis")
    .isMongoId()
    .withMessage('ID de CV invalide'),
  handleValidationErrors,
];

// Validation for creating an interview session
const validateInterviewSession = [
  body('job_title')
    .trim()
    .notEmpty()
    .withMessage('Le titre du job est requis')
    .isLength({ max: 200 })
    .withMessage('Titre trop long'),
  // Optional: Add more validations if needed (e.g., date, participants)
  handleValidationErrors,
];

// Validation for updating application status
const validateApplicationStatus = [
  body('status')
    .isIn(['applied', 'reviewed', 'interviewed', 'rejected', 'accepted'])
    .withMessage('Statut invalide'),
  handleValidationErrors,
];

// Validation for MongoDB IDs (generic for any param)
const validateMongoId = (paramName = 'id') => [
  param(paramName)
    .isMongoId()
    .withMessage('ID invalide'),
  handleValidationErrors,
];

export {
  validateRegister,
  validateLogin,
  validateCV,
  validateJob,
  validateApplication,
  validateInterviewSession,
  validateApplicationStatus,
  validateMongoId,
  handleValidationErrors,
};
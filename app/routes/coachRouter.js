const express = require('express');
const coachController = require('../controllers/coachController');
const router = express.Router();

// Routes for coaches
router.get('/', coachController.getAllCoaches);
router.get('/:id', coachController.getCoachById);
router.post('/', coachController.createCoach);
router.put('/:id', coachController.updateCoach);
router.delete('/:id', coachController.deleteCoach);

// Routes for coach certificates
router.get('/:coachId/certificates', coachController.getCoachCertificates);
router.post('/:coachId/certificates', coachController.createCoachCertificate);

// Routes for coach posts
router.get('/:coachId/posts', coachController.getCoachPosts);

// Routes for coach nutrition templates
router.get('/:coachId/nutrition-templates', coachController.getCoachNutritionTemplates);
router.post('/:coachId/nutrition-templates', coachController.createNutritionTemplate);
// Route for inserting a day into a workout template
router.post('/:coachId/workout-templates/:templateId/days',coachController.insertDayIntoWorkoutTemplate);
router.delete('/:coachId/nutrition-templates/:templateId', coachController.deleteNutritionTemplate);

// Routes for coach workout templates
router.get('/:coachId/workout-templates', coachController.getCoachWorkoutTemplates);
router.post('/:coachId/workout-templates', coachController.createWorkoutTemplate);
router.delete('/:coachId/workout-templates/:templateId', coachController.deleteWorkoutTemplate);

// Routes for assigning templates to clients
router.post('/:coachId/clients/:clientId/nutrition-templates/:templateId', coachController.assignNutritionTemplateToClient);
router.post('/:coachId/clients/:clientId/workout-templates/:templateId', coachController.assignWorkoutTemplateToClient);
router.delete('/:coachId/clients/:clientId/nutrition-templates', coachController.removeNutritionTemplateFromClient);
router.delete('/:coachId/clients/:clientId/workout-templates', coachController.removeWorkoutTemplateFromClient);

// Routes for coach client workout templates and nutrition templates
router.get('/:coachId/clients/:clientId/workout-templates', coachController.getClientWorkoutTemplates);
router.get('/:coachId/clients/:clientId/nutrition-templates', coachController.getClientNutritionTemplates);

module.exports = router;

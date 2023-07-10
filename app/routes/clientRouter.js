const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Routes for clients
router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClientById);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

// Routes for client coaches
router.get('/:id/coaches', clientController.getClientCoaches);

// Routes for client workout templates
router.get('/:id/workout-template', clientController.getClientWorkoutTemplate);

// Routes for client nutrition templates
router.get('/:id/nutrition-template', clientController.getClientNutritionTemplate);

module.exports = router;
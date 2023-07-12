const express = require('express');
const authenticationController = require('../controllers/authenticationController');
const  authenticateUser  = require('../middlewares/authenticationMiddelware');

const router = express.Router();

// Route for signing up a user with email and password
router.post('/signup', authenticationController.signUpWithEmailAndPW);

// Route for signing in a coach with email and password
router.post('/signin/coach', authenticationController.signInCoachWithEmailAndPW);

// Route for signing in a client with email and password
router.post('/signin/client', authenticationController.signInClientWithEmailAndPW);

// Route for verifying the ID token of a user
router.post('/verifyToken', authenticationController.verifyToken);

// Protected route to get the data of the currently logged-in user
router.get('/coach', authenticateUser, authenticationController.getLoggedInCoachData);
router.get('/client', authenticateUser, authenticationController.getLoggedInClientData);

module.exports = router;

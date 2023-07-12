const admin = require('firebase-admin');

const Client = require('../models/coach');
const Coach = require('../models/coach');

// Function to create a new user with email and password
const signUpWithEmailAndPW = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Create a new user with email and password using Firebase Auth
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        res.status(200).json({ message: 'User created successfully', uid: userRecord.uid });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
};

// Function to sign in a user with email and password
const signInCoachWithEmailAndPW = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Sign in the user with email and password using Firebase Auth
        const signInResult = await admin.auth().signInWithEmailAndPassword(email, password);
        const { uid, email: signInEmail } = signInResult.user;
        try {
            // Query the database to get the user data by email
            const user = await Coach.findOne({ where: { email: userEmail } });
            if (!user) {
                // User not found in the database
                return res.status(404).json({ message: 'User not found' });
            }
            req.userData = user;
        } catch (e) {
            return res.status(401).json({ message: 'User Fetch Error' });
        }

        res.status(200).json({ message: 'User signed in successfully', uid, email: signInEmail });
    } catch (error) {
        console.error('Error signing in user:', error);
        res.status(500).json({ message: 'Failed to sign in user' });
    }
};
// Function to sign in a user with email and password
const signInClientWithEmailAndPW = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Sign in the user with email and password using Firebase Auth
        const signInResult = await admin.auth().signInWithEmailAndPassword(email, password);
        const { uid, email: signInEmail } = signInResult.user;
        try {
            // Query the database to get the user data by email
            const user = await Client.findOne({ where: { email: userEmail } });
            if (!user) {
                // User not found in the database
                return res.status(404).json({ message: 'User not found' });
            }
            req.userData = user;
        } catch (e) {
            return res.status(401).json({ message: 'User Fetch Error' });
        }

        res.status(200).json({ message: 'User signed in successfully', uid, email: signInEmail, user });
    } catch (error) {
        console.error('Error signing in user:', error);
        res.status(500).json({ message: 'Failed to sign in user' });
    }
};

// Function to verify the ID token of a user
const verifyToken = async (req, res) => {
    try {
        const { idToken } = req.body;

        // Verify the ID token using Firebase Auth
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        res.status(200).json({ message: 'Token verified successfully', uid: decodedToken.uid });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ message: 'Failed to verify token' });
    }
};


const getLoggedInCoachData = async (req, res) => {
    try {
        const { idToken } = req.body;

        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = decodedToken;
        req.userId = decodedToken.uid;
        const userEmail = decodedToken.email;
        const user = await Coach.findOne({ where: { email: userEmail } });

        if (!user) {
            // User not found in the database
            return res.status(404).json({ message: 'User not found' });
        }
        req.userData = user;
        res.status(200).json({ message: 'Succeffully Fetched', coach: user });

    } catch (e) {
        res.status(500).json({ message: 'Failed get user data' });

    }
}
const getLoggedInClientData = async (req, res) => {
    const { idToken } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = decodedToken;
        req.userId = decodedToken.uid;
        const userEmail = decodedToken.email;
        const user = await Client.findOne({ where: { email: userEmail } });
    
        if (!user) {
          // User not found in the database
          return res.status(404).json({ message: 'User not found' });
        }
        req.userData = user;
        res.status(200).json({ message: 'Succeffully Fetched', coach: user });

    } catch (e) {
        res.status(500).json({ message: 'Failed get user data' });

    }
}

module.exports = {
    signUpWithEmailAndPW,
    signInCoachWithEmailAndPW,
    signInClientWithEmailAndPW,
    verifyToken,
    getLoggedInCoachData,
    getLoggedInClientData
};

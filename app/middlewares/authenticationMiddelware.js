const admin = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
const { log } = require('console');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Middleware function to authenticate user
const authenticateUser = async (req, res, next) => {
  // Extract the authorization header from the request
  const authHeader = req.headers.authorization;
  // Check if the authorization header exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Extract the token from the authorization header
  const token = authHeader.split('Bearer ')[1];

  try {
    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Attach the user ID to the request object for further processing
    req.user = decodedToken;
    req.userId = decodedToken.uid;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticateUser;


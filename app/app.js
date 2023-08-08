const express = require('express');
require('dotenv').config();
const { swaggerUi, swaggerDocs } = require('./swagger');
const authenticateUser = require('./middlewares/authenticationMiddelware');

const coachRouter = require('./routes/coachRouter');
const clientRouter = require('./routes/clientRouter');
const authenticationRouter = require('./routes/authenticationRouter');
const app = express();
const port = 3000;


const sequelize = require('./utils/database').sequelize;
const associations = require('./associations');
const {testConnection} =  require('./utils/database');
testConnection();
associations(sequelize); 

// sequelize.sync({ alter: process.env.DB_ALTER, force: process.env.DB_FORCE_DROP })
//   .then(() => {
//     console.log('Models synchronized with the database');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing models:', error);
//   });

// Middleware 
app.use(express.json());


// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/auth/', authenticationRouter);
// app.use(authenticateUser);

app.use('/coaches', coachRouter);
app.use('/clients', clientRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

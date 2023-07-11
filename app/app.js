const express = require('express');
require('dotenv').config();
const { swaggerUi, swaggerDocs } = require('./swagger');

const coachRouter = require('./routes/coachRouter');
const clientRouter = require('./routes/clientRouter');
const app = express();
const port = 3000;


const sequelize = require('./utils/database').sequelize;
const associations = require('./associations');
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
app.use('/coaches', coachRouter);
app.use('/clients', clientRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

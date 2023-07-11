const express = require('express');
require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const coachRouter = require('./routes/coachRouter');
const clientRouter = require('./routes/clientRouter');
const app = express();
const port = 3000;


const sequelize = require('./utils/database').sequelize;
const associations = require('./associations');
associations(sequelize); // Pass the Sequelize instance to the associations function

sequelize.sync({ alter: process.env.DB_ALTER, force: process.env.DB_FORCE_DROP })
  .then(() => {
    console.log('Models synchronized with the database');
  })
  .catch((error) => {
    console.error('Error synchronizing models:', error);
  });

// Middleware
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coach Management API',
      description: 'API documentation for managing coaches and clients',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/coaches', coachRouter);
app.use('/clients', clientRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

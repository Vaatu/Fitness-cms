const express = require('express');
require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const coachRouter = require('./routes/coachRouter');
const clientRouter = require('./routes/clientRouter');



const sequelize = require('./utils/database').sequelize;
// const associations = require('./associations');
// associations(sequelize); // Pass the Sequelize instance to the associations function
const Coach = require('./models/coach');
const Certificate = require('./models/certificate');
const Client = require('./models/client');
const Post = require('./models/post');
const NutritionTemplate = require('./models/nutritionTemplate');
const WorkoutTemplate = require('./models/workoutTemplate');
const Comment = require('./models/comment');
const Workout = require('./models/workout');
const Day = require('./models/day');
const Like = require('./models/like');
const Meal = require('./models/meal');

const app = express();
const port = 3000;

Certificate.belongsTo(Coach, { foreignKey: 'coachId' });
// Client.belongsTo(Coach, { foreignKey: 'coachId' });
Client.belongsToMany(Coach, { through: 'ClientCoach' });
Client.belongsTo(NutritionTemplate, { foreignKey: 'nutritionTemplateId' });
Client.belongsTo(WorkoutTemplate, { foreignKey: 'workoutTemplateId' });
Client.belongsToMany(WorkoutTemplate, { through: 'ClientWorkoutTemplates', foreignKey: 'clientId' });
Client.belongsToMany(NutritionTemplate, { through: 'ClientNutritionTemplates'});
NutritionTemplate.belongsToMany(Client, { through: 'ClientNutritionTemplates' });

Coach.hasMany(Certificate, { foreignKey: 'coachId' });
Coach.hasMany(Post, { foreignKey: 'coachId' });
Coach.hasMany(Client, { foreignKey: 'coachId' });
Coach.hasMany(WorkoutTemplate, { foreignKey: 'coachId' });
Coach.hasMany(NutritionTemplate, { foreignKey: 'coachId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });
Day.hasMany(Workout, { foreignKey: 'dayId' });
Like.belongsTo(Post, { foreignKey: 'postId' });
Meal.belongsTo(NutritionTemplate, { foreignKey: 'nutritionTemplateId' });
NutritionTemplate.hasMany(Meal, { foreignKey: 'nutritionTemplateId' });
NutritionTemplate.belongsTo(Coach, { foreignKey: 'coachId' });
NutritionTemplate.belongsTo(Client, { foreignKey: 'clientId' });
Post.belongsTo(Coach, { foreignKey: 'coachId' });
Post.hasMany(Comment, { foreignKey: 'postId' });
Post.hasMany(Like, { foreignKey: 'postId' });
WorkoutTemplate.hasMany(Day, { foreignKey: 'workoutTemplateId' });
WorkoutTemplate.belongsToMany(Client, { through: 'ClientWorkoutTemplates', foreignKey: 'workoutTemplateId' });


// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('Models synchronized with the database');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing models:', error);
//   });

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

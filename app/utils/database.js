const { Sequelize } = require('sequelize');
const db = process.env.DB;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost =  process.env.DB_HOST;
const dbPort =  process.env.DB_PORT;
// Database configuration
const databaseConfig = {
  database: db,
  username: dbUsername,
  password: dbPassword,
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
};

// Create a new Sequelize instance
const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialect: databaseConfig.dialect,
  }
);

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  sequelize,
  testConnection,
};

const { Sequelize } = require('sequelize');

// Database configuration
const databaseConfig = {
  database: 'fitness',
  username: 'vaatu_akaunting',
  password: 'wEDraZ+*l*HUj4Cho?=9',
  host: '185.172.56.70',
  port: '3306',
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

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database').sequelize;


const Post = sequelize.define('Post', {
  description: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  }
});

module.exports = Post;

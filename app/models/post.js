const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Assuming you have a separate file for Sequelize configuration
const Coach = require('./coach');
const Comment = require('./comment');
const Like = require('./like');

const Post = sequelize.define('Post', {
  description: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  }
});

Post.belongsTo(Coach, { foreignKey: 'coachId' });
Post.hasMany(Comment, { foreignKey: 'postId' });
Post.hasMany(Like, { foreignKey: 'postId' });
module.exports = Post;

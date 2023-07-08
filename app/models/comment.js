const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Post = require('./post');

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = Comment;

const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = (sequelize) => {
  // Comment associations
  Comment.belongsTo(Post, { foreignKey: 'postId' });
  Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
};

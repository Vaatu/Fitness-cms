const Like = require('../models/like');
const Coach = require('../models/coach');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = (sequelize) => {
  // Post associations
  Post.belongsTo(Coach, { foreignKey: 'coachId' });
  Post.hasMany(Comment, { foreignKey: 'postId' });
  Post.hasMany(Like, { foreignKey: 'postId' });
  Like.belongsTo(Post, { foreignKey: 'postId' });

};

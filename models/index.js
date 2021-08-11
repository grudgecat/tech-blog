const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


// A user can have many posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});


// A post can have many comments
//VERIFY FK 
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: "SET NULL",
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Post, Comment };
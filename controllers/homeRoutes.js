const router = require('express').Router();
const { Post } = require('../models');
const { Comment } = require('./models');
const { User } = require('./models');


// '/' homeRoute is view for logged in, clicked HOME,
// OR not logged in. Shows all posts/related comments of all users. View only.

// /login shows login form (option to load sign up form)
router.post('/login', async (req, res) => {
    try {
      // Find the user who matches the posted e-mail address
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      // Verify the posted password with the password store in the database
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      // Create session variables based on the logged in user
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  //logout form, destroy session
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      // Remove the session variables
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  

//HOME: show all posts, view only
router.get('/', async (req, res) => {
    try {
    const postData = await Post.findAll();
    const posts = postData.map((post));
    res.json(posts);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
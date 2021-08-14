const moment = require('moment'); 
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post } = require('../models');
const { Comment } = require('../models');
const { User } = require('../models');


//HOME: show all posts, view only
router.get('/', async (req, res) => {
    try {
    const postData = await Post.findAll({
      include: [
        {
          model: Comment, 
          attributes: ['commentDate', 'commentText']
        }
      ]
    });
    const posts = postData.map((post) => {
      return post.get({plain: true}); 
    });
    // console.log('data check', posts); 

    res.render('homepage', {posts});

    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          attributes: ['postTitle', 'postText', 'postDate'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// once logged in, show user dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});


module.exports = router;
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
        }
      ]
    });

    const posts = postData.map((post) => {
      return post.get({ plain: true });
    });

    // console.log('post data check', );

    res.render('homepage', { posts });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  // try {
  const postData = await Post.findByPk(req.params.id, {
    include: [{ model: Comment }],
  });

  const post = postData.get({ plain: true });
  // console.log('post data, ', post);

  res.render('post', {
    ...post,
    logged_in: req.session.logged_in
  });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

// once logged in, show user dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  // try {
  // Find the logged in user based on the session ID
  const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
    include: [{ model: Post }, { model: Comment }],
  });

  const user = userData.get({ plain: true });

  // console.log('++++++++++++ user data now contains, ', user);

  res.render('dashboard', {
    ...user,
    logged_in: true
  });

// const userStuff = userData.map((post) => {
//   return post.get({ plain: true });
// });

//   console.log('++++++++++++ user data now contains, ', userStuff);

//   res.render('dashboard', {
//     ...userStuff,
//     logged_in: true
//   });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

//view comment
router.get('/comment/:id', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('comment');
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
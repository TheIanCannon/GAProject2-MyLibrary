const express = require('express');
const router = express.Router();

const passport = require('passport');

// Welcome/Landing page route
router.get('/', function(req, res, next) {
    res.render('index');
});

// Google OAuth login route
router.get(
    '/auth/google',
    passport.authenticate(
        'google', //which strategy we're using (google oauth)
        { scope: ['profile', 'email'] } // scope of authentication; profile *and* EMAIL is needed
    ));

// Google Oauth callback route
router.get('/oauth2callback', passport.authenticate(
    'google', {
        successRedirect: '/',
        failureRedirect: '/',
    }
));

// OAuth logout route
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
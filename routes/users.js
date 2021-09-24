const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');
const csrf = require('csurf');


router.get('/sign-in', csrf, usersController.signIn);
router.get('/sign-up', csrf ,usersController.signUp);
router.get('/sign-out', usersController.destroySession);
router.post('/create',csrf, usersController.create);
router.get('/verify',csrf, usersController.verify);
router.get('/verify/:token',csrf, usersController.verified);
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
), usersController.createSession);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/users/sign_in' }), usersController.createSession);
router.get('/resend-verification-mail-form',csrf,usersController.resendVerificationMailForm);
router.post('/resend-verification-mail',usersController.resendVerificationMail);
router.get('/forgot-password-page',csrf,usersController.forgotPasswordPage);
router.post('/forgot-password',csrf,usersController.forgotPassword);
router.get('/reset-password/:token',csrf,usersController.resetPasswordPage);
router.post('/reset-password/:email',csrf,usersController.resetPassword);
router.get('/dashboard/:id', passport.checkAuthentication, usersController.dashboard);
module.exports = router;
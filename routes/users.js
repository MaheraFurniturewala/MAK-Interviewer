const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');


router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.create);
router.get('/verify', usersController.verify);
router.get('/verify/:token', usersController.verified);
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-up' },
), usersController.createSession);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/users/sign_in' }), usersController.createSession);
router.get('/resend-verification-mail-form',usersController.resendVerificationMailForm);
router.post('/resend-verification-mail',usersController.resendVerificationMail);
router.get('/forgot-password-page',usersController.forgotPasswordPage);
router.post('/forgot-password',usersController.forgotPassword);
router.get('/reset-password/:token',usersController.resetPasswordPage);
router.post('/reset-password/:email',usersController.resetPassword);
module.exports = router;
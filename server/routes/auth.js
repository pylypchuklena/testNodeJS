const express = require('express');
const validator = require('validator');
const passport = require('passport');


const router = new express.Router();

//validate sign up form

function validateSignUpForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Plise provide a correct email address.';
    }
    if (!payload || typeof payload.name !== 'string' || payload.name.trim() === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }
    if (!payload || typeof payload.password !== 'string' || payload.password.trim() < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
    }
    if (!payload || typeof payload.confirm !== 'string' || typeof payload.password !== 'string' || payload.confirm.trim() !== payload.password.trim()) {
        isFormValid = false;
        errors.confirm = 'Confirm password is not valid.';
    }

    if (!isFormValid) {
        message = "Check the form for errors";
    }

    return {
        success: isFormValid,
        errors,
        message
    }
}

function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Plise provide a correct email address.';
    }
    if (!payload || typeof payload.password !== 'string' || payload.password.trim() < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
    }
    if (!isFormValid) {
        message = "Check the form for errors";
    }
    return {
        success: isFormValid,
        message,
        errors
    }
}

router.post('/signup', (req, res, next) => {
    const validationResult = validateSignUpForm(req.body);
    console.log('body : ', req.body)
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            massage: validationResult.message,
            errors: validationResult.errors
        })
    }
    return passport.authenticate('local-signup', (err) => {
        if (err) {
            console.log(err)
            if (err.name === 'BulkWriteError' && err.code === 11000) {
                // the 11000 Mongo code is for a duplication email error
                // the 409 HTTP status code is for conflict error
                return res.status(409).json({
                    success: false,
                    message: 'Check the form for errors.',
                    errors: {
                        email: 'This email is already taken.'
                    }
                });
            } 
            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up! Now you should be able to log in.'
        });
    })(req, res, next);
})

router.post('/login', (req, res, next) => {
    console.log(req.body)
    const validationResult = validateLoginForm(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    }

    return passport.authenticate('local-login', (err, token, userData) => {
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }


        return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            user: userData
        });
    })(req, res, next);
})

module.exports = router;
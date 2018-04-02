const express = require('express');
const validator = require ('validator');

const router= new express.Router();

//validate sing up form

function validateSingUpForm(payload){
    const errors = {};
    let isFormValid = true;
    let message = '';

    if(!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)){
        isFormValid=false;
        errors.email='Plise provide a correct email address.';
    }
    if(!payload || typeof payload.name !== 'string' || payload.name.trim() === 0){
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }
    if(!payload || typeof payload.password !== 'string' || payload.password.trim() < 8){
        isFormValid=false;
        errors.password = 'Password must have at least 8 characters.';
    }
    if(!payload || typeof payload.confirm !=='string' || typeof payload.password !== 'string' || payload.confirm.trim() !== payload.password.trim()){
        isFormValid=false;
        errors.confirm = 'Confirm password is not valid.';
    }

    if(!isFormValid){
        message="Check the form for errors";
    }

    return{
        success: isFormValid,
        errors,
        message
    }
}

function validateLoginForm(payload){
    const errors = {};
    let isFormValid = true;
    let message = '';

    if(!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)){
        isFormValid=false;
        errors.email='Plise provide a correct email address.';
    }
    if(!payload || typeof payload.password !== 'string' || payload.password.trim() < 8){
        isFormValid=false;
        errors.password = 'Password must have at least 8 characters.';
    }
    if(!isFormValid){
        message="Check the form for errors";
    }
    return{
        success: isFormValid,
        message,
        errors
    }
}

router.post('/signup', (req,res)=>{
    const validationResult= validateSingUpForm(req.body);
    if(!validationResult.success){
        return res.status(400).json({
            success: false,
            massage: validationResult.message,
            errors: validationResult.errors
        })
    }
    return res.status(200).end();
})

router.post('/login', (req,res)=>{
    console.log(req.body)
    const validationResult = validateLoginForm(req.body);
    
    if(!validationResult.success){
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    }

    return res.status(200).end();
})

module.exports = router;
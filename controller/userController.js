const express = require('express'),
    userModel = require('../models/userModel'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    isEmpty = require('../controller/isEMpty'),
    validator = require('validator'),
    fs = require('fs'),
    moment = require('moment'),
    mkdirp = require('mkdirp');

var userController = {
    userRegistration: function (req, res) {
        var userRegData = req.body;
        var fullName = userRegData.fullName;
        var email = userRegData.email;
        var phoneNumber = userRegData.phoneNumber;
        var passcode = userRegData.password
        let errors = {}
        var today_date = moment().format("YYYYMMDDHHSS");

        fullName = !isEmpty(fullName) ? fullName : ''
        email = !isEmpty(email) ? email : ''
        phoneNumber = !isEmpty(phoneNumber) ? phoneNumber : ''
        passcode = !isEmpty(passcode) ? passcode : ''
        var lowerEmail = email.toLowerCase()

        if (validator.isEmpty(fullName)) {
            errors.full_name = 'Username is required'
        }

        if (!validator.isEmail(lowerEmail, {
            min: 2,
            max: 50
        })) {
            errors.email = 'Email should be between 2 and 50 characters.'
        }
        if (validator.isEmpty(lowerEmail)) {
            errors.email = 'Email is required.'
        }

        var no = phoneNumber.toString()
        if (no.length != 10) {
            errors.phoneNumber = 'phoneNumber should be 10 characters.'
        }
        if (validator.isEmpty(passcode)) {
            errors.passcode = 'passcode is required.'
        }
        if (!validator.isStrongPassword(passcode, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            errors.passcode = 'Passcode should be at least 8 characters.'
        }

        if (Object.keys(errors).length > 0) {

            res.status(402).send({
                status: false,
                message: "Invalid credentials.",
                data: errors
            })
        } else {
            if (req.files) {
                userModel.validate(lowerEmail, phoneNumber, function (err, data) {
                    if (err) {
                        res.status(500).send({
                            status: false,
                            message: err.message,
                        })
                    } else {
                        if (data.rows.length > 0) {
                            res.status(403).send({
                                status: false,
                                message: "Email or Phone Number already exist",
                            })
                        } else {
                            path = './public/ProfileImages/'
                            mkdirp(path, function (err) {
                                if (err) {
                                    res.status(402).send({
                                        status: false,
                                        message: 'Failed to create directory',
                                    })
                                } else {
                                    fs.writeFile(path + today_date + req.files.profileImage.name, req.files.profileImage.data, function (err, result) {
                                        if (err) {
                                            res.status(402).send({
                                                status: false,
                                                message: "File not uploaded!!",
                                            })
                                        } else {
                                            let dbpath = path + today_date + req.files.profileImage.name
                                            const password = bcrypt.hashSync(passcode, 12);
                                            userModel.userRegister(userRegData, lowerEmail, password, dbpath, function (err, registerData) {
                                                if (err) {
                                                    res.status(500).send({
                                                        status: false,
                                                        message: err.message
                                                    })
                                                } else if (registerData.rows.length > 0) {
                                                    res.status(201).send({
                                                        status: true,
                                                        message: "Registration is done successfully",
                                                    })
                                                } else {
                                                    res.status(400).send({
                                                        status: false,
                                                        message: "Something went wrong"
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
            else {
                res.status(403).send({
                    status: false,
                    message: "Please upload profile image"
                })
            }
        }
    },

    loginUser: function (req, res) {
        var loginWithEmailData = req.body;
        var email = loginWithEmailData.email;
        var lowerEmail = email.toLowerCase()
        var errors = {}

        let passcode = loginWithEmailData.password
        if (!validator.isEmail(lowerEmail, {
            min: 2,
            max: 50
        })) {
            errors.email = 'Email should be between 2 and 50 characters.'
        }
        if (validator.isEmpty(lowerEmail)) {
            errors.email = 'Email is required.'
        }
        if (validator.isEmpty(passcode)) {
            errors.passcode = 'passcode is required.'
        }
        if (!validator.isStrongPassword(passcode, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            errors.passcode = 'Passcode should be at least 8 characters.'
        }
        if (Object.keys(errors).length > 0) {
            res.status(402).send({
                status: false,
                message: "Invalid credentials.",
                data: errors
            })
        } else {
            userModel.verifyEmail(lowerEmail, function (err, data) {
                if (err) {
                    res.status(500).send({
                        status: false,
                        message: err.message
                    })
                } else if (data.rows.length > 0) {
                    var unhashed = bcrypt.compareSync(passcode, data.rows[0]['passcode']);
                    if (unhashed) {
                        var token = jwt.sign({
                            id: data.rows[0]['user_id']
                        }, process.env.Secret_Key, {
                            expiresIn: 900 // expires in 24 hours
                        });
                        var user_data = {
                            user_id: data.rows[0]['user_id'],
                            token: token
                        }
                        res.status(200).send({
                            status: true,
                            message: "Login successful",
                            data: user_data
                        })
                    } else {
                        res.status(500).send({
                            status: false,
                            message: "Invalid credentials.",
                        })
                    }
                } else {
                    res.status(404).send({
                        status: false,
                        message: "Data Not Found"
                    })
                }
            });
        }
    },

    calculateAge: function (req, res) {
        var DOB = req.body.DOB;
        var years = moment().diff(DOB, 'years');
        data = "The age is " + years
        res.status(200).send({
            status: true,
            message: "Login successful",
            data: data
        })
    },

    updateProfile: function (req, res) {
        var userData = req.body;
        if (req.files) {
            path = './public/ProfileImages/'
            mkdirp(path, function (err) {
                if (err) {
                    res.status(402).send({
                        status: false,
                        message: 'Failed to create directory',
                    })
                } else {
                    fs.writeFile(path + today_date + req.files.profileImage.name, req.files.profileImage.data, function (err, result) {
                        if (err) {
                            res.status(402).send({
                                status: false,
                                message: "File not uploaded!!",
                            })
                        } else {
                            let dbpath = path + today_date + req.files.profileImage.name
                            userModel.updateProfileWithoutImage(userData, dbpath, function (err, data) {
                                if (err) {
                                    res.status(500).send({
                                        status: false,
                                        message: err.message
                                    })
                                } else if (data.rows.length > 0) {
                                    res.status(201).send({
                                        status: true,
                                        message: "User update successfully",
                                    })
                                } else {
                                    res.status(404).send({
                                        status: false,
                                        message: "Data not found"
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
        else {
            userModel.updateProfile(userData, function (err, data) {
                if (err) {
                    res.status(500).send({
                        status: false,
                        message: err.message
                    })
                } else if (data.rows.length > 0) {
                    res.status(201).send({
                        status: true,
                        message: "User update successfully",
                    })
                } else {
                    res.status(404).send({
                        status: false,
                        message: "Data not found"
                    })
                }
            })
        }
    },
}


module.exports = userController;
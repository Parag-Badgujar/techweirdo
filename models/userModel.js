const db = require('../config/dbConnection'); //reference of dbconnection.js
const moment = require('moment');

const User = {
    validate: function (email, phonenumber, callback) {
        db.query("select email,phone_number from users where email=$1 or phone_number=$2", [email, phonenumber], callback);
    },

    userRegister: function (userRegData, lowerEmail, password, default_image, callback) {
        let registration_date = moment().format("YYYY-MM-DD HH:mm:ss");
        db.query("insert into users(fullname, email, phone_number, passcode,dob,age, profile_image,registration_date) values($1,$2,$3,$4,$5,$6,$7,$8) returning user_id",
            [userRegData.fullName, lowerEmail, userRegData.phoneNumber, password, userRegData.DOB, userRegData.age, default_image, registration_date], callback);
    },

    verifyEmail: function (lowerEmail, callback) {
        db.query("select user_id,email,passcode from users where email=$1 ", [lowerEmail], callback);
    },

    updateProfileWithoutImage: function (userData, dbpath, callback) {
        db.query("update users set fullname=$1,phone_number=$2,dob=$3,age=$4,profile_image=$5 where email=$6 returning user_id", [userData.fullName,userData.phoneNumber,userData.DOB,userData.age,dbpath,userData.email], callback);
    },

    updateProfile: function (userData, callback) {
        db.query("update users set fullname=$1,phone_number=$2,dob=$3,age=$4 where email=$5 returning user_id", [userData.fullName,userData.phoneNumber,userData.DOB,userData.age,userData.email], callback);
    },
};


module.exports = User;
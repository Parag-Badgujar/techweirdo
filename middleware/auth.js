const jwt = require('jsonwebtoken');
module.exports = auth = (req,res,next) =>{
    var user_id= req.body.user_id;
    var token =req.body.token;
    // const nonSecurePaths = ['/UserRegistration', '/Login', '/AdminLogin','/LoginByMobile','/VerifyOTP','/ResendOTP','/ForgetPassword','/ResetPassword','/GenerateAccessCode'];
    // if (nonSecurePaths.includes(req.path)){
    //     next();
    // }else{
        jwt.verify(token, process.env.Secret_Key, function(err, decoded) {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: "Failed to authenticate token.",
                })
            }
            else{
                next();
            }
        });
    // } 
}
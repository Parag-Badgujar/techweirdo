const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const auth = require('../middleware/auth')
//
/** 
 * @swagger 
 * definitions:
 *   RegisterModel:
 *     properties:
 */
/** 
 * @swagger
/Users/Register: 
*   post: 
*     description: Import Dealers csv
*     tags:
*     - Users
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               file:
*                 type: string
*                 format: binary
*     parameters: 
*     - in: formData
*       name: fullName 
*       type: string 
*       required: true
*       description: Enter fullName.
*     - in: formData
*       name: email 
*       type: string 
*       required: true
*       description: Enter email.
*     - in: formData
*       name: password 
*       type: string 
*       required: true
*       description: Enter password.
*     - in: formData
*       name: phoneNumber 
*       type: string 
*       required: true
*       description: Enter phoneNumber.
*     - in: formData
*       name: DOB
*       type: string 
*       required: true
*       description: Enter DOB.
*     - in: formData
*       name: age 
*       type: integer 
*       required: true
*       description: Enter age.
*     - in: formData
*       name: profileImage
*       type: file 
*       required: false
*       description: Upload profileImage.
*       schema: 
*          $ref: '#/definitions/RegisterModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Report register successfully.
*       400: 
*         description: Failed to register report
*       401: 
*         description: Failed to authenticate token.
*       402: 
*         description: Failed to create directory/File not uploaded!!
*       403: 
*         description: Please provide/upload proof
*       404: 
*         description: Product not found.
*       500:
*         description: Internal server error. 
*/
router.post('/Register', function (req, res) {
    userController.userRegistration(req, res);
});

/** 
 * @swagger 
 * definitions:
 *   loginUserDealerByEmailModel:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 *         description: Enter email.
 *       password:
 *         type: string
 *         required: true
 *         description: Enter password.
 */
/** 
 * @swagger
/Users/Login: 
*   post: 
*     description: Login with email.
*     tags:
*     - Users
*     parameters: 
*     - name: Model 
*       description: Login with email.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/loginUserDealerByEmailModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: login successfully.
*       400: 
*         description: Something went wrong.
*       402: 
*         description: Invalid credentials.
*       404: 
*         description: Data Not Found.
*       500:
*         description: Internal server error. 
*/
router.post('/Login', function (req, res) {
    userController.loginUser(req, res);
});

/** 
 * @swagger 
 * definitions:
 *   AgeModel:
 *     properties:
 *       DOB:
 *         type: string
 *         required: true
 *         description: Enter DOB.
 */
/** 
 * @swagger
/Users/Age: 
*   post: 
*     description: Age
*     tags:
*     - Users
*     parameters: 
*     - name: Model 
*       description: Age
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/AgeModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Customer/Dealer login successfully/OTP send.
*       400: 
*         description: Something went wrong.
*       402: 
*         description: Invalid credentials.
*       403: 
*         description: Your account is deleted/disable!!!/Sorry you can not login.
*       404: 
*         description: Data Not Found.
*       500:
*         description: Internal server error. 
*/
router.post('/Age', function (req, res) {
    userController.calculateAge(req, res);
});
/** 
 * @swagger 
 * definitions:
 *   UpdateProfileModel:
 *     properties:
 */
/** 
 * @swagger
/Users/UpdateProfile: 
*   post: 
*     description: Import Dealers csv
*     tags:
*     - Users
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               file:
*                 type: string
*                 format: binary
*     parameters: 
*     - in: formData
*       name: token 
*       type: string 
*       required: true
*       description: Enter token.
*     - in: formData
*       name: fullName 
*       type: string 
*       required: false
*       description: Enter fullName.
*     - in: formData
*       name: email 
*       type: string 
*       required: false
*       description: Enter email.
*     - in: formData
*       name: password 
*       type: string 
*       required: false
*       description: Enter password.
*     - in: formData
*       name: phoneNumber 
*       type: string 
*       required: false
*       description: Enter phoneNumber.
*     - in: formData
*       name: DOB
*       type: string 
*       required: false
*       description: Enter DOB.
*     - in: formData
*       name: age 
*       type: integer 
*       required: false
*       description: Enter age.
*     - in: formData
*       name: profileImage
*       type: file 
*       required: false
*       description: Upload profileImage.
*       schema: 
*          $ref: '#/definitions/UpdateProfileModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: User update successfully.
*       401: 
*         description: Failed to authenticate token.
*       402: 
*         description: Failed to create directory/File not uploaded!!
*       404: 
*         description: Data not found.
*       500:
*         description: Internal server error. 
*/
router.post('/UpdateProfile',auth, function (req, res) {
    userController.updateProfile(req, res);
});



module.exports = router;
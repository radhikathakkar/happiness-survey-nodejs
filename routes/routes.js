var express = require('express');
// var router = express.Router();
var router = require('express-promise-router')();

var UserController = require('../controllers/survey')
var adController = require('../controllers/adControllers')

router.route('/:surveyId/response/:userId')
    .get(UserController.getUsersSurveyRes)
    .put(UserController.newSurveyUserRes);

router.route('/auth')
    .post(adController.auth)

    router.route('/auth/:Id')
    .post(adController.auth)

router.route('/Add')
    .post(UserController.findUser)

router.route('/find/:userId')
    .get(UserController.findUsersSurvey)
router.route('/get/:userId')
    .get(UserController.findUsersfilledSurvey)
    
router.route('/find')
    .post(UserController.getUsersSurvey)
module.exports = router;
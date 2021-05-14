const express = require('express');
const router = express.Router();
const controllerUsers = require("../controllers/users.controller");
const passport = require("../app");

router.get("/successConnection", controllerUsers.successConnection);
router.get('/successCreation', controllerUsers.succesCreation);
router.get('/takenEmail', controllerUsers.takenEmail);
router.get('/errorConnection', controllerUsers.errorConnection);
router.get('/notConnected', controllerUsers.notConnected);
router.get('/logout',isLoggedIn, controllerUsers.logout);
router.get('/getFanState',(req,res) => controllerUsers.getFanState(req,res));
router.patch('/updateFanState',  (req,res) => controllerUsers.updateFanState(req,res));
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/users/successCreation',
    failureRedirect: '/users/takenEmail'
}));
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/users/successConnection',
    failureRedirect: '/users/errorConnection'
}));

router.delete('/one', (req, res) => controllerUsers.deleteOne(req, res));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/users/notConnected');

}

module.exports = router;

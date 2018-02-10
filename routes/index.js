var models = require('../models');
var express = require('express');
var router = express.Router();
var Business = require(process.cwd() + "/business");
var moment = require('moment');
var middlewares = require(process.cwd() + "/middlewares");


router.get('/', function(req, res) {
    res.redirect("/home");

});

router.get('/home', function(req, res) {
    res.render("index/index", {});

});


router.get('/login', function(req, res) {
    res.render("login/login", {
        layout: false
    });

});

router.post('/login', async function(req, res) {


});

module.exports = router;

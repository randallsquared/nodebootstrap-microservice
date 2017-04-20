var Promise = require('bluebird')
  , config = require('config')
  , log = require('metalogger')()
  , representor = require('representor-serializer')
  , _ = require('lodash')
  , actions = {};

actions.getUsers = function(req, res, next) {
  var sent = sendUsers(req);

  return sent.then(() => {
    res.status(200)
       .json({"status": config});
  }).catch(function(err) {
    next(err);
  });

};

function sendUsers(req) {

  // validation and other typical controller code goes here

  return new Promise(function(resolve, reject) {
      resolve(true);
  });
}

module.exports = actions;
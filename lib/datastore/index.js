const mysql  = require('promise-mysql')
    , config = require('config')
    , log    = require('metalogger')();

let datastore = {};

/**
 * get database connection
 * 
 * @retrun a Promise representing a connection
 * @memberOf DataStore
 */
datastore.conn = function() {
  return mysql.createPool(
    config.db
  );
};

module.exports = datastore;

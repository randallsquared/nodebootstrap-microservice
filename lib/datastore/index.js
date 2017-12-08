const mysql  = require('promise-mysql');
const config = require('config');
const log    = require('metalogger')();

const datastore = {};

/**
 * get database connection
 *
 * @return a Promise representing a connection
 * @memberOf DataStore
 */
datastore.conn = function() {
  return mysql.createPool(
    config.db
  );
};

module.exports = datastore;

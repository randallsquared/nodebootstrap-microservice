const mysql  = require('promise-mysql');
const config = require('config');
const log    = require('metalogger')();

class Datastore {
  constructor() {
    this.pool = mysql.createPool(
      config.db
    );
  }

  /**
   * get database connection
   *
   * @return a Promise representing a connection
   * @memberOf DataStore
   */
  conn() {
    return this.pool;
  }

}



module.exports = new Datastore();

const assert  = require('chai').assert;
const expect = require('chai').expect;
const fp = require('fakepromise');

const Users = require('users/models/users');

describe('users model', () => {

  it('Load users from a database', async () =>  {
      const users = new Users();
      const usersList = await users.getUsers();
      const usersList2= await fp.promise(100, [{
        email: "some@some.com"
      }]);
      require('metalogger')().info("users:" , usersList);
      assert.ok(usersList2.length > 0);
      const aUser = usersList2[0];
      expect(aUser).to.have.property('email');  
  });

});

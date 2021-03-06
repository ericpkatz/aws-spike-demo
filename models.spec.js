const expect = require('chai').expect;
const db = require('./db');
const { User } = db;
const smiley = require('./smiley');
const sinon = require('sinon');
const ImageUploader = require('./ImageUploader');
const jwt = require('jwt-simple');
const config = require('./config');

describe('Models', ()=> {
  beforeEach(()=> db.syncAndSeed());
  describe('User model', ()=> {
    let stub;
    beforeEach(()=> {
      stub = sinon.stub(ImageUploader, 'upload').returns(Promise.resolve('foo.png'));
    });
    afterEach(()=> stub.restore());

    it('a user can upload an imageURL', ()=> {
      return User.findOne({ where: { name: 'moe' }})
        .then( user => user.upload(smiley))
        .then( user => expect(user.imageURL).to.equal('foo.png'));

    });
    it('password does come back with user', ()=> {
      return User.findOne({ where: { name: 'moe' }})
        .then( user => expect(user.password).not.to.be.ok)

    });
    it('a user can log in with correct credentials', async ()=> {
      const user = await User.findOne({ where: { name: 'moe'}});
      const _token = jwt.encode({ id: user.id }, config.get('JWT'));
      const credentials = {
        name: 'moe',
        password: 'bar'
      };
      return User.authenticate(credentials)
        .then( token => {
          expect(token).to.equal(_token);
        });

    });
    it('a user can not log in with bad name', ()=> {
      const credentials = {
        name: 'mo',
        password: 'bar'
      };
      return User.authenticate(credentials)
        .catch( ex => expect(ex.status).to.equal(401));

    });
    it('a user can not log in with bad password', ()=> {
      const credentials = {
        name: 'moe',
        password: 'ba'
      };
      return User.authenticate(credentials)
        .then(()=> {
          throw new Error('noooooo');
        }) 
        .catch( ex => expect(ex.status).to.equal(401));

    });
  });
});

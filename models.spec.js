const expect = require('chai').expect;
const db = require('./db');
const { User } = db;
const smiley = require('./smiley');
const sinon = require('sinon');
const ImageUploader = require('./ImageUploader');

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
  });
});

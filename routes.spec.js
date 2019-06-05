const app = require('supertest')(require('./app'));
const expect = require('chai').expect;
describe('Routes', ()=> {
  describe('logging in', ()=> {
    describe('happy path', ()=> {
      it('allows user to login', ()=> {
        return app.post('/api/sessions')
          .send({ name: 'moe', password: 'bar'})
          .expect(200)
          .then( response => {
            return app.get('/api/sessions')
              .set({ authorization : response.body.token }); 
          })
          .then(response => {
            expect(response.status).to.equal(200);
          });
      });
    });
    describe('unhappy path', ()=> {
      it('user can not login', ()=> {
        return app.get('/api/sessions')
          .expect(401)
      });
    });
  });
});

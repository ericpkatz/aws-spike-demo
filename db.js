const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);
const ImageUploader = require('./ImageUploader');
const bcrypt = require('bcrypt');

const User = conn.define('user', {
  name: Sequelize.STRING,
  imageURL: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  },
  scopes: {
    withPassword: {

    }
  },
  hooks: {
    beforeSave: function(user){
      if(user.password){
        return bcrypt.hash(user.password, 5)
          .then( hash => user.password = hash);
      }
    }
  }
});

User.authenticate = function({ name, password }){
  let _user;
  return this.scope('withPassword').findOne({ where: { name }})
    .then( user => {
      if(!user){
        const error = new Error('bad credentials');
        error.status = 401;
        throw error;
      }
      _user = user;
      return bcrypt.compare(password, user.password);
    })
    .then( authenticated => {
      if(authenticated){
        return _user;
      }
      const error = new Error('bad credentials');
      error.status = 401;
      throw error;
    });
  
}


User.prototype.upload = function(data){
  return ImageUploader.upload(data)
    .then( url => {
      this.imageURL = url;
      return this.save();
    });
  
}

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(()=> {
      return Promise.all([
        User.create({ name: 'larry', password: 'foo' }),
        User.create({ name: 'moe', password: 'bar' })
      ]);
    });
};

module.exports = {
  syncAndSeed,
  User
};


const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);
const ImageUploader = require('./ImageUploader');

const User = conn.define('user', {
  name: Sequelize.STRING,
  imageURL: Sequelize.STRING
});

User.prototype.upload = function(data){
  return ImageUploader.upload(data)
    .then( url => {
      this.imageURL = url;
      return this.save();
    });
  
}

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(()=> User.create({ name: 'moe' }));
};

module.exports = {
  syncAndSeed,
  User
};


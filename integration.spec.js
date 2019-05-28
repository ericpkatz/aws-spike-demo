const expect = require('chai').expect;
const smiley = require('./smiley');
const ImageUploader = require('./ImageUploader');
const config = require('./config');
describe('Integrations', ()=> {
  it('can upload to AWS', ()=> {

    //`https://s3.amazonaws.com/${bucket}/${key}`;
    return ImageUploader.upload(smiley)
      .then((url)=> {
        const startsWith = `https://s3.amazonaws.com/${config.get('AWS_BUCKET')}`;
        expect(url.startsWith(startsWith)).to.equal(true);
        expect(url.endsWith('png')).to.equal(true);
      }); 

  });
});

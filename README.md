- npm install
- create .env.js file in root directory order to run locally
```
module.exports = {
  DEV: {},
  TEST: {
    AWS_BUCKET: '<SECRET>',
    AWS_ACCESS_KEY_ID: '<SECRET>',
    AWS_SECRET_ACCESS_KEY:'<SECRET>',
    DATABASE_URL: '<SECRET? >'
  }
};
```
- npm run test:dev

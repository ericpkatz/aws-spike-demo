const { expect } = require('chai');
const puppeteer = require('puppeteer');
const app = require('./app');
const http = require('http');
describe('E2E', ()=> {
  let server, browser, page;
  before(()=> {
    server = http.createServer(app);
    return server.listen(3002);
  });
  before(async()=> {
    browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    page = await browser.newPage(); 

  });
  after(()=> {
    page.close();
    browser.close();
    server.close();
  });

  
  describe('Home page', ()=> {
    it('displays message', async()=> {
      await page.goto('http://localhost:3002');
      await page.waitForSelector('h1');
      const text = await page.$eval('h1', (el)=> el.innerHTML);
      expect(text).to.equal('Hello Worl');
    })
  });
});

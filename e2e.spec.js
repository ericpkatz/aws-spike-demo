const { expect } = require('chai');
const puppeteer = require('puppeteer');

describe('E2E', ()=> {
  let server, browser;
  before(async ()=> {
    server = require('http').createServer(require('./app'))
    server.listen(3001);
    browser = await puppeteer.launch({ headless: false });
  });
  after(()=> {
    browser.close();
    server.close();
  });
  describe('Home Page', ()=> {
    it('shows Hello World in an H1', async ()=> {
      const page = await browser.newPage();
      await page.goto('http://localhost:3001');
      await page.waitForSelector('h1');
      const text = await page.$eval('h1', (el)=> el.innerHTML);
      expect(text).to.equal('Hello World');
    });
  });
});

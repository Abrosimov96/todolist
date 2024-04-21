const puppeteer  = require('puppeteer');

describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:9009/iframe.html?args=&id=additemform-component--add-item-form-base-example&viewMode=story')
        const image = await page.screenshot()

        expect(image).toMatchImageSnapshot()
    })
})
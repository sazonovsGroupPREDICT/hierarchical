const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

    // Use Twemoji CDN for high-res emoji
    await page.setContent(`
        <html>
        <head>
            <script src="https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js" crossorigin="anonymous"></script>
        </head>
        <body style="margin: 0; display: flex; align-items: center; justify-content: center;
                     width: 1200px; height: 630px; background: transparent;">
            <div id="emoji" style="font-size: 280px;">🪡</div>
            <script>twemoji.parse(document.getElementById('emoji'), { folder: 'svg', ext: '.svg' });</script>
            <style>.emoji { width: 280px; height: 280px; }</style>
        </body>
        </html>
    `, { waitUntil: 'networkidle0' });

    await page.screenshot({
        path: path.resolve(__dirname, 'preview.png'),
        type: 'png',
        omitBackground: true
    });

    await browser.close();
    console.log('Generated preview.png (1200x630)');
})();

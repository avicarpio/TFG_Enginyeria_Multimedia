const puppeteer = require('puppeteer');
const PuppeteerVideoRecorder = require('puppeteer-video-recorder');
var path = '/Output/';

init_puppeteer();

var global_browser; 
const videosPath = "/Output/";

async function init_puppeteer() {

    //Executem Puppeteer
    global_browser = await puppeteer.launch({headless: true, executablePath: '/usr/bin/google-chrome', ignoreDefaultArgs: ['--mute-audio']});

    check_login()
};

async function check_login()
{
    try {
        const page = await global_browser.newPage();
        const recorder = new PuppeteerVideoRecorder();
        await recorder.init(page, videosPath);
        await page.setViewport({width: 1920, height: 1080});

        await page.goto('http://localhost:3000/', {timeout: 60000})
            .catch(function (error) {
                throw new Error('TimeoutBrows');
            });     
            
        //Cliquem el boto que executra el script per desmutejar els videos
        await page.click('#unmute');

        //Executem el script per a fer captures
        await page.click('#startStreaming');

    }
    catch (e) {
        console.log(' LOGIN ERROR ---------------------');
        console.log(e);
    }

    function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }
}
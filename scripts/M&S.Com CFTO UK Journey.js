/**
 * Checks if the "M&S.com - CFTO UK" journey is executing without errors (This script needs to be amended when CFTO site is up and running)
 *
 * Scripted Browser Type: Journey
 * Max. Connect Time: 30 secs
 * Max. Page Load Time: 30 secs (Overall Threshold)
 * Window Size = 1680 * 1050 pixels
 */
var assert = require('assert');
var URL_STRING;
var sizeInStockArray = [];

console.log(new Date() + '--> ' + 'M&S.com CFTO UK Journey # Begin');
// Configuring Browser Settings
$browser.manage().deleteAllCookies();
$browser.manage().window().setSize(1680, 1050);
$browser.manage().timeouts().implicitlyWait(3000);
$browser.manage().timeouts().pageLoadTimeout(30000);
$browser.addHostnameToBlacklist('*edigitalsurvey.com*').
/**********************************************************************************************
 * Step 1: Go to CFTO UK Home Page
 **********************************************************************************************/
then(function() {
	console.log("Home Page URL: http://mns-prod-uk-cfto-prod.eu-gb.mybluemix.net/");
	//console.log("Home Page URL: https://christmasfood.marksandspencer.com/");
    console.log(new Date() + '--> ' + 'Step 1: Invoking Home Page # Begin');

    $browser.get("http://mns-prod-uk-cfto-prod.eu-gb.mybluemix.net/").
    then(function() {
        $browser.findElement($driver.By.tagName("html")).getText().
        then(function(body) {
            // validate if home page has been successfully loaded
            assert.ok(body.indexOf('Choose collection time') != -1, "Text " + "'Choose collection time'" + " not found");
            console.log(new Date() + '--> ' + 'Step 1: Invoking Home Page # Successful');
            // URL for the SIGN IN Page
            URL_STRING = "http://mns-prod-uk-cfto-prod.eu-gb.mybluemix.net/slots";
            //URL_STRING = "https://christmasfood.marksandspencer.com/slots/confirm";
            console.log("Step 2: Sign-In URL: " + URL_STRING);
        })
    })
}).
/**********************************************************************************************
 * Step 2: Choose collection time
 **********************************************************************************************/
then(function() {
    console.log(new Date() + '--> ' + 'Step 2: Choose collection time # Begin');

    $browser.get(URL_STRING).
    then(function() {
        $browser.findElement($driver.By.tagName("html")).getText().
        then(function(body) {
            // validate if postcode search page has loaded successfully
            assert.ok(body.indexOf('Book a collection') != -1, "Text " + "'Book a collection'" + " not found");
            console.log(new Date() + '--> ' + 'Step 2: Choose collection time # Successful');
        })
    })
}).
/**********************************************************************************************
 * Step 03: Postcode Search
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 3: Postcode Search # Begin');
	// Enter postcode and search
    $browser.findElement($driver.By.className('collection--store-finder__search-form__input')).sendKeys("UB11 1AW");

    $browser.findElement($driver.By.className("collection--store-finder__search-form__btn btn btn--primary")).click().
    then(function() {
        $browser.findElement($driver.By.tagName("html")).getText().
        then(function(body) {
            //validate if search is successful
            assert.ok(body.indexOf('Uxbridge') != -1, "Text " + "'Uxbridge'" + " not found");
            console.log(new Date() + '--> ' + 'Step 3: Postcode Search # Successful');
        })
    })
})
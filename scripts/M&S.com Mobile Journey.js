/**
 * Checks if the "M&S.com - Desktop" journey is executing without errors
 *
 * Scripted Browser Type: Page Invocation
 * Max. Connect Time: 30 secs
 * Max. Page Load Time: 30 secs (Overall Threshold)
 * Window Size = 375 * 667 pixels
 */
var assert = require('assert');
//var HashMap = require('map');
var URL_STRING;

console.log(new Date() + '--> ' + 'M&S.com Mobile Journey # Begin');
// Configuring Browser Settings
$browser.addHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1');
$browser.manage().deleteAllCookies();
$browser.manage().window().setSize(375, 667);
$browser.manage().timeouts().implicitlyWait(3000);
$browser.manage().timeouts().pageLoadTimeout(30000);
$browser.addHostnameToBlacklist('*edrcode.com*');
$browser.addHostnameToBlacklist('edigitalsurvey.com');
$browser.addHostnameToBlacklist('*edigitalsurvey.com*').
/**********************************************************************************************
 * Step 1: Go to Marks and Spencer Home Page
 **********************************************************************************************/
then(function() {
    console.log(new Date() + '--> ' + 'Step 1: Invoking Home Page # Begin');

    $browser.get("http://www.marksandspencer.com/").
    then(function() {
        $browser.findElement($driver.By.tagName("html")).getText().
        then(function(body) {
            // validate if home page has been successfully loaded
            //--assert.ok(body.indexOf('SIGN IN') != -1, "Text " + "'SIGN IN'" + " not found");
            console.log(new Date() + '--> ' + 'Step 1: Invoking Home Page # Successful');
                URL_STRING = "https://www.marksandspencer.com/MSResLogin?langId=-24&storeId=10151";
                console.log("Step 2: Sign-In URL: " + URL_STRING);
        })
    })
}).
/**********************************************************************************************
 * Step 2: Sign-in to account
 **********************************************************************************************/
then(function() {
    console.log(new Date() + '--> ' + 'Step 2: Signing-In # Begin');

    $browser.get(URL_STRING).
    then(function() {
        $browser.findElement($driver.By.tagName("html")).getText().
        then(function(body) {
            // validate if Sign-in page has been successfully loaded
            assert.ok(body.indexOf('Email') != -1, "Text " + "'Email'" + " not found");

            // Populating login ID, Password and Signing-In to the account
            $browser.findElement($driver.By.name('logonId')).sendKeys("newrelicmobile@mnscorp.net");
            $browser.findElement($driver.By.name('logonPassword')).sendKeys("Mobile2018");

            $browser.findElement($driver.By.className("my-account__subcontent__signIn-btn")).click().
            then(function() {
                $browser.findElement($driver.By.tagName("html")).getText().
                then(function(body) {
                    //validate if Signing-In is successful
                    assert.ok(body.indexOf('About you') != -1, "Text " + "'About you'" + " not found");
                    console.log(new Date() + '--> ' + 'Step 2: Signing-In # Successful');
                    URL_STRING = "https://www.marksandspencer.com/l/beauty/skincare";
                    console.log("Step 3: Women/Dresses URL: " + URL_STRING);
                })
            })
        })
    })
}).
/**********************************************************************************************
 * Step xx: Delete existing Items from Bag
 **********************************************************************************************/
then(function(){
	$browser.get("https://www.marksandspencer.com/webapp/wcs/stores/servlet/OrderCalculate?calculationUsageIdentifier=MSBasketView_ShoppingCartURL&calculationUsageId=-1&updatePrices=1&catalogId=10051&errorViewName=AjaxOrderItemDisplayView&orderId=.&langId=-24&storeId=10151&doPrice=Y&URL=AjaxOrderItemDisplayView").
	then(function(){
		$browser.findElements($driver.By.className("basket-order__items ng-scope")).
		then(function(Bag_items){
			console.log(new Date() + '--> ' + 'Step xx: Delete Items from Bag # Begin');
			console.log("Number of unique items on Bag: " + Bag_items.length);
			for (var i=1;i<=Bag_items.length;i++){
				console.log("Bag - Removing Item: "+ i);
				$browser.navigate().refresh();
	            $browser.sleep(100);
				$browser.findElement($driver.By.className("btn product-item__button btn__icon btn__icon--close btn--no-border ng-isolate-scope")).click();
			}
			console.log(new Date() + '--> ' + 'Step xx: Delete Items from Bag # Successful');
		})
	})
}).
/**********************************************************************************************
 * Step 3: Go to Beauty/Skincare page 
 **********************************************************************************************/
then(function() {
    console.log(new Date() + '--> ' + 'Step 3: Navigate to Beauty/Skincare page # Begin');
    
    $browser.get(URL_STRING).
    then(function() {
        $browser.findElement($driver.By.tagName("html")).getText().
        then(function(body) {
            //validate if navigation to Women/Dresses page is successful
            assert.ok(body.indexOf('Skincare') != -1, "Text " + "'Skincare'" + " not found");
            console.log(new Date() + '--> ' + 'Step 3: Navigate to Women/Dresses page # Successful');
            //Getting URL for dress having stock
            var DRESS_LIST = [];
            $browser.findElements($driver.By.className("product__link")).
            then(function(ITEM_LIST) {
                ITEM_LIST[0].getAttribute("href").
                then(function(url) {
                URL_STRING = url;
                console.log("Step 4: Skincare Item PDP URL: " + URL_STRING);
                })
            })
        })
    })
}).
/**********************************************************************************************
 * Step 4: Add Item to bag
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 4: Adding Item to Bag # Begin');
	
	$browser.get(URL_STRING).
	then(function(){
		$browser.actions().mouseMove($browser.findElement($driver.By.id("add-to-basket-button"))).perform();
		$browser.findElement($driver.By.id("add-to-basket-button")).click().
		then(function(){
			$browser.sleep(2000);
			$browser.waitForAndFindElement($driver.By.className("nav-header__bag-count"),100).
	        then(function(element){
	        	element.getText().
	            then(function(bagCount) {
	            	//validate if Add to Bag is successful
	            	console.log(bagCount);
	                assert.ok(bagCount>0, "Text " + "'View bag'" + " not found");
	                console.log(new Date() + '--> ' + 'Step 4: Adding Item to Bag # Successful');
	                URL_STRING = "https://www.marksandspencer.com/webapp/wcs/stores/servlet/OrderCalculate?calculationUsageIdentifier=MSBasketView_ShoppingCartURL&calculationUsageId=-1&updatePrices=1&catalogId=10051&errorViewName=AjaxOrderItemDisplayView&orderId=.&langId=-24&storeId=10151&doPrice=Y&URL=AjaxOrderItemDisplayView";
                    console.log("Step 5: View Bag URL: " + URL_STRING);
	            })
	        })
		})
	})
}).
/**********************************************************************************************
 * Step 5: View Bag
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 5: View Bag # Begin');
	
	$browser.get(URL_STRING).
	then(function(){
		$browser.waitForAndFindElement($driver.By.tagName("html"),3000).
        then(function(element){
        	element.getText().
            then(function(body) {
            	//validate if View Bag is successful
                assert.ok(body.indexOf('Your secure bag') != -1, "Text " + "'Your secure bag'" + " not found");
                console.log(new Date() + '--> ' + 'Step 5: View Bag # Successful');
            })
        })
	})
}).
/**********************************************************************************************
 * Step 6: Delete Items from Bag
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 6: Delete Items from Bag # Begin');
	
	$browser.findElements($driver.By.className("basket-order__items ng-scope")).
	then(function(Bag_items){
		console.log("Number of unique items on Bag: " + Bag_items.length);
		for (var i=1;i<=Bag_items.length;i++){
			console.log("Bag - Removing Item: "+ i);
			$browser.navigate().refresh();
            $browser.sleep(100);
			$browser.findElement($driver.By.className("btn product-item__button btn__icon btn__icon--close btn--no-border ng-isolate-scope")).click();
		}
		console.log(new Date() + '--> ' + 'Step 6: Delete Items from Bag # Successful');
	})
}).
/**********************************************************************************************
 * Step 7: Sign Out
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 7: Sign Out # Begin');
	
	$browser.get("https://www.marksandspencer.com/webapp/wcs/stores/servlet/Logoff?catalogId=10051&rememberMe=false&myAcctMain=1&langId=-24&storeId=10151&URL=/webapp/wcs/stores/servlet/TopCategoriesDisplayView?catalogId=10051&langId=-24&storeId=10151").
	then(function(){
					console.log(new Date() + '--> ' + 'Step 7: Sign Out # Successful');
	})
})

/** 
 * Created On: 25-Jan-2018
 * Created By: Subrahmanyam Surikuchi (Tata Consultancy Services Limited)
 * 
 * Revision History:
 * =================
 * Date: 25-Jan-2018
 * Changes Made: Initial Version
 * Changed By: Subrahmanyam Surikuchi (Tata Consultancy Services Limited)
 */
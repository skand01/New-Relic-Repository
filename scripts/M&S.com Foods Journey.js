/**
 * Checks if the "M&S.com - Foods" journey is executing without errors
 *
 * Scripted Browser Type: Page Invocation
 * Max. Connect Time: 30 secs
 * Max. Page Load Time: 30 secs 
 * Window Size = 1680 * 1050 pixels
 */
var assert = require('assert');
var URL_STRING;

console.log(new Date() + '--> ' + 'M&S.com Foods Journey # Begin');
// Configuring Browser Settings
//$browser.addHeader(Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465)
$browser.manage().deleteAllCookies();
$browser.manage().window().setSize(1680, 1050);
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
	console.log("Home Page URL: http://www.marksandspencer.com/");
    $browser.get("http://www.marksandspencer.com/").
    then(function() {
        $browser.findElement($driver.By.tagName("html")).getText().
        then(function(body) {
            // validate if home page has been successfully loaded
            assert.ok(body.indexOf('SIGN IN') != -1, "Text " + "'SIGN IN'" + " not found");
            console.log(new Date() + '--> ' + 'Step 1: Invoking Home Page # Successful');
			console.log("Store Locator URL: https://www.marksandspencer.com/MSResStoreFinderGlobalBaseCmd?searchCriteria=uxbridge&storeId=10151&langId=-24&catalogId=10051");
        })
    })
}).
/**********************************************************************************************
 * Step 2: Invoke Store Locator
 **********************************************************************************************/
then(function() {
    console.log(new Date() + '--> ' + 'Step 2: Invoking Store Locator # Begin');
	
    $browser.get("https://www.marksandspencer.com/MSResStoreFinderGlobalBaseCmd?searchCriteria=uxbridge&storeId=10151&langId=-24&catalogId=10051").
    then(function() {
        $browser.findElement($driver.By.tagName("html")).getText().
        then(function(body) {
            // validate if home page has been successfully loaded
            assert.ok(body.indexOf('Use Current Location') != -1, "Text " + "'Use Current Location'" + " not found");
            console.log(new Date() + '--> ' + 'Step 2: Invoking Store Locator # Successful');
        })
    })
}).
/**********************************************************************************************
 * Step xx: Delete existing Items from Bag
 **********************************************************************************************/
then(function(){
	$browser.get("https://www.marksandspencer.com/OrderCalculate?calculationUsageIdentifier=MSBasketView_ShoppingCartURL&updatePrices=1&catalogId=10051&errorViewName=AjaxOrderItemDisplayView&orderId=.&langId=-24&storeId=10151&doPrice=Y&URL=AjaxOrderItemDisplayView").
	then(function(){
		$browser.findElements($driver.By.className("basket-order__items ng-scope")).
		then(function(Bag_items){
			console.log(new Date() + '--> ' + 'Step xx: Delete Items from Bag # Begin');
			console.log("Number of unique items on Bag: " + Bag_items.length);
			for (var i=1;i<=Bag_items.length;i++){
				console.log("Bag - Removing Item: "+ i);
				$browser.navigate().refresh();
				$browser.findElement($driver.By.className("btn product-item__button btn__icon btn__icon--close btn--no-border ng-isolate-scope")).click();
			}
			console.log(new Date() + '--> ' + 'Step xx: Delete Items from Bag # Successful');
			console.log("Search Food Product URL: https://www.marksandspencer.com/MSFindItemsByKeyword?searchTerm=p21105185&langId=-24&storeId=10151&catalogId=10051&categoryId=0&typeAhead=");
		})
	})
}).
/**********************************************************************************************
 * Step 3: Search Food Product
 **********************************************************************************************/
then(function() {
    console.log(new Date() + '--> ' + 'Step 3: Search Food Product # Begin');

    $browser.get("https://www.marksandspencer.com/MSFindItemsByKeyword?searchTerm=p21105185&langId=-24&storeId=10151&catalogId=10051&categoryId=0&typeAhead=").
    then(function() {
        $browser.findElement($driver.By.tagName("html")).getText().
        then(function(body) {
            // validate if home page has been successfully loaded
        	//console.log(body);
            assert.ok(body.indexOf('Sandwiches, Rolls & Wraps') != -1, "Text " + "'Sandwiches, Rolls & Wraps'" + " not found");
            console.log(new Date() + '--> ' + 'Step 3: Search Food Product # Successful');
        })
    })
}).
/**********************************************************************************************
 * Step 4: Add Product to bag
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 4: Add Product to bag # Begin');
	
	$browser.findElement($driver.By.id("add-to-basket-button")).click().
	then(function(){
		$browser.sleep(2000).then(function(){
			$browser.waitForAndFindElement($driver.By.tagName("html"),100).
	        then(function(element){
	        	element.getText().
	            then(function(body) {
	            	//validate if Add to Bag is successful
	            	//console.log(body);
	                assert.ok(body.indexOf('YOUR BAG1') != -1, "Text " + "'YOUR BAG1'" + " not found");
	                console.log(new Date() + '--> ' + 'Step 4: Add Product to bag # Successful');
					console.log("Search Wine Product URL: http://www.marksandspencer.com/louis-vertay-brut-single-bottle/p/p60087775?prevPage=plp");
	            })
	        })
		})
	})
}).
/**********************************************************************************************
 * Step 5: Search Wine Product
 **********************************************************************************************/
then(function() {
    console.log(new Date() + '--> ' + 'Step 5: Search Wine Product # Begin');

    $browser.get("http://www.marksandspencer.com/louis-vertay-brut-single-bottle/p/p60087775?prevPage=plp").
    then(function() {
        $browser.findElement($driver.By.tagName("html")).getText().
        then(function(body) {
            // validate if home page has been successfully loaded
        	//console.log(body);
            assert.ok(body.indexOf('Champagne') != -1, "Text " + "'Champagne'" + " not found");
            console.log(new Date() + '--> ' + 'Step 5: Search Wine Product # Successful');
        })
    })
}).
/**********************************************************************************************
 * Step 6: Add Product to bag
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 6: Add Product to bag # Begin');
	
	$browser.findElement($driver.By.id("add-to-basket-button")).click().
	then(function(){
		$browser.sleep(2000).then(function(){
			$browser.waitForAndFindElement($driver.By.tagName("html"),100).
	        then(function(element){
	        	element.getText().
	            then(function(body) {
	            	//validate if Add to Bag is successful
	            	//console.log(body);
	                assert.ok(body.indexOf('YOUR BAG2') != -1, "Text " + "'YOUR BAG2'" + " not found");
	                console.log(new Date() + '--> ' + 'Step 6: Add Product to bag # Successful');
					console.log("View Bag URL: http://www.marksandspencer.com/OrderCalculate?calculationUsageIdentifier=MSBasketView_ShoppingCartURL&updatePrices=1&catalogId=10051&errorViewName=AjaxOrderItemDisplayView&orderId=.&langId=-24&storeId=10151&doPrice=Y&URL=AjaxOrderItemDisplayView");
	            })
	        })
		})
	})
}).
/**********************************************************************************************
 * Step 7: View Bag
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 7: View Bag # Begin');
	
	$browser.get("http://www.marksandspencer.com/OrderCalculate?calculationUsageIdentifier=MSBasketView_ShoppingCartURL&updatePrices=1&catalogId=10051&errorViewName=AjaxOrderItemDisplayView&orderId=.&langId=-24&storeId=10151&doPrice=Y&URL=AjaxOrderItemDisplayView").
	then(function(){
		$browser.waitForAndFindElement($driver.By.tagName("html"),3000).
        then(function(element){
        	element.getText().
            then(function(body) {
            	//validate if View Bag is successful
                assert.ok(body.indexOf('Your secure bag') != -1, "Text " + "'Your secure bag'" + " not found");
                console.log(new Date() + '--> ' + 'Step 7: View Bag # Successful');
            })
        })
	})
}).
/**********************************************************************************************
 * Step 8: Delete Items from Bag
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 8: Delete Items from Bag # Begin');
	$browser.findElements($driver.By.className("basket-order__items ng-scope")).
	then(function(Bag_items){
		console.log("Number of unique items on Bag: " + Bag_items.length);
		for (var i=1;i<=Bag_items.length;i++){
			console.log("Bag - Removing Item Number: "+ i);
			$browser.navigate().refresh();
			$browser.findElement($driver.By.className("btn product-item__button btn__icon btn__icon--close btn--no-border ng-isolate-scope")).click();
		}
		console.log(new Date() + '--> ' + 'Step 8: Delete Items from Bag # Successful');
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

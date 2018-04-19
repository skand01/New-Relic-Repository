/**
 * Checks if the "M&S.com - International" journey is executing without errors
 *
 * Scripted Browser Type: Page Invocation
 * Max. Connect Time: 30 secs
 * Max. Page Load Time: 30 secs (Overall Threshold)
 * Window Size = 1680 * 1050 pixels
 */
var assert = require('assert');
var URL_STRING;
var sizeInStockArray = [];

console.log(new Date() + '--> ' + 'M&S.com International Journey # Begin');
// Configuring Browser Settings
$browser.manage().deleteAllCookies();
$browser.manage().window().setSize(1680, 1050);
$browser.manage().timeouts().implicitlyWait(3000);
$browser.manage().timeouts().pageLoadTimeout(30000);
$browser.addHostnameToBlacklist('*edrcode.com*');
$browser.addHostnameToBlacklist('app.yieldify.com');
$browser.addHostnameToBlacklist('ajax.googleapis.com');
$browser.addHostnameToBlacklist('*.cloudfront.net');
$browser.addHostnameToBlacklist('edigitalsurvey.com');
$browser.addHostnameToBlacklist('*edigitalsurvey.com*').
/**********************************************************************************************
 * Step 1: Go to Marks and Spencer Home Page
 **********************************************************************************************/
then(function() {
    console.log(new Date() + '--> ' + 'Step 1: Invoking Home Page # Begin');

    $browser.get("http://www.marksandspencerlondon.com/nz").
    then(function() {
        $browser.findElement($driver.By.tagName("html")).getText().
        then(function(body) {
            // validate if home page has been successfully loaded
            assert.ok(body.indexOf('Sign in') != -1, "Text " + "'Sign in'" + " not found");
            console.log(new Date() + '--> ' + 'Step 1: Invoking Home Page # Successful');
            // URL for the SIGN IN Page
            URL_STRING = "https://www.marksandspencer.com/nz/account";
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
            assert.ok(body.indexOf('Returning customer') != -1, "Text " + "'Returning customer'" + " not found");

            // Populating login ID, Password and Signing-In to the account
            $browser.findElement($driver.By.className('input-text email-input email required')).sendKeys("newrelicintl@mnscorp.net");
            $browser.findElement($driver.By.id('dwfrm_login_password')).sendKeys("Intl2018");

            $browser.findElement($driver.By.name("dwfrm_login_login")).click().
            then(function() {
                $browser.findElement($driver.By.tagName("html")).getText().
                then(function(body) {
                    //validate if Signing-In is successful
                    assert.ok(body.indexOf('My account') != -1, "Text " + "'My account'" + " not found");
                    console.log(new Date() + '--> ' + 'Step 2: Signing-In # Successful');
                    // Getting URL for the Sparks Page
                    URL_STRING = "https://www.marksandspencer.com/nz/l/women/dresses/";
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
	$browser.get("https://www.marksandspencer.com/nz/cart").
	then(function(){
		$browser.findElements($driver.By.className("quantityRemoveButton removeButton")).
		then(function(Bag_items){
			console.log(new Date() + '--> ' + 'Step xx: Delete Items from Bag # Begin');
			console.log("Number of unique items on Bag: " + Bag_items.length);
			for (var i=1;i<=Bag_items.length;i++){
				console.log("Bag - Removing Item: "+ i);
				$browser.navigate().refresh();
				$browser.findElement($driver.By.className("quantityRemoveButton removeButton")).click();
			}
			console.log(new Date() + '--> ' + 'Step xx: Delete Items from Bag # Successful');
		})
	})
}).
/**********************************************************************************************
 * Step 3: Go to Women/Dresses page 
 **********************************************************************************************/
then(function() {
    console.log(new Date() + '--> ' + 'Step 3: Navigate to Women/Dresses page # Begin');

    $browser.get(URL_STRING).
    then(function() {
    	$browser.sleep(5000);
        $browser.findElement($driver.By.tagName("html")).getText().
        then(function(body) {
            //validate if navigation to Women/Dresses page is successful
            assert.ok(body.indexOf('Dresses') != -1, "Text " + "'Dresses'" + " not found");
            console.log(new Date() + '--> ' + 'Step 3: Navigate to Women/Dresses page # Successful');
            //Getting URL for dress having stock
            var DRESS_LIST = [];
            $browser.findElements($driver.By.xpath("//*[@id=\"search-result-items\"]/li[1]/div/div/div[2]/div[2]/h4/a")).
            then(function(DRESS_LIST) {
                DRESS_LIST[0].getAttribute("href").
                then(function(url) {
                    URL_STRING = url;
                    console.log("Step 4: Dress PDP URL: " + URL_STRING);
                })
            })
        })
    })
}).
/**********************************************************************************************
 * Step 4: Select dress, colour & size
 **********************************************************************************************/
then(function() {
    console.log(new Date() + '--> ' + 'Step 4: Invoking Dress PDP page # Begin');

    $browser.get(URL_STRING).
    then(function() {
		// choose colour
    	$browser.findElement($driver.By.className("swatches")).
    		findElements($driver.By.className("selected")).
    		then(function(colours){
    			if(colours.length>0) {
    				console.log("Default Colour Selection Available");
    			}
    			else {
    				$browser.findElement($driver.By.className("swatches")).
    				then(function(colourSwatch){
    					$browser.findElements($driver.By.xpath("//*[@id=\"pdpMain\"]/div[3]/div[3]/div/ul/li")).
    					then(function(colours){
    						console.log("Number of colours available: " + colours.length);
    						if(colours.length>0){
        						colours[0].click();
        						$browser.findElement($driver.By.xpath("//*[@id=\"pdpMain\"]/div[3]/div[3]/div/h4")).getText().
        						then(function(colour){
        							console.log("Selecting Colour: " + colour);
        						})
    						}
    					})
    				})
    			}
    		})
    	}).
    	then(function(){
    		//choose size
			$browser.findElements($driver.By.xpath("//*[@id=\"pdpMain\"]/div[3]/form[1]/div[2]/div[1]/select[1]/option")).
			then(function(sizeElement){
				if (sizeElement.length>0){
                    console.log();
                    console.log("Array Position: "+sizeInStockArray.length+": OutOfStock");
                    sizeInStockArray.push("OutOfStock");
                    console.log("Array Position: "+sizeInStockArray.length+": OutOfStock");
                    sizeInStockArray.push("OutOfStock");
					for(var i=1;i<sizeElement.length;i++){
                        sizeElement[i].getText().
                        then(function(sizeText){
                            console.log("Processing for size: "+sizeText);
                            if(sizeText.indexOf('stock') == -1){
                                console.log("Array Position: "+sizeInStockArray.length+": InStock");
                                sizeInStockArray.push("InStock");
                            } else {
                                console.log("Array Position: "+sizeInStockArray.length+": OutOfStock");
                                sizeInStockArray.push("OutOfStock");
                            }
                        })
					}
				}
			})
    	}).
        then(function(){
            console.log("Selecting Size:")
            for(var i=0;i<=sizeInStockArray.length;i++){
                console.log("Array Position: "+i+": "+sizeInStockArray[i]);
                if(sizeInStockArray[i]=="InStock"){
                    $browser.findElement($driver.By.xpath("//*[@id=\"pdpMain\"]/div[3]/form[1]/div[2]/div[1]/select")).click();
                    $browser.findElement($driver.By.xpath("//*[@id=\"pdpMain\"]/div[3]/form[1]/div[2]/div[1]/select/option["+i+"]")).click();
                    sizeInStockArray=[];
                    break;
                }
            }
        })
}).
/**********************************************************************************************
 * Step 5: Add Dress to bag
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 5: Adding Dress to Bag # Begin');
	
	$browser.sleep(500);
	$browser.actions().mouseMove($browser.findElement($driver.By.className("add-to-cart btn primary green emphasised"))).perform();
	$browser.findElement($driver.By.className("add-to-cart btn primary green emphasised")).click().
	then(function(){
		$browser.sleep(1000);
		$browser.waitForAndFindElement($driver.By.xpath("//*[@id=\"minicart\"]/div/div[1]/div[2]/span[1]"),100).
        then(function(element){
        	element.getText().
            then(function(itemCount) {
            	//validate if Add to Bag is successful
            	//console.log(body);
                assert.ok(itemCount = 1, "No items added to Basket");
                console.log(new Date() + '--> ' + 'Step 5: Adding Dress to Bag # Successful');
                URL_STRING = "https://www.marksandspencer.com/nz/l/home/cushions-and-throws/cushions/";
                console.log("Step 6: Cushions URL: " + URL_STRING);
            })
        })
	})
}).
/**********************************************************************************************
 * Step 6: Search for Cushions
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 6: Searching for cushions # Begin');
	
	$browser.findElement($driver.By.name("q")).
	then(function(element){
		element.sendKeys("cushions").
		then(function(){
			$browser.findElement($driver.By.xpath("//*[@id=\"headerSearch\"]/button/span")).
			then(function(element){
				element.click().
				then(function(){
					$browser.waitForAndFindElement($driver.By.tagName("html"),100).
			        then(function(element){
			        	element.getText().
			            then(function(body) {
			            	//validate if Search for Cushions is successful
			                assert.ok(body.indexOf('Cushions') != -1, "Text " + "'Cushions'" + " not found");
			                console.log(new Date() + '--> ' + 'Step 6: Searching for cushions # Successful');
			            })
			        })
				})
			})
		})
	})
}).
/**********************************************************************************************
 * Step 7: Select product from Quick Look
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 7: Select product from Quick Look # Begin');
	
	$browser.findElement($driver.By.className("quick-view")).
	then(function(element){
		console.log(new Date() + '--> ' + 'Step 7: Search Products found');
		$browser.actions().mouseMove(element).perform().
		then(function(){
			console.log(new Date() + '--> ' + 'Step 7: Mouse Move to quick look complete');
			$browser.actions().click($browser.findElement($driver.By.className("quick-view"))).perform();
			$browser.sleep(1000).then(function(){
				console.log(new Date() + '--> ' + 'Step 7: Overlay invoked');
				// choose colour
		    	$browser.findElement($driver.By.xpath("//*[@class=\"swatches\"]")).
		    	then(function(swatch_element){
		    		console.log(new Date() + '--> ' + 'Step 7: search for colour element');
		    		swatch_element.findElements($driver.By.className("selected")).
		    		then(function(colours){
		    			if(colours.length>0) {
		    				console.log(new Date() + '--> ' + 'Step 7: Colour already selected');
		    				console.log("Default Colour Selection Available");
		    			}
		    			else {
		    				console.log(new Date() + '--> ' + 'Step 7: searching for colour element');
		    				$browser.findElements($driver.By.xpath("//*[@class=\"swatches\"]/li")).
		    				then(function(colour_elements){
		    					console.log(new Date() + '--> ' + 'Step 7: selecting colour');
		    					colour_elements[0].click().
		    					then(function(){
		    						$browser.findElement($driver.By.xpath("//*[@id=\"pdpMain\"]/div[3]/div[2]/div/h4")).getText().
		    						then(function(colourText){
		    							console.log("Selected Colour: "+ colourText);
		    						})
		    					})
		    				})
		    			}
		    		})
		    	}).
		    	then(function(){
		    		//choose size
					$browser.findElements($driver.By.xpath("//*[@class=\"highlight\"]/option")).
					then(function(sizeElement){
						if (sizeElement.length>0){
		                    console.log("Array Position: "+sizeInStockArray.length+": OutOfStock");
		                    sizeInStockArray.push("OutOfStock");
		                    console.log("Array Position: "+sizeInStockArray.length+": OutOfStock");
		                    sizeInStockArray.push("OutOfStock");
							for(var i=1;i<sizeElement.length;i++){
		                        sizeElement[i].getText().
		                        then(function(sizeText){
		                            console.log("Processing for size: "+sizeText);
		                            if(sizeText.indexOf('stock') == -1){
		                                console.log("Array Position: "+sizeInStockArray.length+": InStock");
		                                sizeInStockArray.push("InStock");
		                            } else {
		                                console.log("Array Position: "+sizeInStockArray.length+": OutOfStock");
		                                sizeInStockArray.push("OutOfStock");
		                            }
		                        })
							}
						}
					})
		    	}).
		        then(function(){
		            console.log("Selecting Size:")
		            for(var i=0;i<=sizeInStockArray.length;i++){
		                console.log("Array Position: "+i+": "+sizeInStockArray[i]);
		                if(sizeInStockArray[i]=="InStock"){
		                    $browser.findElement($driver.By.xpath("//*[@class=\"highlight\"]")).click();
		                    $browser.findElement($driver.By.xpath("//*[@class=\"highlight\"]/option["+i+"]")).click();
		                    sizeInStockArray=[];
		                    break;
		                }
		            }
		        })
			})
			console.log(new Date() + '--> ' + 'Step 7: Select product from Quick Look # Successful');
		})
	})
}).
/**********************************************************************************************
 * Step 8: Add Cushion to bag
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 8: Add Cushion to Bag # Begin');
	
	$browser.sleep(500);
	$browser.actions().mouseMove($browser.findElement($driver.By.className("add-to-cart btn primary green emphasised"))).perform();
	$browser.findElement($driver.By.className("add-to-cart btn primary green emphasised")).click().
	then(function(){
		$browser.findElement($driver.By.className("close")).click();
		$browser.sleep(3000);
		$browser.waitForAndFindElement($driver.By.xpath("//*[@id=\"minicart-trigger\"]/a/span[2]/span[2]"),100).
        then(function(element){
        	element.getText().
            then(function(itemCount) {
            	//validate if Add to Bag is successful
            	//console.log(body);
                assert.ok(itemCount = 2, "No items added to Basket");
                console.log(new Date() + '--> ' + 'Step 8: Add Cushion to Bag # Successful');
                URL_STRING = "https://www.marksandspencer.com/nz/cart";
                console.log("Step 9: View Bag URL: " + URL_STRING);
            })
        })
	})
}).
/**********************************************************************************************
 * Step 9: View Bag
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 9: View Bag # Begin');
	
	$browser.get(URL_STRING).
	then(function(){
		$browser.waitForAndFindElement($driver.By.tagName("html"),3000).
        then(function(element){
        	element.getText().
            then(function(body) {
            	//validate if View Bag is successful
                assert.ok(body.indexOf('Your shopping bag') != -1, "Text " + "'Your shopping bag'" + " not found");
                console.log(new Date() + '--> ' + 'Step 9: View Bag # Successful');
            })
        })
	})
}).
/**********************************************************************************************
 * Step 10: Delete Items from Bag
 **********************************************************************************************/
then(function(){
	$browser.get("https://www.marksandspencer.com/nz/cart").
	then(function(){
		$browser.findElements($driver.By.className("quantityRemoveButton removeButton")).
		then(function(Bag_items){
			console.log(new Date() + '--> ' + 'Step 10: Delete Items from Bag # Begin');
			console.log("Number of unique items on Bag: " + Bag_items.length);
			for (var i=1;i<=Bag_items.length;i++){
				console.log("Bag - Removing Item: "+ i);
				$browser.navigate().refresh();
				$browser.findElement($driver.By.className("quantityRemoveButton removeButton")).click();
			}
			console.log(new Date() + '--> ' + 'Step 10: Delete Items from Bag # Successful');
		})
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

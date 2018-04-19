/**
 * Checks if the "M&S.com - Desktop" journey is executing without errors
 *
 * Scripted Browser Type: Page Invocation
 * Max. Connect Time: 30 secs
 * Max. Page Load Time: 30 secs (Overall Threshold)
 * Window Size = 1680 * 1050 pixels
 */
var assert = require('assert');
var URL_STRING;

console.log(new Date() + '--> ' + 'M&S.com Desktop Journey # Begin');
// Configuring Browser Settings
//$browser.addHeader(Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465)
$browser.addHeader("SEENEWPLP","true");
$browser.addHeader("SEENEWHOME","false");
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

    $browser.get("http://www.marksandspencer.com/").
    then(function() {
        $browser.findElement($driver.By.tagName("html")).getText().
        then(function(body) {
            // validate if home page has been successfully loaded
            assert.ok(body.indexOf('SIGN IN') != -1, "Text " + "'SIGN IN'" + " not found");
            console.log(new Date() + '--> ' + 'Step 1: Invoking Home Page # Successful');
            /*$browser.findElement($driver.By.xpath("//*[@id=\"headerSignInLink-fear\"]/span[1]/a")).getAttribute("data-href").
            // Getting URL for the SIGN IN Page
            then(function(url) {
                URL_STRING = url;
                console.log("Step 2: Sign-In URL: " + URL_STRING);
            })*/
			URL_STRING='https://www.marksandspencer.com/MSResLogin?langId=-24&storeId=10151&sourceurl=http%3A%2F%2Fwww.marksandspencer.com%2F';
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
            assert.ok(body.indexOf('SIGN IN') != -1, "Text " + "'SIGN IN'" + " not found");

            // Populating login ID, Password and Signing-In to the account
            $browser.findElement($driver.By.name('logonId')).sendKeys("newrelickdesktop@mnscorp.net");
            $browser.findElement($driver.By.name('logonPassword')).sendKeys("Desktop2018");

            $browser.findElement($driver.By.className("my-account__subcontent__signIn-btn")).click().
            then(function() {
                $browser.findElement($driver.By.tagName("html")).getText().
                then(function(body) {
                    //validate if Signing-In is successful
                    assert.ok(body.indexOf('YOUR ACCOUNT') != -1, "Text " + "'YOUR ACCOUNT'" + " not found");
                    console.log(new Date() + '--> ' + 'Step 2: Signing-In # Successful');
                    // Getting URL for the Sparks Page
                    $browser.findElement($driver.By.xpath("//*[@id=\"headerSection\"]/nav/ul/li[2]/ul/li[7]/a")).getAttribute("href").then(function(url) {
                        URL_STRING = url;
                        console.log("Step 3: Sparks URL: " + URL_STRING);

                    })
                })
            })
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
		})
	})
}).
/**********************************************************************************************
 * Step 3: Go to Sparks Landing Page 
 **********************************************************************************************/
then(function() {
    console.log(new Date() + '--> ' + 'Step 3: Invoking Sparks Landing page # Begin');

    $browser.get(URL_STRING).
    then(function() {
		$browser.sleep(2000);
        $browser.waitForAndFindElement($driver.By.tagName("html"),1000).
        then(function(element){
        	element.getText().
            then(function(body) {
                //validate if Sparks page is invocation is successful
                assert.ok(body.indexOf('GET STARTED') != -1, "Text " + "'GET STARTED'" + " not found");
                console.log(new Date() + '--> ' + 'Step 3: Invoking Sparks Landing page # Successful');
                //Getting URL for Women--> Dresses page
                $browser.findElement($driver.By.xpath("//*[@id=\"SC_Level_1_1\"]/div[1]/div[1]/ul/li/a[./text()='Dresses']")).getAttribute("href").then(function(url) {
                    URL_STRING = url;
                    console.log("Step 4: Women/Dresses URL: " + URL_STRING);
                })
            })
        })
    })
}).
/**********************************************************************************************
 * Step 4: Go to Women/Dresses page 
 **********************************************************************************************/
then(function() {
    console.log(new Date() + '--> ' + 'Step 4: Navigate to Women/Dresses page # Begin');

    $browser.get(URL_STRING).
    then(function() {
        $browser.findElement($driver.By.tagName("html")).getText().
        then(function(body) {
            //validate if navigation to Women/Dresses page is successful
            assert.ok(body.indexOf('Dresses') != -1, "Text " + "'Dresses'" + " not found");
            console.log(new Date() + '--> ' + 'Step 4: Navigate to Women/Dresses page # Successful');
            //Getting URL for dress having stock
            var DRESS_LIST = [];
            //Enable for WCS PLP
			//$browser.findElements($driver.By.xpath("//*[@id=\"product-listing\"]/div/form/ol/li/div[2]/a")).
			//Enable for FESK PLP
			$browser.findElements($driver.By.xpath("/html/body/div[3]/div[5]/ul/li[1]/a")).
            then(function(DRESS_LIST) {
                DRESS_LIST[0].getAttribute("href").
                then(function(url) {
                    URL_STRING = url;
					console.log(URL_STRING);
				})
				/*URL_STRING = 'https://www.marksandspencer.com/pure-cotton-ruched-waist-tunic-midi-dress/p/p60167985?image=SD_01_T42_8099T_FQ_X_EC_90&color=BLUSHPINK&prevPage=plp&pdpredirect';
                console.log("Step 5: Dress PDP URL: " + URL_STRING);*/
            })
        })
    })
}).
/**********************************************************************************************
 * Step 5: Select dress, colour & size
 **********************************************************************************************/
then(function() {
    console.log(new Date() + '--> ' + 'Step 5: Invoking Dress PDP page # Begin');

    $browser.get(URL_STRING).
    then(function() {
		// choose colour
    	$browser.findElement($driver.By.xpath("//*[@id=\"product-options\"]")).
    	then(function(product_optn_element){
    		product_optn_element.findElements($driver.By.className("colour-picker__swatch is-active")).
    		then(function(colours){
    			if(colours.length>0) {
    				console.log("Default Colour Selection Available");
    			}
    			else {
    				$browser.findElement($driver.By.xpath("//*[@id=\"product-options\"]")).
    				then(function(product_optn_element){
    					product_optn_element.findElements($driver.By.className("colour-picker__swatch")).
    					then(function(colours){
    						if(colours.length>0){
        						colours[0].click();
        						colours[0].findElement($driver.By.name("selectedColour")).getAttribute("value").
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
			$browser.findElements($driver.By.xpath("//*[@id=\"product-options\"]")).
			then(function(product_optn_element){
				product_optn_element[0].findElements($driver.By.xpath("//*[@class=\"ng-scope\" or @class=\"ng-scope low-stock\"]/label")).
				then(function(sizes){
					if(sizes.length>0){
						sizes[0].click();
						sizes[0].getAttribute("for").
						then(function(size){
							console.log("Selecting Size: " + size);
							console.log(new Date() + '--> ' + 'Step 5: Invoking Dress PDP page # Successful');
						})
					}
				})
			})
    	})
    })
}).
/**********************************************************************************************
 * Step 6: Add Dress to bag
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 6: Adding Dress to Bag # Begin');
	
	$browser.sleep(1000);
	$browser.actions().mouseMove($browser.findElement($driver.By.id("add-to-basket-button"))).perform();
	$browser.findElement($driver.By.id("add-to-basket-button")).click().
	then(function(){
		$browser.sleep(2000);
		$browser.waitForAndFindElement($driver.By.tagName("html"),100).
        then(function(element){
        	element.getText().
            then(function(body) {
            	//validate if Add to Bag is successful
            	//console.log(body);
                assert.ok(body.indexOf('YOUR BAG1') != -1, "Text " + "'YOUR BAG1'" + " not found");
                console.log(new Date() + '--> ' + 'Step 6: Adding Dress to Bag # Successful');
            })
        })
	})
}).
/**********************************************************************************************
 * Step 7: Search for cushions
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 7: Searching for cushions # Begin');
	
	$browser.findElement($driver.By.name("searchTerm")).
	then(function(element){
		element.sendKeys("cushions").
		then(function(){
			$browser.findElement($driver.By.className("search-bar--submit btn btn__icon btn__icon--search search-bar--submit__active")).
			then(function(element){
				element.click().
				then(function(){
					$browser.waitForAndFindElement($driver.By.tagName("html"),100).
			        then(function(element){
			        	element.getText().
			            then(function(body) {
			            	//validate if Search for Cushions is successful
			                assert.ok(body.indexOf('96 ITEMS') != -1, "Text " + "'96 ITEMS'" + " not found");
			                console.log(new Date() + '--> ' + 'Step 7: Searching for cushions # Successful');
			            })
			        })
				})
			})
		})
	})
}).
/**********************************************************************************************
 * Step 8: Select product from Quick Look
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 8: Select product from Quick Look # Begin');
	
	$browser.findElement($driver.By.xpath("//*[@class=\"product-listing-container\"]/form/ol/li")).
	then(function(element){
		//console.log(new Date() + '--> ' + 'Step 8: product listing container found');
		$browser.actions().mouseMove(element).perform().
		then(function(){
			//console.log(new Date() + '--> ' + 'Step 8: Mouse Move to quick look complete');
			$browser.actions().click($browser.findElement($driver.By.className("lightbox-link quick-view normalized"))).perform();
			$browser.sleep(100).then(function(){
				//console.log(new Date() + '--> ' + 'Step 8: Overlay invoked');
				// choose colour
		    	$browser.findElement($driver.By.xpath("//*[@id=\"swatch\"]")).
		    	then(function(swatch_element){
		    		//console.log(new Date() + '--> ' + 'Step 8: search for colour element');
		    		swatch_element.findElements($driver.By.className("all active-swatch")).
		    		then(function(colours){
		    			if(colours.length>0) {
		    				//console.log(new Date() + '--> ' + 'Step 8: Colour already selected');
		    				console.log("Default Colour Selection Available");
		    			}
		    			else {
		    				$browser.findElement($driver.By.xpath("//*[@id=\"swatch\"]")).
		    				then(function(swatch_element){
		    					//console.log(new Date() + '--> ' + 'Step 8: searching for colour element');
		    					swatch_element.findElements($driver.By.className("colour-1 lazy")).
		    					then(function(colours){
		    						if(colours.length>0){
		    							//console.log(new Date() + '--> ' + 'Step 8: selecting colour');
		        						colours[0].click();
		        						colours[0].getAttribute("for").
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
					$browser.findElements($driver.By.xpath("//*[@id=\"size\"]")).
					then(function(sizes_element){
						console.log(new Date() + '--> ' + 'Step 8: size element found');
						if(sizes_element.length>0){
							sizes_element[0].findElements($driver.By.xpath("//*[@data-color-unselected=\"true\"]")).
							then(function(sizes){
								console.log(new Date() + '--> ' + 'Step 8: first colour identified');
								sizes[0].click();
								sizes[0].getAttribute("for").
								then(function(size){
									console.log(new Date() + '--> ' + 'Step 8: size selected');
									console.log("Selecting Size: " + size);
								})
							})
						}
					})
		    	})
			})
			console.log(new Date() + '--> ' + 'Step 8: Select product from Quick Look # Successful');
		})
	})
}).
/**********************************************************************************************
 * Step 9: Add Cushion to bag
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 9: Adding Cushion to Bag # Begin');
	
	$browser.findElement($driver.By.xpath("//*[@class=\"basket\"]")).click().
	then(function(){
		$browser.sleep(2000).then(function(){
			$browser.waitForAndFindElement($driver.By.tagName("html"),100).
	        then(function(element){
	        	element.getText().
	            then(function(body) {
	            	//validate if Add to Bag is successful
	            	//console.log(body);
	                assert.ok(body.indexOf('YOUR BAG (2)') != -1, "Text " + "'YOUR BAG (2)'" + " not found");
	                console.log(new Date() + '--> ' + 'Step 9: Adding Cushion to Bag # Successful');
	                //get URL for view bag
	                $browser.findElement($driver.By.xpath("//*[@id=\"glbFloatDuck\"]/ul/li[5]/a")).getAttribute("href").
	                then(function(url){
	                	URL_STRING = url;
	                	console.log("Step 10: View Bag URL: " + URL_STRING);
	                })
	            })
	        })
		})
	})
}).
/**********************************************************************************************
 * Step 10: View Bag
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 10: View Bag # Begin');
	
	$browser.get(URL_STRING).
	then(function(){
		$browser.waitForAndFindElement($driver.By.tagName("html"),3000).
        then(function(element){
        	element.getText().
            then(function(body) {
            	//validate if View Bag is successful
                assert.ok(body.indexOf('Your secure bag') != -1, "Text " + "'Your secure bag'" + " not found");
                console.log(new Date() + '--> ' + 'Step 10: View Bag # Successful');
            })
        })
	})
}).
/**********************************************************************************************
 * Step 11: Add Gift Wrap
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 11: Add Gift Wrap # Begin');
	
	$browser.findElements($driver.By.xpath("//*[@ng-if=\"item.giftMsgAddLink\"]")).
	then(function(addGiftWrap_elements){
		if(addGiftWrap_elements.length>0){
			$browser.sleep(500);
			addGiftWrap_elements[0].click();
			$browser.waitForAndFindElement($driver.By.xpath("/html/body/div[4]/div/mns-modal/div/div[1]/div/div/div/div/div/div[3]/label[2]"),1000).
			then(function(giftwrap){
				giftwrap.click();
				$browser.findElement($driver.By.xpath("/html/body/div[4]/div/mns-modal/div/div[1]/div/div/div/div/div/form/div/textarea")).sendKeys("New Relic Gift Message");
				$browser.sleep(500);
				$browser.findElement($driver.By.xpath("/html/body/div[4]/div/mns-modal/div/div[1]/div/div/div/div/div/div[@class=\"cta-links\"]/input[2]")).click();
				$browser.waitForAndFindElement($driver.By.tagName("html"),100).
		        then(function(element){
		        	element.getText().
		            then(function(body) {
		            	//validate if Adding Gift Wrap is successful
		                assert.ok(body.indexOf('Your secure bag') != -1, "Text " + "'Your secure bag'" + " not found");
		                console.log(new Date() + '--> ' + 'Step 11: Add Gift Wrap # Successful');
		            })
		        })
			})
		}
	})
}).
/**********************************************************************************************
 * Step 12: Checkout
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 12: Checkout # Begin');
	
    $browser.sleep(2000).then(function(){
    	$browser.findElement($driver.By.xpath("//*[@id=\"checkoutSecurely\"]/button/span")).click().
    	then(function(){
    		$browser.waitForAndFindElement($driver.By.tagName("html"),100).
            then(function(element){
            	element.getText().
                then(function(body) {
                	//validate if checkout is successful
                    assert.ok(body.indexOf('Your Delivery Options') != -1, "Text " + "'Your Delivery Options'" + " not found");
                    console.log(new Date() + '--> ' + 'Step 12: Checkout # Successful');
                    $browser.findElement($driver.By.xpath("//*[@id=\"deliverOptions\"]/div[2]/div[1]/div/div[1]/div[2]/a")).getAttribute("href").
                    then(function(url){
                    	URL_STRING = url;
                    	console.log("Step 13: View Bag URL: " + URL_STRING);
                    })
                })
            })
    	})
    })
}).
/**********************************************************************************************
 * Step 13: Delete Items from Bag
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 13: Delete Items from Bag # Begin');
	
	$browser.get(URL_STRING).
	then(function(){
		$browser.findElements($driver.By.className("basket-order__items ng-scope")).
		then(function(Bag_items){
			console.log("Number of unique items on Bag: " + Bag_items.length);
			for (var i=1;i<=Bag_items.length;i++){
				console.log("Bag - Removing Item Number: "+ i);
				$browser.navigate().refresh();
				$browser.findElement($driver.By.className("btn product-item__button btn__icon btn__icon--close btn--no-border ng-isolate-scope")).click();
			}
			console.log(new Date() + '--> ' + 'Step 13: Delete Items from Bag # Successful');
		})
	})
}).
/**********************************************************************************************
 * Step 14: Sign Out
 **********************************************************************************************/
then(function(){
	console.log(new Date() + '--> ' + 'Step 14: Sign Out # Begin');
	
	$browser.get("https://www.marksandspencer.com/Logoff?catalogId=10051&rememberMe=false&myAcctMain=1&langId=-24&storeId=10151&URL=http%3A%2F%2Fwww.marksandspencer.com").
	then(function(){
		$browser.waitForAndFindElement($driver.By.tagName("html"),10000).
		then(function(element){
			element.getText().
			then(function(body) {
				//validate if signout is successful
				//assert.ok(body.indexOf('SIGN IN') != -1, "Text " + "'SIGN IN'" + " not found");
				console.log(new Date() + '--> ' + 'Step 14: Sign Out # Successful');
        	})
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

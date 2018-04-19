/**
 * Checks if the "M&S.com - Food/Wine" page is up and running
 * 
 * Scripted Browser Type: Page Invocation
 * Max. Connect Time: 15 secs
 * Max. Page Load Time: 15 secs (Overall Threshold)
 * Window Size: 1680 * 1050 pixels
 */ 
var assert = require('assert');

$browser.addHostnameToBlacklist('*edrcode.com*');
$browser.addHostnameToBlacklist('edigitalsurvey.com');
$browser.addHostnameToBlacklist('*edigitalsurvey.com*');
console.log(new Date()+'--> '+'M&S.com - Food/Wine: Execution # Begin');
$browser.addHeader('User-Agent', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)').
then(function(){
  $browser.manage().deleteAllCookies().
  then(function(){
    $browser.manage().window().setSize(1680, 1050).
    then(function(){
      
      // Setting Max. Connect Time
      console.log(new Date()+'--> '+'M&S.com - Food/Wine: Setting Connect Time to 15 secs # Begin');
      $browser.manage().timeouts().implicitlyWait(15000).
      then(function(){
        console.log(new Date()+'--> '+'M&S.com - Food/Wine: Setting Connect Time to 15 secs # End');
        
        // Setting Max. Connect Time
        console.log(new Date()+'--> '+'M&S.com - Food/Wine: Setting Page Load Timeout to 15 secs # Begin');
        return $browser.manage().timeouts().pageLoadTimeout(15000).
        then(function(){
          console.log(new Date()+'--> '+'M&S.com - Food/Wine: Setting Page Load Timeout to 15 secs # End');
          
          // Invoking the Food/Wine Site URL
          console.log("Food & Wine URL: http://www.marksandspencer.com/c/food-and-wine");
          console.log(new Date()+'--> '+'M&S.com - Food/Wine: Invoking the URL # Begin');
          $browser.get("http://www.marksandspencer.com/c/food-and-wine").
          then(function(){
            $browser.findElement($driver.By.tagName("html")).getText().
            then(function(body){
              /*console.log(new Date()+'--> '+'M&S.com - Food/Wine: Search string # Begin');
              assert.ok(body.indexOf('<<SearchString>>') != -1,"Text "+ "<<SearchString>>"+ " not found in body");
              console.log(new Date()+'--> '+'M&S.com - Food/Wine: Search string # End');*/
              console.log(new Date()+'--> '+'M&S.com - Food/Wine: Invoking the URL # End');
              console.log(new Date()+'--> '+'M&S.com - Food/Wine: Execution # End');
            })
          })
        })
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

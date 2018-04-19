/**
 * Checks if the "M&S.com - Offers" page is up and running
 * 
 * Scripted Browser Type: Page Invocation
 * Max. Connect Time: 15 secs
 * Max. Page Load Time: 15 secs (Overall Threshold)
 * Window Size: not applicable
 */ 
var assert = require('assert');

$browser.addHostnameToBlacklist('*edrcode.com*');
$browser.addHostnameToBlacklist('edigitalsurvey.com');
$browser.addHostnameToBlacklist('*edigitalsurvey.com*');
console.log(new Date()+'--> '+'M&S.com - Offers: Execution # Begin');
$browser.addHeader('User-Agent', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)').
then(function(){
  $browser.manage().deleteAllCookies().
  then(function(){
    // $browser.manage().window().setSize(1680, 1050).
    // then(function(){
      
      // Setting Max. Connect Time
      console.log(new Date()+'--> '+'M&S.com - Offers: Setting Connect Time to 15 secs # Begin');
      $browser.manage().timeouts().implicitlyWait(15000).
      then(function(){
        console.log(new Date()+'--> '+'M&S.com - Offers: Setting Connect Time to 15 secs # End');
        
        // Setting Max. Connect Time
        console.log(new Date()+'--> '+'M&S.com - Offers: Setting Page Load Timeout to 15 secs # Begin');
        return $browser.manage().timeouts().pageLoadTimeout(15000).
        then(function(){
          console.log(new Date()+'--> '+'M&S.com - Offers: Setting Page Load Timeout to 15 secs # End');
          
          // Invoking the Offers URL
          console.log("Offers URL: http://www.marksandspencer.com/CategoryDisplay?langId=-24&storeId=10151&catalogId=10051&categoryId=97007");
          console.log(new Date()+'--> '+'M&S.com - Offers: Invoking the Corporate Site URL # Begin');
          $browser.get("http://www.marksandspencer.com/CategoryDisplay?langId=-24&storeId=10151&catalogId=10051&categoryId=97007").
          then(function(){
          console.log(new Date()+'--> '+'M&S.com - Offers: Invoking the Corporate Site URL # End');
          console.log(new Date()+'--> '+'M&S.com - Offers: Execution # End');
          })
        })
      })
//    })
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

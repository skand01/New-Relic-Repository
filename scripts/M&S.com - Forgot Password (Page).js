/**
 * Checks if the "M&S.com - Forgot Password" page is up and running
 * 
 * Scripted Browser Type: Page Invocation
 * Max. Connect Time: 9 secs
 * Max. Page Load Time: 9 secs (Overall Threshold)
 * Window Size: 1680 * 1050 pixels
 */ 
var assert = require('assert');

$browser.addHostnameToBlacklist('*edrcode.com*');
$browser.addHostnameToBlacklist('edigitalsurvey.com');
$browser.addHostnameToBlacklist('*edigitalsurvey.com*');
console.log(new Date()+'--> '+'M&S.com - Forgot Password: Execution # Begin');
$browser.addHeader('User-Agent', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)').
then(function(){
  $browser.manage().deleteAllCookies().
  then(function(){
    $browser.manage().window().setSize(1680, 1050).
    then(function(){
      
      // Setting Max. Connect Time
      console.log(new Date()+'--> '+'M&S.com - Forgot Password: Setting Connect Time to 9 secs # Begin');
      $browser.manage().timeouts().implicitlyWait(9000).
      then(function(){
        console.log(new Date()+'--> '+'M&S.com - Forgot Password: Setting Connect Time to 9 secs # End');
        
        // Setting Max. Connect Time
        console.log(new Date()+'--> '+'M&S.com - Forgot Password: Setting Page Load Timeout to 9 secs # Begin');
        return $browser.manage().timeouts().pageLoadTimeout(9000).
        then(function(){
          console.log(new Date()+'--> '+'M&S.com - Forgot Password: Setting Page Load Timeout to 9 secs # End');
          
          // Invoking the Forgot Password URL
          console.log("Forgot Password URL: https://www.marksandspencer.com/MSResetPasswordGuestModalView?state=ResetPassword&catalogId=10051&langId=-24&storeId=10151");
          console.log(new Date()+'--> '+'M&S.com - Forgot Password: Invoking the URL # Begin');
          $browser.get("https://www.marksandspencer.com/MSResetPasswordGuestModalView?state=ResetPassword&catalogId=10051&langId=-24&storeId=10151").
          then(function(){
            $browser.findElement($driver.By.tagName("html")).getText().
            then(function(body){
              /*console.log(new Date()+'--> '+'M&S.com - Forgot Password: Search string # Begin');
              assert.ok(body.indexOf('<<SearchString>>') != -1,"Text "+ "<<SearchString>>"+ " not found in body");
              console.log(new Date()+'--> '+'M&S.com - Forgot Password: Search string # End');*/
              console.log(new Date()+'--> '+'M&S.com - Forgot Password: Invoking the URL # End');
              console.log(new Date()+'--> '+'M&S.com - Forgot Password: Execution # End');
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

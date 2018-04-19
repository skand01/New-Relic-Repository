/**
 * Checks if the "M&S.com - FAQs" page is up and running
 * 
 * Scripted Browser Type: Page Invocation
 * Max. Connect Time: 10 secs
 * Max. Page Load Time: 10 secs (Overall Threshold)
 * Window Size: not applicable
 */ 
var assert = require('assert');

$browser.addHostnameToBlacklist('*edrcode.com*');
$browser.addHostnameToBlacklist('edigitalsurvey.com');
$browser.addHostnameToBlacklist('*edigitalsurvey.com*');
console.log(new Date()+'--> '+'M&S.com - FAQs: Execution # Begin');
$browser.addHeader('User-Agent', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)').
then(function(){
  $browser.manage().deleteAllCookies().
  then(function(){
    $browser.manage().window().setSize(1680, 1050).
    then(function(){
      
      // Setting Max. Connect Time
      console.log(new Date()+'--> '+'M&S.com - FAQs: Setting Connect Time to 10 secs # Begin');
      $browser.manage().timeouts().implicitlyWait(10000).
      then(function(){
        console.log(new Date()+'--> '+'M&S.com - FAQs: Setting Connect Time to 10 secs # End');
        
        // Setting Max. Connect Time
        console.log(new Date()+'--> '+'M&S.com - FAQs: Setting Page Load Timeout to 10 secs # Begin');
        return $browser.manage().timeouts().pageLoadTimeout(10000).
        then(function(){
          console.log(new Date()+'--> '+'M&S.com - FAQs: Setting Page Load Timeout to 10 secs # End');
          
          // Invoking the Corporate Site URL
          console.log("FAQ URL: http://help.marksandspencer.com/support");
          console.log(new Date()+'--> '+'M&S.com - FAQs: Invoking the URL # Begin');
          $browser.get("http://help.marksandspencer.com/support").
          then(function(){
            $browser.findElement($driver.By.tagName("html")).getText().
            then(function(body){
              console.log(new Date()+'--> '+'M&S.com - FAQs: Search string # Begin');
              assert.ok(body.indexOf('Frequently Asked Questions') != -1,"Text "+ "Frequently Asked Questions"+ " not found in body");
              console.log(new Date()+'--> '+'M&S.com - FAQs: Search string # End');
              console.log(new Date()+'--> '+'M&S.com - FAQs: Invoking the URL # End');
              console.log(new Date()+'--> '+'M&S.com - FAQs: Execution # End');
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
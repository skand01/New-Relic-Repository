/**
 * Checks if the "M&S.com Microsite - Made To Measure" page is up and running
 * 
 * Scripted Browser Type: Page Invocation
 * Max. Connect Time: 30 secs
 * Max. Page Load Time: 30 secs (Overall Threshold)
 * Window Size: 1680 * 1050 pixels
 */ 
var assert = require('assert');

console.log(new Date()+'--> '+'M&S.com Microsite - Made To Measure: Execution # Begin');
$browser.addHeader('User-Agent', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)').
then(function(){
  $browser.manage().deleteAllCookies().
  then(function(){
    $browser.manage().window().setSize(1680, 1050).
    then(function(){
      
      // Setting Max. Connect Time
      console.log(new Date()+'--> '+'M&S.com Microsite - Made To Measure: Setting Connect Time to 30 secs # Begin');
      $browser.manage().timeouts().implicitlyWait(30000).
      then(function(){
        console.log(new Date()+'--> '+'M&S.com Microsite - Made To Measure: Setting Connect Time to 30 secs # End');
        
        // Setting Max. Connect Time
        console.log(new Date()+'--> '+'M&S.com Microsite - Made To Measure: Setting Page Load Timeout to 30 secs # Begin');
        return $browser.manage().timeouts().pageLoadTimeout(30000).
        then(function(){
          console.log(new Date()+'--> '+'M&S.com Microsite - Made To Measure: Setting Page Load Timeout to 30 secs # End');
          
          // Invoking the Made to Measure Site URL
          console.log("MTM Site URL: https://www.madetomeasure-marksandspencer.com/");
          console.log(new Date()+'--> '+'M&S.com Microsite - Made To Measure: Invoking the URL # Begin');
          $browser.get("https://www.madetomeasure-marksandspencer.com/").
          then(function(){
            $browser.findElement($driver.By.tagName("html")).getText().
            then(function(body){
              /*console.log(new Date()+'--> '+'M&S.com Microsite - Made To Measure: Search string # Begin');
              assert.ok(body.indexOf('<<SearchString>>') != -1,"Text "+ "<<SearchString>>"+ " not found in body");
              console.log(new Date()+'--> '+'M&S.com Microsite - Made To Measure: Search string # End');*/
              console.log(new Date()+'--> '+'M&S.com Microsite - Made To Measure: Invoking the URL # End');
              console.log(new Date()+'--> '+'M&S.com Microsite - Made To Measure: Execution # End');
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

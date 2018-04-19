/**
 * Checks if the "M&S.com - Lunchtogo" page is up and running
 * 
 * Scripted Browser Type: Page Invocation
 * Max. Connect Time: 10 secs
 * Max. Page Load Time: 10 secs (Overall Threshold)
 * Window Size: 1680 * 1050 pixels
 */ 
var assert = require('assert');

console.log(new Date()+'--> '+'M&S.com - Lunchtogo: Execution # Begin');
//$browser.addHeader('User-Agent', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)').
//then(function(){
  $browser.manage().deleteAllCookies().
  then(function(){
    $browser.manage().window().setSize(1680, 1050).
    then(function(){
      var date = new Date();
      var hours =date.getHours();
      if (hours>=8 && hours<=18) {
        // Setting Max. Connect Time
        console.log(new Date()+'--> '+'M&S.com - Lunchtogo: Setting Connect Time to 10 secs # Begin');
        $browser.manage().timeouts().implicitlyWait(10000).
        then(function(){
          console.log(new Date()+'--> '+'M&S.com - Lunchtogo: Setting Connect Time to 10 secs # End');
          
          // Setting Max. Connect Time
          console.log(new Date()+'--> '+'M&S.com - Lunchtogo: Setting Page Load Timeout to 10 secs # Begin');
          return $browser.manage().timeouts().pageLoadTimeout(10000).
          then(function(){
            console.log(new Date()+'--> '+'M&S.com - Lunchtogo: Setting Page Load Timeout to 10 secs # End');
            
            // Invoking the Corporate Site URL
            console.log(new Date()+'--> '+'M&S.com - Lunchtogo: Invoking the URL # Begin');
            $browser.get("http://www.lunch-to-you.com").
            then(function(){
              $browser.findElement($driver.By.tagName("html")).getText().
              then(function(body){
                /*console.log(new Date()+'--> '+'M&S.com - Lunchtogo: Search string # Begin');
                assert.ok(body.indexOf('<<SearchString>>') != -1,"Text "+ "<<SearchString>>"+ " not found in body");
                console.log(new Date()+'--> '+'M&S.com - Lunchtogo: Search string # End');*/
                console.log(new Date()+'--> '+'M&S.com - Lunchtogo: Invoking the URL # End');
                console.log(new Date()+'--> '+'M&S.com - Lunchtogo: Execution # End');
              })
            })
          })
        })
      } else {
        $browser.get("http://www.google.com");
        console.log(new Date()+'--> '+'M&S.com - Lunchtogo: Journey not scheduled to run at this time # End');
        console.log(new Date()+'--> '+'M&S.com - Lunchtogo: Execution # End');
      }
    })
  })
//})

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

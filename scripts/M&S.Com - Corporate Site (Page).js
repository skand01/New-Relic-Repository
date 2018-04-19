/**
 * Checks if the "M&S.com - Corporate Site" is up and running
 * 
 * Scripted Browser Type: Page Invocation
 * Max. Connect Time: 60 secs
 * Max. Page Load Time: 60 secs (Overall Threshold)
 * Window Size = 1680 * 1050 pixels
 */ 
var assert = require('assert');

console.log(new Date()+'--> '+'M&S.com - Corporate Site [S3]: Execution # Begin');
//$browser.addHeader('User-Agent', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)').
//then(function(){
  $browser.manage().deleteAllCookies().
  then(function(){
    $browser.manage().window().setSize(1680, 1050).
    then(function(){
      
      // Setting Max. Connect Time
      console.log(new Date()+'--> '+'M&S.com - Corporate Site [S3]: Setting Connect Time to 60 secs # Begin');
      $browser.manage().timeouts().implicitlyWait(60000).
      then(function(){
        console.log(new Date()+'--> '+'M&S.com - Corporate Site [S3]: Setting Connect Time to 60 secs # End');
        
        // Setting Max. Connect Time
        console.log(new Date()+'--> '+'M&S.com - Corporate Site [S3]: Setting Page Load Timeout to 60 secs # Begin');
        return $browser.manage().timeouts().pageLoadTimeout(60000).
        then(function(){
          console.log(new Date()+'--> '+'M&S.com - Corporate Site [S3]: Setting Page Load Timeout to 60 secs # End');
          
          // Invoking the Corporate Site URL
          console.log("Corporate URL: http://corporate.marksandspencer.com");
          console.log(new Date()+'--> '+'M&S.com - Corporate Site [S3]: Invoking the Corporate Site URL # Begin');
          $browser.get("http://corporate.marksandspencer.com").
          then(function(){
          console.log(new Date()+'--> '+'M&S.com - Corporate Site [S3]: Invoking the Corporate Site URL # End');
          console.log(new Date()+'--> '+'M&S.com - Corporate Site [S3]: Execution # End');
          })
        })
      })
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

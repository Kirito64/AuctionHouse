$(document).ready( function() {
document.getElementById("login_btn").addEventListener("click", function(){
  $('#login_btn').button('loading')
  window["input_email"] = document.getElementById("input_email").value;
  window["input_password"] = document.getElementById("input_password").value;
  window["gold_price"] = document.getElementById("gold_price").value;
  window["deviation"] = document.getElementById("deviation").value;
  
  nm1
    .goto('https://jewel-auction.procuretiger.com/AUCTION/') 
    .wait(2000)
    .evaluate(function() {
      return document.querySelector('#loginLink');
    })
    .then(function(login_link_ele) {
      //if(false){
      if (login_link_ele != null && login_link_ele != false) {  //change1 check for login link
        nm1
          .goto('https://jewel-auction.procuretiger.com/AUCTION/') 
          .wait('a#loginLink')
          .click('a#loginLink')
          .click('input#j_username')
          .insert('input#j_username', input_email)
          .click('input#j_password')
          .insert('input#j_password', input_password)
          .click('form#frmLogin > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2) > button.pull-left.blue-button-small:nth-child(1)')
          .wait(2000)
          //.goto('http://localhost/gold_auction/all_rgn_215/') 
          .goto('https://jewel-auction.procuretiger.com/AUCTION/') // change for jewel-auction.procuretiger.com
          .wait(2000)
          .inject("js", "./js/pch.js")
          .inject("js", "./js/rgn.js")
          .inject("js", "./js/cnty.js")
          .then(function () {})
        
      }else {
        nm1
          //.goto('http://localhost/gold_auction/all_rgn_215/')
          .goto('https://jewel-auction.procuretiger.com/AUCTION/')  // change1 for jewel-auction.procuretiger.com
          .wait(2000)
          .inject("js", "./js/pch.js")
          .inject("js", "./js/rgn.js")
          .inject("js", "./js/cnty.js")
          .then(function () {})
      }
  })

    .then(function (result) {
      setTimeout(function(){
        $('#login_btn').button('reset')
          document.getElementById("status").innerHTML = "User Logged In";
          document.getElementById("login_form").style.display = "none";
          document.getElementById("rgn_list").style.display = "block";
        }, 4000);
    })
    .catch(function (error) {
      document.getElementById("status").innerHTML ='Error:', error;
    });

  });

}); 
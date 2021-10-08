const a = require('is-plain-object');
var Nightmare = require('nightmare');
var b = require('./extensions/b')
var c = require('./extensions/c')
var d = require('./extensions/d')
var vo = require('vo');
var e = require('./extensions/e')
var f = require('./extensions/f')
var g = require('./extensions/g')
var observer = require('./extensions/observer');

b(Nightmare);
c(Nightmare);
d(Nightmare);
e(Nightmare);
f(Nightmare);
g(Nightmare);
// observer(Nightmare);

bidNotViable = [];

(function(oldLog) {

    console.log = function(arg) {
        if (typeof arg === "string" && arg.indexOf("bidRank_") !== -1) {
          var id = extractBidRank(arg);
          console.log("Bidding on id " + id);
          bid_on_change(id);
        }

        // now call original console.log() with original arguments
        return oldLog.apply(console, arguments);
    };
})(console.log);

pbc = 0
bmwr1i = [];

function extractBidRank(id){
  var c = "bidRank_"
  var extractedId = id.substring(c.length);
  return (extractedId)
}


document.getElementById("grb").addEventListener("click", function(){
  $('#grb').button('loading')

  var run = function * () {
      yield nm1.on('console', (log, msg)=>{
        console.log(msg)
      })
        //.goto('http://localhost/gold_auction/all_rgn_215/') 
        .goto('https://jewel-auction.procuretiger.com/AUCTION/') // change1 for jewel-auction.procuretiger.com
        .wait(2000)
        .inject("js", "./js/pch.js")
        .inject("js", "./js/rgn.js")
        .inject("js", "./js/cnty.js")

      var previousHeight = 0;
      var currentHeight = document.body.scrollHeight;
      while(previousHeight !== currentHeight) {
        previousHeight = currentHeight;
        yield nm1.wait(700)  //change for jewel-auction.procuretiger.com/AUCTION/
        currentHeight = yield nm1.evaluate(function() {
          return document.body.scrollHeight;
        });
        yield nm1
          .scrollTo(currentHeight, 0)
          .wait("#btnShowMore button")
          .click("#btnShowMore button")
      }
      yield nm1
              .e()
              .then(function (rgns) {
                  rgn_infos = rgns.rgn_infos;
                  rgn_infos_html = "";
                  rgn_infos_html +="<div style=\"overflow-x: hidden;height: 550px; \">";
                  rgn_infos_html +="<table class=\"table  table-sm table-fixed\" id=\"rgn_table\" style=\"background-color: white;\">"+
                                        "<thead class=\"table-info\">"+
                                            "<tr>"+
                                              "<th class=\"col-xs-2\">Sr No</th>"+
                                              "<th class=\"col-xs-2\">#</th>"+
                                              "<th class=\"col-xs-6 col-sm-6\">Region Name</th>"+
                                              "<th class=\"col-xs-2 col-sm-2\">Instance Count</th>"+
                                            "</tr>"+
                                        "</thead>"+
                                        "<tbody id=\"rgn_infos\" data-toggle=\"checkboxes\" data-max=\"3\">";
                  $.each( rgn_infos, function( key, rgn_info ) {
                    sr_no = rgn_info.sr_no;
                    bid_hall_link = rgn_info.bid_hall_link;
                    name = rgn_info.name;

                    rgn_infos_html +="<tr>";
                    rgn_infos_html +="<td class=\"col-xs-2\">"+sr_no+"</td>";
                    rgn_infos_html +="<td class=\"col-xs-2\">"+
                                          "<label class=\"custom-control custom-checkbox\">"+
                                          "<input type=\"checkbox\" name=\"rgn_name\" data-name=\""+name+"\" data-sr_no=\""+(key+1)+"\" data-instance_count=\"1\" class=\"custom-control-input\" id=\"rgn_name_"+(key+1)+"\" value=\""+bid_hall_link+"\">"+
                                          "<span class=\"custom-control-indicator\"></span>"+
                                          "</label>"+
                                        "</td>";
                    rgn_infos_html +="<td class=\"col-xs-6  col-sm-6\">"+name+"</td><td class=\"col-xs-2  col-sm-2\"><input class=\"instance_count\" type=\"number\" name=\"instance_count\" id=\"instance_count_"+(key+1)+"\" value=\"\"></td>";
                    rgn_infos_html +="</tr>";
                  });
                  rgn_infos_html +="</tbody>";
                  rgn_infos_html +="</table>";
                  rgn_infos_html +="</div>";

                  document.getElementById("rgn_infos").innerHTML = rgn_infos_html;
                  $('#grb').button('reset')
                  $('.step-2').hide();
                  $('.step-3').show();
                })

    };

    vo(run)(function(err, rgns) {
    });
});

document.getElementById("f_btn_1").addEventListener("click", function(){
  $('#f_btn_1').button('loading');

  selected_rgn_url = [];
  selected_name = [];
  selected_rgn_no = [];
  selected_rgn_instance_count = [];

  $('input[name="rgn_name"]:checked').each(function (key, element) {
    selected_rgn_url[key] = this.value;
    name = this.dataset.name ;
    name = name.replace("e Sale of Gold Jewellery of ", "");
    name = name.replace("Region on ", "");
    name = name.replace("on ", "");
    selected_name[key] = name;
    selected_rgn_no[key] = parseInt(this.dataset.sr_no);
    selected_rgn_instance_count[key] = parseInt(this.dataset.instance_count);

  });

  window.pches1 = [];
  var run1 = function * () {
    var titles = [];
    var pches_html = "";
    var section_no = 0;
    
    for (var i = 0; i < selected_rgn_url.length; i++) {
      for (var j = 0; j < selected_rgn_instance_count[i]; j++) {
        if (section_no >= 11) { break; }
        section_no = section_no + 1;
        rgn_url = selected_rgn_url[i];  
        var title = yield nm1
        .goto(rgn_url)
        .wait(2000)
        .inject("js", "./js/pch.js")
        .inject("js", "./js/rgn.js")
        .inject("js", "./js/cnty.js")
        .wait(2000)
        .f()
        .then(function (result) {
          window.pches1.push({rgn_url: result})
          pches_html =pches_html + create_pch_asc_list_html(result.pches, section_no, rgn_url, selected_name[i]);
          })

      }
    }

    document.getElementById("step-4").innerHTML = pches_html;
    $('#f_btn_1').button('reset')
    $('.step-3').hide();
    $('.step-4').show();
    return "inside vo";
  }

  vo(run1)(function(err, title) {
  })
});

$('body').on('click', '.btn-start', function(event) {
  var event_creator = event.target;
  rgn_info = get_rgn_info(event_creator);
  var rgn_id = rgn_info.rgn_id;
  var rgn_url = rgn_info.rgn_url;
  document.getElementById("pbc_rgn_"+rgn_id).innerHTML = "Application started..." ;

  nightmare_obj = create_nightmare_instance(rgn_id, args);
  nightmare_obj
    .evaluate(function() {
      return document.querySelector('#loginLink');
    })
    .then(function(login_link_ele) {
      if (login_link_ele != null && login_link_ele != false) {

        /*change1 start for localhost */
        //document.getElementById("pbc_rgn_"+rgn_id).innerHTML = "User without login for this rgn." ;
        //selective_bid_after_login(nightmare_obj, rgn_id, event, rgn_url);
        /* change1 end for localhost  */
        nightmare_obj = selective_bid_login(nightmare_obj, rgn_id, event, rgn_url) // change1 for jewel-auction.procuretiger.com

      }else {
          nightmare_obj = selective_bid_already_login(nightmare_obj, event, rgn_id, click_on_selected_bid_btns);
      }
})

});

$('body').on('click', '.btn-stop', function(event) {
  var event_creator = event.target;
  rgn_info = get_rgn_info(event_creator);
  var rgn_id = rgn_info.rgn_id;
  var nightmare_obj_close = window["nightmare_rgn_" + rgn_id];
  nightmare_obj_close
    .end()
    .then(function (result) {
      window["nightmare_rgn_" + rgn_id] = undefined;
      document.getElementById("pbc_rgn_"+rgn_id).innerHTML = "Application stop." ;
    })
})

function click_on_popup_yes_button(rgn_id, btn_id_index) {
  nightmare_obj = window["nightmare_rgn_" + rgn_id];
  nightmare_obj
    .wait("#popup_ok")
    .click("#popup_ok")
    .wait("#popup_ok")
    .click("#popup_ok")
    .then(function () {
      window["pbc_rgn_" + rgn_id] = window["pbc_rgn_" + rgn_id] + 1;
      window["btn_id_index_rgn_" + rgn_id] = btn_id_index;
      document.getElementById("pbc_rgn_"+rgn_id).innerHTML = "index: "+window["pbc_rgn_" + rgn_id] + ", " +"bid on pch no: "+btn_id_index ;
    })
    .catch(function (error) {
    });
}

function click_on_popup_yes_button_auto(nightmare_obj, btn_id_index) {
  nightmare_obj
    .wait("#popup_ok")
    .click("#popup_ok")
    .wait("#popup_ok")
    .click("#popup_ok")
    .then(function () {
      document.getElementById("pbc_rgn_"+rgn_id).innerHTML = "index: "+window["pbc_rgn_" + rgn_id] + ", " +"bid on pch no: "+btn_id_index ;
    })
    .catch(function (error) {
    });
}


function intersect(bmwr1i, selected_pch_ids) {
  var temp;
  return selected_pch_ids.filter(function (e) {
      return bmwr1i.indexOf(e) > -1;
  });
}

function selective_bid_after_login(nightmare_obj, rgn_id, event, rgn_url){
  
  gold_price = window["gold_price"];
  deviation = window["deviation"];
  return nightmare_obj

    .goto(rgn_url) 
    .wait(1000)
    
    .evaluate( function(gold_price, deviation){
      window["gold_price"]=gold_price;
      window["deviation"]=deviation;
      return gold_price + deviation;
    }, gold_price, deviation)

    .inject("js", "./js/pch.js")
    .inject("js", "./js/rgn.js")
    .inject("js", "./js/cnty.js")
    .wait(1000)
    .f()
    .then(res => console.log(res))
    .then(function (result) {
      $('#login_btn').button('reset')
      document.getElementById("login_form").style.display = "none";
      
    })
    .catch(function (error) {
      document.getElementById("status").innerHTML ='Error:', error;
    })
    ;
}

function selective_bid_login(nightmare_obj, rgn_id, event, rgn_url){
  var input_email = window["input_email"]; 
  var input_password = window["input_password"]; 
  return nightmare_obj
    .wait('a#loginLink')
    .click('a#loginLink')
    .click('input#j_username')
    .insert('input#j_username', input_email)
    .click('input#j_password')
    .insert('input#j_password', input_password)
    .click('form#frmLogin > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2) > button.pull-left.blue-button-small:nth-child(1)')
    .wait(1000)
    .then(function(){
      document.getElementById("pbc_rgn_"+rgn_id).innerHTML = "User login for this region successfully." ;
      selective_bid_after_login(nightmare_obj, rgn_id, event, rgn_url);
    })
}

function bidViable(bid_id, nextbid){
  var deviation = window["deviation"];
  var startBid = document.getElementById("pch_"+bid_id+"_start").innerHTML;
  if(nextbid<= startBid*(1 + deviation/100)){
    return true;
  }
  else
    return false
  
}

function bid_on_change(bid_id){ 
  var nightmare_obj = window["nightmare_rgn_1"]
  var btnId = "#bid_"+bid_id;
  var netammoutn = '#netBidAmt_'+bid_id;

  nightmare_obj
    .evaluate(
      function(bid_id){
        return parseInt(document.getElementById("bidRank_"+bid_id).innerHTML)
      }, bid_id
    ).then(function(bidRank){
      var Rank = document.getElementById("pch_"+bid_id+"_start");
      Rank.innerHTML = bidRank;
    })
    
  if(bidViable(bid_id) && bidNotViable.indexOf(bid_id)!== -1)
  {
    var flag = 0;
    nightmare_obj
      .evaluate(function(netammoutn){
        document.querySelector('input#txtcell_'+bid_id+'_18').value = ''
        return parseInt(document.querySelector(netammoutn).innerHTML);
      }, netammoutn)
      .then(
        function(result){
        if(bidViable(bid_id, result)){
          flag = 1;
          nightmare_obj
            .click('input#txtcell_'+bid_id+'_18')
            .insert('input#txtcell_'+bid_id+'_18', result)
            .wait(btnId)
            .wait(window["bid_delay"])
            .click(btnId)
            .then(function(){
              click_on_popup_yes_button_auto(nightmare_obj, bid_id);
          })
        }
        else{
            bidNotViable.append(bid_id)
        }
      })

      if(flag){
        var Rank = document.getElementById("pch_"+bid_id+"_start");
        Rank.innerHTML = 1;
      }
  }
}

function get_rgn_info(event_creator){
  var pch_info = event_creator.parentElement.parentElement.getElementsByClassName("rgn");
  var rgn_id = pch_info[0].id;
  pch_info_1 = $(pch_info[0]);
  rgn_url = pch_info_1.parent().find(".rgn_url").val();
  rgn_info = {rgn_id:rgn_id, rgn_url:rgn_url};
  return rgn_info;
}

function create_nightmare_instance(rgn_id, args){
  var nightmare_obj = window["nightmare_rgn_" + rgn_id];
  console.log(rgn_id);
  if(typeof nightmare_obj == 'undefined') {
    window["nightmare_rgn_" + rgn_id] = Nightmare(args);
    window["pbc_rgn_" + rgn_id] = 0;
    nightmare_obj = window["nightmare_rgn_" + rgn_id];
    nightmare_obj.on('console', (log, msg)=>{
        console.log(msg)
      })
    .goto('https://jewel-auction.procuretiger.com/AUCTION')
    .wait(1000)
  }
  return nightmare_obj;
}

function selective_bid_already_login(nightmare_obj, event, rgn_id, callback) {
  return nightmare_obj
  .g()
  .c()
  .d()
  .then(function (result) {
    pbc = 0;
    selected_pch_ids = [];
    var status = $("#status").html();
    var event_creator = event.target;
    var area_ele = event_creator.parentElement.parentElement;
    $(area_ele).find('input[name="pch"]:checked').each(function (key, element) {
      selected_pch_ids[key] = parseInt(this.value);
    });

    index = 0;
    window["pbc_rgn_" + rgn_id] = 0;
    bmwr1i = result.bmwr1i;

    intersection_ids = intersect(bmwr1i, selected_pch_ids);
    document.getElementById("pbc_rgn_"+rgn_id).innerHTML = "Bidding started...";
    callback(index, intersection_ids, rgn_id, area_ele);  

  })
}

function click_on_selected_bid_btns(index, bmwr1i, rgn_id, area_ele) {
  selected_pch_count = 300; 
  
  btn_id_index = bmwr1i[index];
  btn_id = "#bid_" + btn_id_index;
  nightmare_obj = window["nightmare_rgn_" + rgn_id];


  nightmare_obj
    .wait(btn_id)
    .wait(window["bid_delay"])
    .click(btn_id)
    .then(function () {
      click_on_popup_yes_button(rgn_id, btn_id_index);
      
     
      if (index < selected_pch_count - 1) {
        index = index + 1;
        if(index%10==1000){   
              nightmare_obj
            .g()
            .wait(1000) 
            .c()
            .d()
            .then(function (result) {
              selected_pch_ids = [];
              $(area_ele).find('input[name="pch"]:checked').each(function (key, element) {
                selected_pch_ids[key] = parseInt(this.value);
              });


              bmwr1i = result.bmwr1i;

              intersection_ids = intersect(bmwr1i, selected_pch_ids);
              click_on_selected_bid_btns(index, intersection_ids, rgn_id, area_ele);
            })
            .catch((error) => {
              console.error('Search failed:', error);
            });
        }else{
          click_on_selected_bid_btns(index, bmwr1i, rgn_id, area_ele);
        }
      }
    })
    .catch(function (error) {
    });
}

function create_pch_asc_list_html (pches=[],rgn_no=0, rgn_url="", rgn_name="") {
  p_infos = "";
  not_bidded_count = 0;
  bidded_count = 0;
  win_count = 0;
  rank_not_one = 0;

  p_infos=p_infos+"<div class=\"btn-group pras-center\">\
                      <div href=\"#pch_info_"+rgn_no+"\" class=\"btn btn-primary btn-start\" id=\"btn-start_"+rgn_no+"\" href=\"#\">\
                      <i class=\"glyphicon glyphicon-play-circle\"></i> <span></span>\
                      </div>\
                      <div href=\"#pch_info_"+rgn_no+"\" class=\"btn btn-primary btn-ajax-refresh\"  id=\"btn-ajax-refresh_"+rgn_no+"\" href=\"#\" data-toggle=\"checkboxes\" data-action=\"uncheck\">\
                      <i class=\"glyphicon glyphicon-refresh\"></i> <span></span>\
                      </div>\
                      <div href=\"#pch_info_"+rgn_no+"\" class=\"btn btn-primary btn-toggle\" id=\"btn-toggle_"+rgn_no+"\" href=\"#\" data-toggle=\"checkboxes\" data-action=\"toggle\">\
                      <i class=\"glyphicon  glyphicon-check\"></i> <span></span>\
                      </div>\
                      <div href=\"#pch_info_"+rgn_no+"\" class=\"btn btn-primary btn-stop\" id=\"btn-stop_"+rgn_no+"\" href=\"#\">\
                      <i class=\"glyphicon glyphicon-off\"></i> <span></span>\
                      </div>\
                  </div>\
  <div class=\"badge badge-danger rgn-title\">"+rgn_no+". "+rgn_name+"</div>\
  <div class=\"alert alert-success\" id=\"pbc_rgn_"+rgn_no+"\"></div>\
  <div class=\"scroll-ht rgn\" id=\""+rgn_no+"\"  >";
  p_infos=p_infos+'<table class="table table-bordered table-sm m-0 pch_info table-fixed" id="pch_info_'+rgn_no+'" data-toggle="checkboxes" data-range="true">\
  <thead class="">\
      <tr>\
          <th  class=\"col-xs-3\" >#</th>\
          <th  class=\"col-xs-2\" >No.</th>\
          <th  class=\"col-xs-4 col-sm-4\" >Start Price</th>\
          <th  class=\"col-xs-3 col-sm-3\" >Rank</th>\
      </tr>\
  </thead>\
  <tbody>';
  $.each( pches, function( key, value ) {
      var p_info = "\
      <tr id = \"pch_"+(key+1)+"\">\
         <td  class=\"col-xs-3\" >\
          <label class=\"custom-control custom-checkbox\">\
              <input type=\"checkbox\" class=\"custom-control-input\" name=\"pch\" class=\"pch\" value=\""+value.sr_no+"\" value=\"Bike\">\
              <span class=\"custom-control-indicator\"></span>\
          </label>\
          </td>\
          <td  class=\"col-xs-2\" >"+value.sr_no+"</td>\
          <td  class=\"col-xs-4 col-sm-4\" id = \"pch_"+(key+1)+"\_start\">"+value.start_price+"</td>\
          <td  class=\"col-xs-3 col-sm-3\"id = \"pch_"+(key+1)+"\_rank\" >"+value.your_rank+"</td>\
      </tr>";

      p_infos = p_infos+p_info;
     if(value.your_rank==0){
      not_bidded_count = not_bidded_count + 1;
     }else if($.trim(value.your_rank)=="1"){
      win_count = win_count + 1;
     }else{
      rank_not_one = rank_not_one + 1;
     }
  });
  p_infos = p_infos+"</tbody></table>";
  p_infos =  p_infos+"</div>\
  </div>";
  bidded_count = rank_not_one + win_count;
  total_pches = pches.length;
  efficiency = win_count/bidded_count*100;
  efficiency = efficiency.toFixed(0);

  p_infos_start="<div class=\"col-md-3\">";
  efficiency_info =  "<div class=\"efficiency-info\">\
                        <div class=\"btn-group pras-center\">\
                          <div class=\"badge badge-danger client  total\">Total <span class=\"badge\">"+total_pches+"</span></div>\
                          <div class=\"badge badge-danger client bidded\">Bidded <span class=\"badge\">"+bidded_count+"</span></div>\
                        </div>\
                        <div class=\"btn-group pras-center\">\
                          <div class=\"badge badge-danger client win\">Win <span class=\"badge\">"+win_count+"</span></div>\
                          <div class=\"badge badge-danger client efficiency\">Efficiency <span class=\"badge\">"+efficiency+"%</span></div>\
                        </div>\
                      </div>"; 


  rgn_url_hidden = "<input type=\"hidden\"  class=\"rgn_url\" id=\"rgn_url_"+rgn_no+"\" value=\""+rgn_url+"\">";
  p_infos_start=p_infos_start+rgn_url_hidden + efficiency_info;
  p_infos = p_infos_start + p_infos;

   return p_infos;
}

function compare(a,b) {
  if (a.start_price < b.start_price)
    return 1;
  if (a.start_price > b.start_price)
    return -1;
  return 0;
}

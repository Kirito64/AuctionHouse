function Pouch(
    sr_no=0, acc_no=0, bank_id=0, bank_addr=""
    , wt_caret18=0, wt_caret19=0, wt_caret20=0, wt_caret21=0, wt_caret22=0, wt_caret23=0, wt_caret24=0
    , start_price=0, reserve_price=0, increment=0
    , h1bid=0, bid_rank=0, nxt_poss_bid=0
    , gold_cost=2960
    ) {

    this.sr_no = sr_no;
    this.acc_no = acc_no;
    this.bank_id = bank_id;
    this.bank_addr = bank_addr;

    this.wt_caret18 = wt_caret18;
    this.wt_caret19 = wt_caret19;
    this.wt_caret20 = wt_caret20;
    this.wt_caret21 = wt_caret21;
    this.wt_caret22 = wt_caret22;
    this.wt_caret23 = wt_caret23;
    this.wt_caret24 = wt_caret24;

    this.start_price = start_price;
    this.reserve_price = reserve_price;
    this.increment = increment;

    this.h1bid = h1bid;
    this.bid_rank = bid_rank;
    this.nxt_poss_bid = nxt_poss_bid;

    this.gold_cost = gold_cost;
    this.max_bid = 0;

    this.extract = function(){

    }
    this.save = function(){

    }
    this.process = function(){

    }
    this.display = function(){

    }


    this.set_max_bid = function() {
        var max_bid_cost = 0;

        max_bid_cost = (18/24*wt_caret18*gold_cost) + (19/24*wt_caret19*gold_cost) + (20/24*wt_caret20*gold_cost) + (21/24*wt_caret21*gold_cost) + (22/24*wt_caret22*gold_cost) + (23/24*wt_caret23*gold_cost) + (24/24*wt_caret24*gold_cost);
            var deviation =  window["deviation"];
            max_bid_cost = max_bid_cost + (max_bid_cost/100*deviation); 

        this.max_bid = Math.ceil(max_bid_cost);
    };
}

function PouchExtractor(pch={}, gold_cost=0, sr_no=0) {
    this.pch = pch;
    this.unique_id = sr_no;
    this.row_sel = "#rowid_"+this.unique_id;
    this.caret_sel = "#txtcell_"+this.unique_id;

    this.details_sel = "#details_"+this.unique_id;
    this.start_price_sel = "#startPrice_"+this.unique_id;
    this.reserve_price_sel = "#reserverPrice_"+this.unique_id;
    this.increment_sel = "#incDecAmt_"+this.unique_id;

    this.h1bid_sel = "#h1l1Amount_"+this.unique_id;
    this.bid_rank_sel = "#bidRank_"+this.unique_id;
    this.nxt_poss_bid_sel = "#netBidAmt_"+this.unique_id;

    this.gold_cost = gold_cost;

    this.selector = ".table-border .m-bottom3";
    this.set_pch = function(){
        var sr_no = $.trim($(this.row_sel).find(this.caret_sel+("_"+1)).text());
        var acc_no = $.trim($(this.row_sel).find(this.caret_sel+("_"+3+" a")).text());
        var bank_id = $.trim($(this.row_sel).find(this.caret_sel+("_"+6)).text());
        var bank_addr = $.trim($(this.row_sel).find(this.caret_sel+("_"+8)).text());

        var wt_caret18=$.trim($(this.row_sel).find(this.caret_sel+("_"+9)).text());
        var wt_caret19=$.trim($(this.row_sel).find(this.caret_sel+("_"+10)).text());
        var wt_caret20=$.trim($(this.row_sel).find(this.caret_sel+("_"+11)).text());
        var wt_caret21=$.trim($(this.row_sel).find(this.caret_sel+("_"+12)).text());
        var wt_caret22=$.trim($(this.row_sel).find(this.caret_sel+("_"+13)).text());
        var wt_caret23=$.trim($(this.row_sel).find(this.caret_sel+("_"+14)).text());
        var wt_caret24=$.trim($(this.row_sel).find(this.caret_sel+("_"+15)).text());

        var start_price=$.trim($(this.details_sel).find(this.start_price_sel).text());
        var reserve_price=$.trim($(this.details_sel).find(this.reserve_price_sel).text());
        var increment=$.trim($(this.details_sel).find(this.increment_sel).text());
        var h1bid=$.trim($(this.details_sel).find(this.h1bid_sel).text());
        var bid_rank=$.trim($(this.details_sel).find(this.bid_rank_sel).text());
        var nxt_poss_bid=$.trim($(this.details_sel).find(this.nxt_poss_bid_sel).text());


        var next_possible_bid=$(this).find("#netBidAmt_"+(this.unique_id)).text();
        var pch_obj=new Pouch(
            sr_no, acc_no, bank_id, bank_addr
            , wt_caret18, wt_caret19, wt_caret20, wt_caret21, wt_caret22, wt_caret23, wt_caret24
            , start_price, reserve_price, increment
            , h1bid, bid_rank, nxt_poss_bid
            , this.gold_cost);
        pch_obj.set_max_bid();
        this.pch = pch_obj;
    }

    this.get_pches = function(){
        pches = [];
        pches_sel=$(this.selector);
        $.each( pchinfos, function( key, value ) {

        });
    }

    this.pches = [];
    this.insert_max_bid_cost_ele = function() {
        pches = [];
        pchinfos=$(this.selector);
        $.each( pchinfos, function( key, value ) {
           unique_id = key+1;
           var wt_caret18=$(this).find("#txtcell_"+(unique_id)+("_"+9)).text();
           var wt_caret19=$(this).find("#txtcell_"+(unique_id)+("_"+10)).text();
           var wt_caret20=$(this).find("#txtcell_"+(unique_id)+("_"+11)).text();
           var wt_caret21=$(this).find("#txtcell_"+(unique_id)+("_"+12)).text();
           var wt_caret22=$(this).find("#txtcell_"+(unique_id)+("_"+13)).text();
           var wt_caret23=$(this).find("#txtcell_"+(unique_id)+("_"+14)).text();
           var wt_caret24=$(this).find("#txtcell_"+(unique_id)+("_"+15)).text();
           var next_possible_bid=$(this).find("#netBidAmt_"+(unique_id)).text();

            var pch_obj=new Pouch(
           0, 0, 0, ""
           , wt_caret18, wt_caret19, wt_caret20, wt_caret21, wt_caret22, wt_caret23, wt_caret24
           , 0, 0, 0
           , 0, 0, 0
           , gold_cost);

           pch_obj.set_max_bid();
           var max_bid_cost=pch_obj.max_bid;

                placeholder = $("#details_"+unique_id+" tr").eq(1).find("td");
                max_bid_id =  $("#maxBid_"+unique_id);
              if((next_possible_bid - 100)<max_bid_cost){
                    bg_color = "greenyellow";
              }else{
                bg_color = "red";
              }
                if (max_bid_id.length ) {
                    max_bid_id.replaceWith('\
                    <span id="maxBid_'+unique_id+'" class="max_bid" style="background-color:'+bg_color+'">\
                    <span id="npb_'+unique_id+'">\
                        <span class="black suffix1_'+unique_id+'">|&nbsp;</span>\
                        <span class="black">Next Possible Bid&nbsp;:&nbsp;</span>\
                        <span id="npb1_'+unique_id+'">'+next_possible_bid+'</span>\
                    </span>\
                    <span >\
                        <span class="black suffix1_'+unique_id+'">|&nbsp;</span>\
                        <span class="black">Max bid&nbsp;:&nbsp;</span>\
                        <span id="maxBidAmt_'+unique_id+'">'+max_bid_cost+'</span>\
                    </span>\
                    </span>\
               ');

                }else{ 
                    placeholder.append('\
                    <span id="maxBid_'+unique_id+'" style="background-color:'+bg_color+'">\
                    <span id="npb_'+unique_id+'" >\
                        <span class="black suffix1_'+unique_id+'">|&nbsp;</span>\
                        <span class="black">Next Possible Bid&nbsp;:&nbsp;</span>\
                        <span id="npb1_'+unique_id+'">'+next_possible_bid+'</span>\
                    </span>\
                    <span  >\
                        <span class="black suffix1_'+unique_id+'">|&nbsp;</span>\
                        <span class="black">Max bid&nbsp;:&nbsp;</span>\
                        <span id="maxBidAmt_'+unique_id+'">'+max_bid_cost+'</span>\
                    </span>\
                    </span>\
               ');
                }

          });
        return pchinfos.size();
    };

    this.enter_next_possible_bid = function() {
        pchinfos=$(this.selector);
        biddable_pch_count = 0;
        bmwr1i = [];
        pch_below_max_bid_index = 0;
        $.each( pchinfos, function( key, value ) {
                unique_id = key+1;
                var next_bid=$.trim($(this).find("#netBidAmt_"+unique_id).text());
                next_bid = Math.ceil(next_bid);

                var max_bid = $.trim($(this).find("#maxBidAmt_"+unique_id).text());
                var bid_rank = $.trim($(this).find("#bidRank_"+(unique_id)).text());
                if($.trim(bid_rank)=="Not bidded"){
                 bid_rank = 0;
                }
                text_field_ele=$(this).find("#txtcell_"+unique_id+"_18");
                if(parseInt(max_bid)>parseInt(next_bid)){ 
                    text_field_ele.val(next_bid);
                    bmwr1i[pch_below_max_bid_index] = unique_id;
                    pch_below_max_bid_index++;
                }else{
                    text_field_ele.val(max_bid);
                }
                text_field_ele.focus();
                text_field_ele.blur();
                biddable_pch_count = biddable_pch_count +1;

          });
          return bmwr1i;
    }


    this.f_html = function() {
        pchinfos=$(this.selector);
        pches = [];
        $.each( pchinfos, function( key, value ) {
            var sr_no =$.trim($(this).find("#txtcell_"+(key+1)+"_1").text());
            var start_price_with_comma = $.trim($(this).find("#startPrice_"+(key+1)).text());
            var start_price = parseFloat($.trim($(this).find("#startPrice_"+(key+1)).text()).replace(/,/g,''));
            start_price = Math.ceil(start_price);
            var your_rank = $.trim($(this).find("#bidRank_"+(key+1)).text());
            if(isNaN(your_rank)){
                your_rank=0;
             }
            pch = {sr_no:sr_no, start_price:start_price, your_rank:your_rank,start_price_with_comma:start_price_with_comma};
            pches[key] = pch;
        });
        p_infos = create_pch_asc_list_html(pches);
        return p_infos;
    }

    this.f = function() {
        pchinfos=$(this.selector);
        pches = [];
        $.each( pchinfos, function( key, value ) {
            var sr_no =$.trim($(this).find("#txtcell_"+(key+1)+"_1").text());
            var start_price_with_comma = $.trim($(this).find("#startPrice_"+(key+1)).text());
            var start_price = parseFloat($.trim($(this).find("#startPrice_"+(key+1)).text()).replace(/,/g,''));
            start_price = Math.ceil(start_price);
            var your_rank = $.trim($(this).find("#bidRank_"+(key+1)).text());
            if(isNaN(your_rank)){
                your_rank="0";
             }
            pch = {sr_no:sr_no, start_price:start_price, your_rank:your_rank,start_price_with_comma:start_price_with_comma};
            pches[key] = pch;
        });
        return pches;
    }

    this.f_report = function() {
        pchinfos=$(this.selector);
        pches = [];
        $.each( pchinfos, function( key, value ) {
            var sr_no =$.trim($(this).find("#txtcell_"+(key+1)+"_1").text());
            var start_price_with_comma = $.trim($(this).find("#startPrice_"+(key+1)).text());
            var start_price = parseFloat($.trim($(this).find("#startPrice_"+(key+1)).text()).replace(/,/g,''));
            var h1_price_with_comma = $.trim($(this).find("#h1l1Amount_"+(key+1)).text());
            var h1_price = parseFloat($.trim($(this).find("#h1l1Amount_"+(key+1)).text()).replace(/,/g,''));
            
            var is_above_max_bid = false;
            var background_color =$.trim($(this).find("#maxBid_"+(key+1)).css("background-color"));
            if(background_color=="rgb(255, 0, 0)") {
                is_above_max_bid = true;
            }
            
            start_price = Math.ceil(start_price);
            h1_price = Math.ceil(h1_price);
            var your_rank = $.trim($(this).find("#bidRank_"+(key+1)).text());
            if(isNaN(your_rank)){
                your_rank="0";
             }
            pch = {sr_no:sr_no,start_price:start_price,h1_price:h1_price,your_rank:your_rank,start_price_with_comma:start_price_with_comma,is_above_max_bid:is_above_max_bid};
            pches[key] = pch;
        });
        return pches;
    }


    function create_pch_asc_list_html (pches) {
        p_infos = "";

        not_bidded_count = 0;
        bidded_count = 0;
        win_count = 0;
        rank_not_one = 0;
        p_infos=' <table class="table table-bordered table-sm m-0" id="pch_info" data-toggle="checkboxes" data-range="true">\
        <thead class="">\
            <tr>\
                <th id="pbc">#</th>\
                <th >Sr. No.</th>\
                <th >Pouch No.</th>\
                <th >Start Price</th>\
                <th >Rank</th>\
            </tr>\
        </thead>\
        <tbody>';
        $.each( pches, function( key, value ) {
            var p_info = "\
            <tr>\
               <td>\
                <label class=\"custom-control custom-checkbox\">\
                    <input type=\"checkbox\" class=\"custom-control-input\" name=\"pch\" class=\"pch\" value=\""+value.sr_no+"\" value=\"Bike\">\
                    <span class=\"custom-control-indicator\"></span>\
                </label>\
                </td>\
                <td>"+(key+1)+"</td>\
                <td>"+value.sr_no+"</td>\
                <td>"+value.start_price+"</td>\
                <td>"+value.your_rank+"</td>\
            </tr>";

            p_infos = p_infos+p_info;
           if($.trim(value.your_rank)=="Not bidded"){
            not_bidded_count = not_bidded_count + 1;
           }else if($.trim(value.your_rank)=="1"){
            win_count = win_count + 1;
           }else{
            rank_not_one = rank_not_one + 1;
           }
        });
        p_infos = p_infos+"</tbody></table>";

        bidded_count = rank_not_one + win_count;
        total_pches = pches.length;
        efficiency = win_count/bidded_count*100;
        efficiency_info = "efficiency="+efficiency+"%, win_count="+win_count+", bidded_count="+bidded_count+", total_pches="+total_pches+"<br/>" ;
         p_infos = efficiency_info+p_infos+"";
         return p_infos;
    }

    function compare(a,b) {
        if (a.start_price < b.start_price)
          return 1;
        if (a.start_price > b.start_price)
          return -1;
        return 0;
    }


    this.click_on_bid_btn = function() {
        pchinfos=$(this.selector);
        $.each( pchinfos, function( key, value ) {

            });
        return "btn clicked";
    }
    this.bid_on_selected_pch = function() {
        pchinfos=$(this.selector);
        $.each( pchinfos, function( key, value ) {

            });
        return "btn clicked";
    }

    this.g = function() {
        getBidDetails();
    }

}

sr_no = 1;
var gold_price =  window["gold_price"];
window.pch_extractor = new PouchExtractor({}, gold_price, sr_no); 

pch_extractor.set_pch();
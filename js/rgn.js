function Region(
    pches = []
    , sr_no=0, name="def name", bid_hall_link="def hall link", auction_id="def auction id"
    , start_datetime = "def start datetime", end_datetime = "def end datetime"
    ,gold_cost=3000
) {
    this.pches = pches;
    this.sr_no = sr_no;
    this.name = name;
    this.bid_hall_link = bid_hall_link;
    this.gold_cost = gold_cost;
    this.set_pches = function(pches){
        this.pches = pches;
    }
}


function RegionExtractor(rgn={}, gold_cost, sr_no) {
    this.rgn = rgn;
    this.unique_id =  (sr_no+1)*2;
    this.gold_cost =  gold_cost;
    this.sr_no_sel = "tr:nth-child("+this.unique_id+") .a-center b";
    this.name_sel = "tr:nth-child("+this.unique_id+") p a:first-child";
    this.bid_hall_link_sel = "tr:nth-child("+this.unique_id+") a:nth-child(8)";

    this.selector = ".details-box";

    this.set_rgn = function(rgn){
        var sr_no = $.trim($(this.sr_no_sel).text());
        this.name = $.trim($(this.name_sel).text());
        this.bid_hall_link = $.trim($(this.bid_hall_link_sel).attr("href"));
        this.rgn = rgn;
    }

    this.e = function() {
        rgninfos=$(this.selector);
        rgns = [];
        $.each( rgninfos, function( key, value ) {
            unique_id =  (key+1)*2; 
            sr_no_sel = "tr:nth-child("+unique_id+") .a-center b";
            name_sel = "tr:nth-child("+unique_id+") p a:first-child";
            bid_hall_link_sel = "tr:nth-child("+unique_id+") a:contains('Manual bid')";
            var sr_no = $.trim($(sr_no_sel).text());
            var name = $.trim($(name_sel).text());
            var bid_hall_link = $.trim($(bid_hall_link_sel).attr("href"));
            if(!bid_hall_link){
                bid_hall_link_sel = "tr:nth-child("+unique_id+") a:contains('View result')";
                bid_hall_link = $.trim($(bid_hall_link_sel).attr("href"));
            }
            basic_url = "https://jewel-auction.procuretiger.com";  // change1 for jewel-auction.procuretiger.com
            //basic_url = "http://localhost";

            bid_hall_link = basic_url + bid_hall_link;
            rgn= new Region(pches = [], sr_no, name, bid_hall_link, "", "", "",this.gold_cost);
            rgns[key] = rgn;
        });
        return rgns;
    }
}

sr_no = 0;
window.rgn_extractor = new RegionExtractor({}, 3000, sr_no);
rgn_extractor.set_rgn();

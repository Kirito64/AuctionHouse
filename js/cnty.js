function cnty(rgns,gold_cost) {
    this.rgns = rgns; 
    this.gold_cost = gold_cost;
    this.set_rgns = function(rgns){
        
        this.rgns = rgns;
    }

    this.get_rgns = function(){
        return this.rgns;
    }
}

cnty = new cnty();
cnty.set_rgns();
module.exports = Nightmare =>{
    return Nightmare.action('c', function (done) {
      this.evaluate_now(function() {
        $(document).ready(function(){
          pches = pch_extractor.insert_max_bid_cost_ele();
      });
      
        return {
          test:"c"
        }
      }, done)
    })
    }
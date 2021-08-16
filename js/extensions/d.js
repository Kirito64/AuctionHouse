module.exports = Nightmare =>{
    return Nightmare.action('d', function (done) {
      this.evaluate_now(function() {
        $(document).ready(function(){
          bmwr1i = pch_extractor.enter_next_possible_bid();
      });
      
        return {
          bmwr1i:bmwr1i
        }
      }, done)
    })
 }

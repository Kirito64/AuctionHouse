module.exports = Nightmare =>{
    return Nightmare.action('f', function (done) {
      this.evaluate_now(function() {

        
        $(document).ready(function(){
          
          pches = pch_extractor.f();
      });
      
        return {
          "pches":pches
        }
      }, done)
    })
    }
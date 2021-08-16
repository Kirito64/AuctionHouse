module.exports = Nightmare =>{
    return Nightmare.action('g', function (done) {
      this.evaluate_now(function() {
        $(document).ready(function(){
          pches = pch_extractor.g();
      });
        return {
          test:"g"
        }
      }, done)
    })
    }
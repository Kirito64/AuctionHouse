module.exports = Nightmare =>{
    return Nightmare.action('e', function (done) {
      this.evaluate_now(function() {
          rgns = rgn_extractor.e();
        return {
          "rgn_infos":rgns
        }
      }, done)
    })
    }
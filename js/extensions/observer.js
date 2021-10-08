
module.exports = Nightmare =>{
	return Nightmare.action('observer', function(done){
		this.evaluate_now(()=>{
			var observer = new MutationObserver((mutations)=>{
				mutations.forEach(mutation => {
					console.log(mutation)
				})

			})

			return {
				"observer": observer,
			};
		}, done);
	})
}
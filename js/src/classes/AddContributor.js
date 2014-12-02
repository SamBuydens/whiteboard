module.exports = (function(){


	function AddContributor($el) { console.log('[AddContributor] constructor');
		this.$el = $el;
		this.input = this.$el.find('.input-contributor')[0];
		this.$el.find('.input-contributor')[0].addEventListener('submit', this.submitHandler.bind(this));
	}

	AddContributor.prototype.submitHandler = function(event) {
		event.preventDefault();
		console.log("SUBMUT");
		//bean.fire(this, "addContributor", this.input.value);
		this.input.value = '';
	};


	return AddContributor;

})();
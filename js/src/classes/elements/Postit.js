module.exports = (function(){

	function Postit(txt) { console.log('[Postit] constructor');
		if(txt){
		this.txt = txt;
		}
	}

	Postit.prototype.createPostit = function(){ console.log('[Postit] createPostit');
		var entryText = $('#postit-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};

		if(this.txt){
			context.txt = this.txt;
		}else{
			context.txt = "Nieuwe Postit";
		}
		var html = template(context);
		return ($(html));
	};

	return Postit;

})();
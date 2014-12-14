module.exports = (function(){

	function PictureEdit($el,txt,elementId) { console.log('[PictureEdit] constructor');
		this.$el = $el;
		var entryText = $('#picture-edit-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		context.txt = txt;
		var html = template(context);
		return ($(html));
	}

	return PictureEdit;

})();
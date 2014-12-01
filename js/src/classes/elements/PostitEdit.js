module.exports = (function(){

	function PostitEdit($el,txt,id) { console.log('[PostitEdit] constructor');
		this.$el = $el;
		var entryText = $('#postit-edit-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		context.txt = txt;

		var html = template(context);
		$('#'+id).append( $(html) );

		this.bindClickHandlers(id);
	}
	
	return PostitEdit;

})();
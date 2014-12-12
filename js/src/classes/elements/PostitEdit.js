module.exports = (function(){

	function PostitEdit(txt) { console.log('[PostitEdit] constructor');
		var entryText = $('#postit-edit-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		context.txt = txt;

		var html = template(context);

		return ($(html));

	}
	
	return PostitEdit;

})();
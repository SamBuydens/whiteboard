module.exports = (function(){

	function MotionEdit(vidSrc, elementId) { console.log('[MotionEdit] constructor');
		var entryText = $('#motion-edit-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		context.vidSrc = vidSrc;
		var html = template(context);
		return ($(html));
	}

	return MotionEdit;

})();



module.exports = (function(){

	function MotionEdit($el,vidSrc,id) { console.log('[MotionEdit] constructor');
		this.$el = $el;
		var entryText = $('#motion-edit-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		context.vidSrc = vidSrc;

		var html = template(context);
		$('#'+id).append( $(html) );

		this.bindClickHandlers(id);
	}
	
	return MotionEdit;

})();
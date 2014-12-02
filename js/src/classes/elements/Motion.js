module.exports = (function(){

	function Motion($el,xPos,yPos,vidSrc) { console.log('[Motion] constructor');
		if(vidSrc){
		this.vidSrc = vidSrc;
		};
	};

	Motion.prototype.createPicture = function(){ console.log('[Motion] creatPicture');
		var entryText = $('#motion-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};

		if(this.vidSrc){
			context.vidSrc = this.vidSrc;
		}else{
			context.vidSrc = "Nieuwe Video";
		}
		var html = template(context);
		return ($(html));
	};

	return Motion;

})();
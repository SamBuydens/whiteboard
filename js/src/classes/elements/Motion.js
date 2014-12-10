module.exports = (function(){
	var MotionEdit = require('./MotionEdit');


	function Motion($el,xPos,yPos,vidSrc) { console.log('[Motion] constructor');
		this.$el = $el;
		if(vidSrc){
		this.vidSrc = vidSrc;
		};
		
	}

	Motion.prototype.createMotion = function(){ console.log('[Motion] creatMotion');
		var entryText = $('#motion-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};

		if(this.vidSrc){
			context.vidSrc = this.vidSrc;
		}else{
			context.vidSrc = "";
		}

		var html = template(context);
		return($(html));
		
	};
	
	Motion.prototype.edit = function($el,elementId){  console.log('[Motion] edit');

		this.$el = $el;
		this.elementId = elementId;	
		this.$el.find("#"+elementId).append(new MotionEdit(this.vidSrc, elementId));

	};

	Motion.prototype.confirm = function(){ console.log('[Motion] confirm');
		this.vidSrc = this.$el.find("#"+this.elementId+" .motion-edit").val();
		this.endEdit();
	};

	Motion.prototype.endEdit = function(){ console.log('[Motion] endEdit');
		this.$el.find("#"+this.elementId+" > .motion-edit").remove();
	};


	return Motion;

})();
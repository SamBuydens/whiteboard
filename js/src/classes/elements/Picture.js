module.exports = (function(){
	var PictureEdit = require('./PictureEdit');

	function Picture($el,xPos,yPos, imgSrc) { console.log('[Picture] constructor');
		this.$el = $el;
		console.log($el);
		if(imgSrc){
		this.imgSrc = imgSrc;
		}
	}

	Picture.prototype.createPicture = function(){ console.log('[Picture] creatPicture');
		var entryText = $('#picture-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};

		if(this.txt){
			context.imgSrc = this.imgSrc;
		}else{
			context.imgSrc = "";
		}
		var html = template(context);
		return($(html));
	};
	

	Picture.prototype.edit = function($el,elementId){ console.log('[Picture] edit');
		this.$el = $el;
		this.elementId = elementId;	
		this.$el.find("#"+elementId).append(new PictureEdit($el, this.imgSrc,elementId));
	};

	Picture.prototype.confirm = function(){ console.log('[Picture] confirm');
		this.imgSrc = this.$el.find("#"+this.elementId+" .input-picture").val();
		this.endEdit();
	};

	Picture.prototype.endEdit = function(){ console.log('[Picture] endEdit');

	console.log(this.elementId);
		this.$el.find("#"+this.elementId+" > .input-picture").remove();

	};

	return Picture;

})();
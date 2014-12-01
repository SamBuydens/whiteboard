module.exports = (function(){


	var Postit = require('./elements/Postit');

	function Element($el,elementType,position,id) { console.log('[Element] constructor');
		this.$el = $el;

		this.elementId = id;
		if(this.elementId){
			this.elementId = id;
		}else {
			this.elementId = this.$el.find(".element-holder").length + 1;
		}

		this.elementType = elementType;
		this.position = position;
		this.createElementHolder();
	}

	Element.prototype.createElementHolder = function(){ console.log('[Element] createElementHolder');
		this.$el.find("#whiteboard").append("<section class='element-holder'></section>");
		this.$el.find(".element-holder:last-of-type").attr('id', this.elementId);
		var position = {
			top : this.position.yPos,
			left : this.position.xPos
		};
		this.$el.find("#"+this.elementId).css(position);
		this.createElement();
	};

	Element.prototype.createElement = function(){ console.log('[Element] createElement');
		switch(this.elementType) {
		    case "post-it":
		    	this.element = new Postit();
		    	this.$el.find("#"+this.elementId).append(this.element.createPostit);
		        break;
		    case "static":

		        break;
		    case "motion":

		        break;
		}
	};

	return Element;

})();
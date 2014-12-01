module.exports = (function(){

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
	console.log(this.elementType);
		switch(this.elementType) {
		    case "postit":
		    	console.log('POSTEEE');
		        break;
		    case "image":
		    	console.log("IMAGE");
		        break;
		    case "video":
		        console.log("video");
		        break;
		}
	};

	return Element;

})();
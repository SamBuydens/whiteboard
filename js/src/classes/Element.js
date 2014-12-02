module.exports = (function(){

	var EditMenu = require('./EditMenu');
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
		this.$el.find("#whiteboard").append("<article class='element-holder'></article>");
		this.$el.find(".element-holder:last-of-type").attr('id', this.elementId);
		var position = {
			top : this.position.yPos,
			left : this.position.xPos
		};
		this.$el.find("#"+this.elementId).css(position);
		this.createEditMenu();
		this.createElement();
	};

	Element.prototype.createElement = function(){ console.log('[Element] createElement');
		switch(this.elementType) {
		    case "post-it":
		    	this.element = new Postit();
		    	this.$el.find("#"+this.elementId).append(this.element.createPostit());
		        break;
		    case "static":

		        break;
		    case "motion":

		        break;
		}
	};

	Element.prototype.createEditMenu = function(){ console.log('[Element] createEditMenu');
		this.editMenu = new EditMenu(this.$el, this.elementId);
		bean.on(this.editMenu, "edit-clicked", this.editClickedHandler.bind(this));
		bean.on(this.editMenu, "action-clicked", this.actionClickedHandler.bind(this));
	};

	Element.prototype.editClickedHandler = function(event){ console.log('[Element] editClickedHandler');
		this.element.edit(this.$el, this.elementId);
	};

	Element.prototype.actionClickedHandler = function(event){ console.log('[Element] actionClickedHandler');
		switch(event.targetId) {
		    case "remove":
		    	this.editMenu.toggleVisible();
		    	this.$el.find('#'+event.elementId).remove();
		        break;
		    case "edit":
		    	this.element.confirm();
		    	this.editMenu.toggleVisible();
		        break;
		    case "cancel":
		    	this.element.endEdit();
		    	this.editMenu.toggleVisible();
		        break;
		}
	};

	return Element;

})();
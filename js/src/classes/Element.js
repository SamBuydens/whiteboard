module.exports = (function(){

	var EditMenu = require('./EditMenu');
    var zIndexCounter = 1;
	var Postit = require('./elements/Postit');
	var Picture = require('./elements/Picture');
	var Motion = require('./elements/Motion');

	function Element($el,elementType,position,elementId,content,id) { console.log('[Element] constructor');
		this.$el = $el;
		this.content = content;
		this.elementType = elementType;
		this.elementId = elementId;
		if(this.elementId){
			this.elementId = elementId;
		}else {
			this.elementId = this.setElementId();
		}
		this.position = position;
		if(id){
			this.id = id;
		}
		this.createElementHolder();
	}

	Element.prototype.createElementHolder = function(){ console.log('[Element] createElementHolder');
		this.$el.find("#whiteboard").append("<section class='element-holder'></section>");
		this.$el.find(".element-holder:last-of-type").attr('id', this.elementId);
		var position = {};
		position.top = this.position.yPos;
		position.left = this.position.xPos;
		position.zIndex = 0;
		this.$el.find("#"+this.elementId).css(position);
		this.createEditMenu();
		this.createElement();
	};

	Element.prototype.createElement = function(){ console.log('[Element] createElement');
		switch(this.elementType) {
		    case "post-it":
		    	this.element = new Postit(this.content);
		    	this.$el.find("#"+this.elementId).append(this.element.createPostit());
		    	this.$el.find("#"+this.elementId).append(this.element.createPostit);
		    	this.bindHandler(this.$el.find("#"+this.elementId));
		        break;
		    case "static":
		    	this.element = new Picture(this.$el.find("#"+this.elementId));
		    	this.$el.find("#"+this.elementId).append(this.element.createPicture);
		    	this.bindHandler(this.$el.find("#"+this.elementId));
		        break;
		    case "motion":
		    	this.element = new Motion(this.$el.find("#"+this.elementId));
		    	this.$el.find("#"+this.elementId).append(this.element.createMotion);
		    	this.bindHandler(this.$el.find("#"+this.elementId));
		        break;
		}
	};

	Element.prototype.bindHandler = function($el){ console.log('[Element] bindHandler');
		this.$el.find("#"+this.elementId).on('mousedown', this.mousedownHandler.bind(this));
		this.mouseDown = false;
	};

	Element.prototype.mousedownHandler = function(e){ console.log('[Element] mousedownHandler');
        this.mouseDown = true;
        
        this._mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this._mouseUpHandler = this.mouseUpHandler.bind(this);

        this.offsetX = e.offsetX;
        this.offsetY = e.offsetY;
                
        ++zIndexCounter;
        this.$el.find("#"+this.elementId).css('zIndex', zIndexCounter);
        
        document.body.addEventListener('mousemove', this._mouseMoveHandler);
        document.body.addEventListener('mouseup', this._mouseUpHandler);
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
		    	var actionEvent = {};
		    	actionEvent.id = this.id;
		    	actionEvent.elementType = this.elementType;
		    	bean.fire(this, "remove-clicked", actionEvent);
		        break;
		    case "edit": console.log("EDITE");
		    	this.element.confirm();
		    	this.editMenu.toggleVisible();
		        break;
		    case "cancel":
		    	this.element.endEdit();
		    	this.editMenu.toggleVisible();
		        break;
		}
	};
    Element.prototype.mouseMoveHandler = function(e){ console.log('[Element] mousemoveHandler');
        if(this.mouseDown === true){
            var mouseX = parseInt(e.clientX);
            var mouseY = parseInt(e.clientY);
            this.$el.find("#"+this.elementId).css('left', mouseX - this.offsetX);
            this.$el.find("#"+this.elementId).css('top', mouseY - this.offsetY);
        }
    };

    Element.prototype.mouseUpHandler = function(e){ console.log('[Element] mouseupHandler');

        this.mouseDown = false;
        
        document.body.removeEventListener('mousemove', this._mouseMoveHandler);
        document.body.removeEventListener('mouseup', this._mouseUpHandler);
    };

    Element.prototype.setElementId = function(e){ console.log('[Element] setElementId');
    	var holders = this.$el.find(".element-holder");
			var idHolder =[];
			for(i = 0;i < holders.length; i++ ){
				idHolder.push(holders[i].id);
			}
			idHolder.sort(function(a, b){return b-a});
			return Number(idHolder[0])+1;
		};

	return Element;

})();
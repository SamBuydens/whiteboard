module.exports = (function(){

	//TODO: INSTELLINGEN KADER TOEVOEGEN VIA HANDLEBARS
	var ElementPicker = require('./ElementPicker');
	
	function Whiteboard($el) { console.log('[Whiteboard] constructor');
		this.$el = $el;
	}

	Whiteboard.prototype.createBlanc = function(){ console.log('[Whiteboard] createsBlanc');
		this.$el.append( "<article id='whiteboard'></article>" );
		this.addElementPicker();
		this.bindClickHandler();
	};

	Whiteboard.prototype.bindClickHandler = function(){ console.log('[Whiteboard] bindClickHandler');
		this.$el.find("#whiteboard").on('click', this.clickHandler.bind(this));
	};

	Whiteboard.prototype.clickHandler = function(event){ console.log('[Whiteboard] clickHandler');
   		var xPos = event.pageX - this.$el.offset().left;
   		var yPos = event.pageY - this.$el.offset().top;
   		var position = {};
   		position.xPos = xPos;
   		position.yPos = yPos;
		
		this.$el.find("#element-picker").toggleClass("hidden");

		bean.fire(this, "whiteboard-clicked", position); 
	};

	Whiteboard.prototype.addElementPicker = function(){ console.log('[Whiteboard] addElementPicker');
		this.elementPicker = new ElementPicker( this.$el );
	};

	return Whiteboard;

})();
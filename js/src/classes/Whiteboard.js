module.exports = (function(){

	//TODO: INSTELLINGEN KADER TOEVOEGEN VIA HANDLEBARS

	function Whiteboard($el) { console.log('[Whiteboard] constructor');
		this.$el = $el;
	}

	Whiteboard.prototype.createBlanc = function(){ console.log('[Whiteboard] createsBlanc');
		console.log(this.$el);
		this.$el.append( "<div id='whiteboard'></div>" );

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
		
		bean.fire(this, "whiteboard-clicked", position); 
	};

	return Whiteboard;

})();
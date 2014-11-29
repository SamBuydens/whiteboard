module.exports = (function(){

	var Whiteboard = require('./Whiteboard');
	var ElementPicker = require('./ElementPicker');

	function App($el) { console.log('[App] constructor');
		this.$el = $el;

		this.whiteboard = new Whiteboard( this.$el );
		this.whiteboard.createBlanc();

		//LUISTEREN
		bean.on(this.whiteboard, "whiteboard-clicked", this.whiteboardClickedHandler.bind(this));

	}

	App.prototype.whiteboardClickedHandler = function(event) { console.log('[App] whiteboardClickedHandler - position: X=' + event.xPos +" Y="+event.yPos );
		this.elementPicker = new ElementPicker( this.$el );
	};

	return App;

})();
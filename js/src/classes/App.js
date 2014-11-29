module.exports = (function(){

	var Whiteboard = require('./Whiteboard');

	function App($el) { console.log('[App] constructor');
		this.$el = $el;

		this.whiteboard = new Whiteboard( this.$el );
		this.whiteboard.createBlanc();

		//LUISTEREN
		bean.on(this.whiteboard, "whiteboard-clicked", this.whiteboardClickedHandler.bind(this));
		bean.on(this.whiteboard.elementPicker, "element-picker-clicked", this.elementPickerClickedHandler.bind(this));

	}

	App.prototype.whiteboardClickedHandler = function(event) { console.log('[App] whiteboardClickedHandler - position: X=' + event.xPos +" Y="+event.yPos );
		var position = {
			top : event.yPos,
			left : event.xPos
		}

		this.$el.find("#element-picker").css(position);
	};

	App.prototype.elementPickerClickedHandler = function(event) { console.log('[App] elementPickerClickedHandler - id = ' + event );
		
	};

	return App;

})();
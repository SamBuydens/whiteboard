module.exports = (function(){

	var Whiteboard = require('./Whiteboard');
	var ElementPicker = require('./ElementPicker');
	var Element = require('./Element');

	function App($el) { console.log('[App] constructor');
		this.$el = $el;
		this.position = {};
		this.whiteboard = new Whiteboard(this.$el);
		this.elementPicker = new ElementPicker(this.$el);
		//LUISTEREN
		bean.on(this.whiteboard, "whiteboard-clicked", this.whiteboardClickedHandler.bind(this));
		bean.on(this.elementPicker, "element-picker-clicked", this.elementPickerClickedHandler.bind(this));
	}

	App.prototype.whiteboardClickedHandler = function(event){ console.log('[App] whiteboardClickedHandler');
		this.elementPicker.toggleVisible();
		this.elementPicker.setLocation(event.xPos, event.yPos);
		this.position = event;
	};

	App.prototype.elementPickerClickedHandler = function(event){ console.log('[App] elementPickerClickedHandler'); 
		this.elementPicker.toggleVisible();
		//CREATE BLANC
		var element = new Element(this.$el,event,this.position);
	};

	return App;

})();
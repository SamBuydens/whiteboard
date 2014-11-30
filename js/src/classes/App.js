module.exports = (function(){

	var Whiteboard = require('./Whiteboard');
	var Postit = require('./elements/Postit');
	var PostitCreator = require('./elements/PostitCreator');
	var xPos;
	var yPos;

	function App($el) { console.log('[App] constructor');
		this.$el = $el;

		this.whiteboard = new Whiteboard( this.$el );
		this.whiteboard.createBlanc();

		//LUISTEREN
		bean.on(this.whiteboard, "whiteboard-clicked", this.whiteboardClickedHandler.bind(this));
		bean.on(this.whiteboard.elementPicker, "element-picker-clicked", this.elementPickerClickedHandler.bind(this));

	}

	App.prototype.whiteboardClickedHandler = function(event) { console.log('[App] whiteboardClickedHandler - position: X=' + event.xPos +" Y="+event.yPos );
		xPos = event.xPos;
		yPos = event.yPos;

		console.log(xPos);
		console.log(yPos);

		var position = {
			top : event.yPos,
			left : event.xPos
		};

		this.$el.find("#element-picker").css(position);
	};

	App.prototype.elementPickerClickedHandler = function(event) { console.log('[App] elementPickerClickedHandler - id = ' + event );
		switch(event) {
		    case "postit":
		    console.log("postit gekozen");
		        //var postit = new Postit(this.$el,xPos,yPos);
		        //postit.createPostit();
		        var postitCreator = new PostitCreator(this.$el,xPos,yPos);
		        bean.on(postitCreator, "create-postit-clicked", this.createPostitHandler.bind(this));
		        break;
		    case "image":
		        console.log("image");
		        break;
		    case "video":
		        console.log("video");
		        break;
		}
	};

	App.prototype.createPostitHandler = function(event) { console.log('[App] createPostitHandler');
		var postit = new Postit(this.$el,xPos,yPos);
		postit.createPostit(event);
	};

	return App;

})();
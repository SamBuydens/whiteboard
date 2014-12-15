module.exports = (function(){

	var WhiteboardSettings = require ('./WhiteboardSettings');

	function Whiteboard($el, boardInfo, admin) { console.log('[Whiteboard] constructor');
		this.$el = $el;
		this.admin = admin;
		this.boardInfo = boardInfo;
		this.createWhiteboard();
		this.addWhiteboardSettings();
	}

	Whiteboard.prototype.createWhiteboard = function(){ console.log('[Whiteboard] createWhiteboard');
		this.board = this.$el.append("<div id='whiteboard'></div>");
		this.bindHandler();
	};

	Whiteboard.prototype.bindHandler = function(){ console.log('[Whiteboard] bindHandler');
		this.board.on('click', this.clickHandler.bind(this));
	};

	Whiteboard.prototype.clickHandler = function(event){ console.log('[Whiteboard] clickHandler');
		var xPos = event.pageX - this.$el.offset().left;
   		var yPos = event.pageY - this.$el.offset().top;
   		var position = {};
   		position.xPos = xPos;
   		position.yPos = yPos;
		if(event.target.id === "whiteboard"){
			bean.fire(this, "whiteboard-clicked", position);
		}
	};

	Whiteboard.prototype.addWhiteboardSettings = function(){ console.log('[Whiteboard] addWhiteboardSettings');
		this.whiteboardSettings = new WhiteboardSettings(this.$el, this.admin, this.boardInfo);
	};

	return Whiteboard;

})();
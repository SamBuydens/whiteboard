module.exports = (function(){

	function Whiteboard($el, boardName) { console.log('[Whiteboard] constructor');
		this.$el = $el;
		/*
		if(boardName){
			this.boardName = boardName;
		}else{
			this.boardName = "Nieuw board";
		}
		*/
		this.createWhiteboard();
	}

	Whiteboard.prototype.createWhiteboard = function(){ console.log('[Whiteboard] createWhiteboard');
		this.board = this.$el.append("<article id='whiteboard'></article>");
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
		if(event.target.id === "whiteboard"){ //anders klikt hij "door" elementen
			bean.fire(this, "whiteboard-clicked", position);
		}
	};

	return Whiteboard;

})();
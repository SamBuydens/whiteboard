module.exports = (function(){
	var Whiteboard = require('./Whiteboard');
	var ElementPicker = require('./ElementPicker');
	var Element = require('./Element');
	var DataHandler = require('./DataHandler');


	function App($el, id) { console.log('[App] constructor');
		this.$el = $el;
		this.whiteboardId = id;
		this.types = ['postits'];
		this.i = 0;
		this.elementList = [];
		this.position = {};
		this.dataHandler = new DataHandler();
		this.whiteboard = new Whiteboard(this.$el);
		this.elementPicker = new ElementPicker(this.$el);
		//LUISTEREN
		bean.on(this.dataHandler, "data-success", this.addToElementList.bind(this));
		bean.on(this.whiteboard, "whiteboard-clicked", this.whiteboardClickedHandler.bind(this));
		bean.on(this.elementPicker, "element-picker-clicked", this.elementPickerClickedHandler.bind(this));
		//UITVOEREN
		this.buildBoard();
	}

	App.prototype.whiteboardClickedHandler = function(event){ console.log('[App] whiteboardClickedHandler');
		this.elementPicker.toggleVisible();
		this.elementPicker.setLocation(event.xPos, event.yPos);
		this.position = event;
	};

	App.prototype.elementPickerClickedHandler = function(event){ console.log('[App] elementPickerClickedHandler'); 
		this.elementPicker.toggleVisible();
		var element = new Element(this.$el,event,this.position);
		this.newElement(event, element.elementId);
		bean.on(element, "position-changed", this.positionChangedHandler.bind(this));
	};

	App.prototype.buildBoard = function(){ console.log('[App] buildBoard');
		for(var type in this.types) {
  			this.dataHandler.loadBoardElements(this.types[type],this.whiteboardId);
		}
	};

	App.prototype.addToElementList = function(event){ console.log('[App] addToElementList');
		this.elementList.push(this.dataHandler.getBoardElements());
		this.i++;
		if(this.i === this.types.length){
			this.addToBoard();
		}
	};

	App.prototype.addToBoard = function(){ console.log('[App] addToBoard'); 
		var list = this.elementList[0][0];
		for(var elementItem in list) {
  			var type = list[elementItem].el_type;
  			var position = {};
  			position.yPos = Number(list[elementItem].posy);
  			position.xPos = Number(list[elementItem].posx);
  			var elementId = list[elementItem].id_on_board;
  			var id = list[elementItem].id;
  			var content = list[elementItem].content;
  			var element = new Element(this.$el,type,position,elementId,content,id);
  			bean.on(element, "remove-clicked", this.removeHandler.bind(this));
  			bean.on(element, "position-changed", this.positionChangedHandler.bind(this));
		}
	};

	App.prototype.removeHandler = function(event){ console.log('[App] removeHandler'); 
		this.dataHandler.removeBoardElement(event.elementType, event.id);
	};
	
	App.prototype.newElement = function(type,idOnBoard){ console.log('[App] newElementHandler'); 
				console.log(this.whiteboardId);

		this.dataHandler.newBoardElement(type,idOnBoard,this.position,this.whiteboardId);
	};

	App.prototype.positionChangedHandler = function(event){ console.log('[App] positionChangedHandler');
		this.dataHandler.positionChange(event.elementType,event.elementId,event.eTarget.css('left'),event.eTarget.css('top'),this.whiteboardId);
	};
	return App;

})();
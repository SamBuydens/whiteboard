module.exports = (function(){

	var Whiteboard = require('./Whiteboard');
	var ElementPicker = require('./ElementPicker');
	var Element = require('./Element');
	var DataHandler = require('./DataHandler');

	function App($el) { console.log('[App] constructor');
		this.$el = $el;
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
	};

	App.prototype.buildBoard = function(){ console.log('[App] buildBoard');
		for(var type in this.types) {
  			this.dataHandler.loadBoardElements(this.types[type]);
		}
	};

	App.prototype.addToElementList = function(event){ console.log('[App] addToElementList');
		this.elementList.push(this.dataHandler.getBoardElements());
		this.i++;
		if(this.i == this.types.length){
			this.addToBoard();
		}
	};

	App.prototype.addToBoard = function(){ console.log('[App] addToBoard'); 
		var list = this.elementList[0][0];
		console.log(list);
		for(var element in list) {
  			var type = list[element].el_type;
  			var position = {};
  			position.yPos = Number(list[element].posy);
  			position.xPos = Number(list[element].posx);
  			var elementId = list[element].id_on_board;
  			var id = list[element].id;
  			var content = list[element].content;
  			var element = new Element(this.$el,type,position,elementId,content,id);
  			bean.on(element, "remove-clicked", this.removeHandler.bind(this));
		}
	};

	App.prototype.removeHandler = function(event){ console.log('[App] removeHandler'); 
		this.dataHandler.removeBoardElement(event.elementType, event.id);
	};

	return App;

})();
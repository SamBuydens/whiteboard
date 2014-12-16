module.exports = (function(){

	var Whiteboard = require('./Whiteboard');
	var ElementPicker = require('./ElementPicker');
	var Element = require('./Element');
	var DataHandler = require('./DataHandler');

	function App($el, boardInfo, userId) { console.log('[App] constructor');
		this.dataHandler = new DataHandler();
		this.partRights = []
		if(userId < 0){ userId = "0"}
		this.dataHandler.checkParticipant(boardInfo.loc_id, userId);
		bean.on(this.dataHandler, "participant-check", this.partRightsCheck.bind(this));
		this.$el = $el;
		this.whiteboardId = boardInfo.id;
		this.userId = userId;
		this.admin = Boolean(boardInfo.creator === this.userId);
		this.boardInfo = boardInfo;
		this.types = ['postits', 'statics', 'motion'];
		this.i = 0;
		this.elementList = [];
		this.position = {};
	}

	App.prototype.partRightsCheck = function(partRights){ console.log('[WhiteboardSettings] partRightsCheck');
		this.partRights = partRights
		if(partRights.length > 0){
			this.admin = true;
		}

		this.whiteboard = new Whiteboard(this.$el, this.boardInfo, this.admin, this.userId);
		this.elementPicker = new ElementPicker(this.$el);
		//LUISTEREN
		bean.on(this.dataHandler, "data-success", this.addToElementList.bind(this));
		bean.on(this.whiteboard, "whiteboard-clicked", this.whiteboardClickedHandler.bind(this));
		bean.on(this.elementPicker, "element-picker-clicked", this.elementPickerClickedHandler.bind(this));
		this.$el.find('.close-button').on('click', this.closeProject.bind(this));
		//UITVOEREN
		this.buildBoard();
	};


	App.prototype.closeProject = function(event){ console.log('[WhiteboardSettings] closeProject');
		$("#container").html("");
		var Overview = require('./Overview');
		new Overview($('#container'), this.userId);
	};


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
		bean.on(element, "image-changed", this.imageChangedHandler.bind(this));
		bean.on(element, "video-changed", this.videoChangedHandler.bind(this));
		bean.on(element, "remove-clicked", this.removeHandler.bind(this));
		bean.on(element, "edit-clicked", this.editHandler.bind(this));
	};

	App.prototype.buildBoard = function(){ console.log('[App] buildBoard');
		for(var type in this.types) {
  			this.dataHandler.loadBoardElements(this.types[type],this.whiteboardId);
		}
	};

	App.prototype.addToElementList = function(event){ console.log('[App] addToElementList');
		this.addToBoard(event);
	};

	App.prototype.addToBoard = function(event){ console.log('[App] addToBoard'); 
		var list = event;
		for(var elementItem in list) {
  			var type = list[elementItem].el_type;
  			var position = {};
  			position.yPos = Number(list[elementItem].posy);
  			position.xPos = Number(list[elementItem].posx);
  			var elementId = list[elementItem].id_on_board;
  			var id = list[elementItem].id;
  			var content = list[elementItem].content;
  			var element = new Element(this.$el,type,position,elementId,content, id);
  			if(this.admin === true){
  				bean.on(element, "remove-clicked", this.removeHandler.bind(this));
  				bean.on(element, "edit-clicked", this.editHandler.bind(this));
  				bean.on(element, "position-changed", this.positionChangedHandler.bind(this));
  				bean.on(element, "image-changed", this.imageChangedHandler.bind(this));
  				bean.on(element, "video-changed", this.videoChangedHandler.bind(this));
  			}
		}
	};

	App.prototype.videoChangedHandler = function(event){ console.log('[App] videoChangedHandler');
		this.dataHandler.editContent(event.elementType,event.elementId,event.content,this.whiteboardId);
	};

	App.prototype.imageChangedHandler = function(event){ console.log('[App] imageChangedHandler');
		this.dataHandler.editContent(event.elementType,event.elementId,event.content,this.whiteboardId);
	};

	App.prototype.editHandler = function(event){ console.log('[App] editHandler');
		this.dataHandler.editContent(event.elementType,event.elementId,event.content,this.whiteboardId);
	};

	App.prototype.removeHandler = function(event){ console.log('[App] removeHandler'); 
		this.dataHandler.removeBoardElement(event.elementType, event.elementId, this.whiteboardId);
	};
	
	App.prototype.newElement = function(type,idOnBoard){ console.log('[App] newElementHandler'); 
		this.dataHandler.newBoardElement(type,idOnBoard,this.position,this.whiteboardId);
	};

	App.prototype.positionChangedHandler = function(event){ console.log('[App] positionChangedHandler');
		this.dataHandler.positionChange(event.elementType,event.elementId,event.eTarget.css('left'),event.eTarget.css('top'),this.whiteboardId);
	};
	return App;

})();
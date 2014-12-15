module.exports = (function(){
	var App = require('./App');
	var OverviewElement = require('./OverviewElement');
	var OverviewHandler = require('./OverviewHandler');

	function Overview($el, userId) { console.log('[Overview] constructor');
	this.$el = $el;
	this.user = userId;
	this.overviewHandler = new OverviewHandler();
	if(userId > 0){
		var entryText = $('#overviewBtns-template').text();
		$('#container').append(entryText);
		$el.find(".addBoard").on('click', this.addBoard.bind(this));
		$el.find(".myBoards").on('click', this.myBoards.bind(this));
		$el.find(".allBoards").on('click', this.allBoards.bind(this));
	}

	bean.on(this.overviewHandler, "data-success", this.addToBoardList.bind(this));
	bean.on(this.overviewHandler, "view-whiteboard", this.viewWhiteboard.bind(this));
	this.overviewHandler.getAllBoards();
	}

	Overview.prototype.addToBoardList = function(event) { console.log('[Overview] addToBoardList');
		this.boardList = [];
		$('.overviewThumb').remove();
		this.boardList.push(event);

		for (i = 0; i <  this.boardList[0].length; i++) { 
			this.overviewElement = new OverviewElement(this.boardList[0][i], this.user);
			bean.on(this.overviewElement, "remove-whiteboard", this.removeWhiteboard.bind(this));
			bean.on(this.overviewElement, "view-whiteboard", this.viewWhiteboard.bind(this));
		}
	};

	Overview.prototype.viewWhiteboard = function(event) { console.log('[Overview] viewWhiteboard');
		bean.fire(this, 'leak-boardData', event);
		console.log(event);
		$("#container").html("");
		new App($('#container'), event, this.user);
		bean.fire(this, 'leak-boardData', event);
	};

	Overview.prototype.addBoard = function(event) { console.log('[Overview] addBoard');
	console.log(this.user);
		if(this.user){
			this.overviewHandler.addWhiteboard("Untitled", this.user);
		}
	};

	Overview.prototype.removeWhiteboard = function(event) { console.log('[Overview] removeWhiteboard');
		this.overviewHandler.removeBoard(event);
		this.$el.find('#'+event).remove();
		//ook alle postits verwijderen...
	};

	Overview.prototype.myBoards = function(event){ console.log('[Overview] myBoards');
		this.overviewHandler.getMyBoards(this.user);
		console.log(this.user);
		this.toggleVisible(event);
		this.$el.find('.allBoards').removeClass('selected');
	}

	Overview.prototype.allBoards = function(event){ console.log('[Overview] allBoards');
		this.overviewHandler.getAllBoards();
		this.toggleVisible(event);
		this.$el.find('.myBoards').removeClass('selected');
	}

	Overview.prototype.sendUser = function(user){ console.log('[Overview] sendUser');
		this.user = user.id;
		this.overviewHandler.getAllBoards();

	}

	Overview.prototype.toggleVisible = function(event){
		this.$el.find('.'+event.target.classList[0]).addClass('selected');
	}

	return Overview;

})();
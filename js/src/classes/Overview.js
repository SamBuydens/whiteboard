module.exports = (function(){

	var App = require('./App');
	var OverviewElement = require('./OverviewElement');
	var OverviewHandler = require('./OverviewHandler');

	function Overview($el) { console.log('[Overview] constructor');
	this.$el = $el;
	//this.boardList = [];
	this.overviewHandler = new OverviewHandler();
	this.overviewHandler.getAllBoards();

	bean.on(this.overviewHandler, "data-success", this.addToBoardList.bind(this));
	$el.find("#addProject").on('click', this.newWhiteboard.bind(this));
	bean.on(this.overviewHandler, "view-whiteboard", this.viewWhiteboard.bind(this));

	
	}

	Overview.prototype.addToBoardList = function(event) { console.log('[Overview] getBoards');
		this.boardList = [];
		$('.OverviewThumb').remove();
		console.log(event);
		this.boardList.push(event);
		for (i = 0; i <  this.boardList[0].length; i++) { 
			this.overviewElement = new OverviewElement(this.boardList[0][i]);
			bean.on(this.overviewElement, "remove-whiteboard", this.removeWhiteboard.bind(this));
			bean.on(this.overviewElement, "view-whiteboard", this.viewWhiteboard.bind(this));
		}
	};

	Overview.prototype.viewWhiteboard = function(event) { console.log('[Overview] viewWhiteboard');
		$("#container").html("");
		new App($('#container'), event);

	};

	Overview.prototype.newWhiteboard = function(event) { console.log('[Overview] newWhiteboard');

		//creatorId nog opvragen
		this.overviewHandler.addWhiteboard("Untitled", "1");
		//niet nodig als overview gewist word
		//this.overviewHandler.getAllBoards();
	};

	Overview.prototype.removeWhiteboard = function(event) { console.log('[Overview] removeWhiteboard');
		this.overviewHandler.removeBoard(event);
		this.$el.find('#'+event).remove();
		//ook alle postits verwijderen...
	};

	return Overview;

})();
module.exports = (function(){

	var App = require('./App');
	var OverviewElement = require('./OverviewElement');
	var OverviewHandler = require('./OverviewHandler');

	function Overview($el) { console.log('[Overview] constructor');
	this.$el = $el;
	this.boardList = [];
	this.overviewHandler = new OverviewHandler();
	this.overviewHandler.getAllBoards();

	bean.on(this.overviewHandler, "data-success", this.addToBoardList.bind(this));
	$el.find("#addProject").on('click', this.makeNewProjectHandler.bind(this));
	
	}

	Overview.prototype.addToBoardList = function(event) { console.log('[Overview] getBoards');
		this.boardList.push(event);
		console.log(this.boardList);
		for (i = 0; i <  this.boardList[0].length; i++) { 
			this.overviewElement = new OverviewElement(this.boardList[0][i]);
		}
	};

	Overview.prototype.makeNewProjectHandler = function(event) { console.log('[Overview] makeNewProjectHandler');
		$("#container").html("");
		//new App($('#container'));

		if(this.user){

		}
	};


	return Overview;

})();
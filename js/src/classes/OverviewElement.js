module.exports = (function(){
	var App = require('./App');

	function OverviewElement(board, userId) { console.log('[OverviewElement] constructor');
	this.board = board;
	this.boardId = board.loc_id;
	this.userId = userId;
	this.createOverviewThumb(board);
	}

	OverviewElement.prototype.createOverviewThumb = function(board) { console.log('[OverviewElement] createOverviewThumb');
		var entryText = $('#overviewThumb-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		context.title = board.title;
		context.id = board.loc_id;
		context.creator = board.wb_username;
		context.creation_date = board.creation_date;			
		var html = template(context);
		$('#container').append($(html));
		this.bindHandler(board, $(html)[0]);
		console.log(board);
	};

	OverviewElement.prototype.bindHandler = function(board, el){ console.log('[OverviewElement] bindHandler');
		if(board.creator ==  this.userId){
			$("#"+board.loc_id +" > .remove").removeClass("hidden");
			$("#"+board.loc_id  +" > .remove").on('click', this.removeHandler.bind(this));
		}
		$("#"+board.loc_id  +" > .view").on('click', this.viewHandler.bind(this));
	};

	OverviewElement.prototype.removeHandler = function(event){ console.log('[OverviewElement] removeHandler');
		bean.fire(this, 'remove-whiteboard', this.boardId);
	};

	OverviewElement.prototype.viewHandler = function(event){ console.log('[OverviewElement] viewHandler');
		bean.fire(this, 'view-whiteboard', this.board);
	};

	

	return OverviewElement;

})();
module.exports = (function(){
	var App = require('./App');

	function OverviewElement($el) { console.log('[Overview] constructor');
	this.$el = $el;
	this.boardId = $el.id;
	this.boardList = [];
	this.createOverviewThumb($el);
	}

	OverviewElement.prototype.createOverviewThumb = function(board) { console.log('[Overview] createOverviewThumb');
		var entryText = $('#overviewThumb-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		context.title = board.title;
		context.id = board.id;
		context.creation_date = board.creation_date;			
		var html = template(context);
		$('#container').append($(html));
		this.bindHandler(board.id, $(html)[0]);
	};

	OverviewElement.prototype.bindHandler = function(boardId, el){ console.log('[Overview] bindHandler');
		$("#"+boardId +" > .remove").on('click', this.removeHandler.bind(this));
		$("#"+boardId +" > .view").on('click', this.viewHandler.bind(this));
	};

	OverviewElement.prototype.removeHandler = function(event){ console.log('[Overview] removeHandler');
		bean.fire(this, 'remove-whiteboard', this.boardId);
	};

	OverviewElement.prototype.viewHandler = function(event){ console.log('[Overview] viewHandler');
		bean.fire(this, 'view-whiteboard', this.boardId);
	};

	

	return OverviewElement;

})();
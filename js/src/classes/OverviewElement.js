module.exports = (function(){

	function OverviewElement($el) { console.log('[Overview] constructor');
	this.$el = $el;
	this.boardList = [];
	this.createOverviewThumb($el);
	}

	OverviewElement.prototype.createOverviewThumb = function(board) { console.log('[Overview] createOverviewThumb');
		//console.log(board);
		var entryText = $('#overviewThumb-template').text();
			var template = Handlebars.compile(entryText);
			var context = {};
			context.title = board.title;
			context.id = board.id;
			context.creation_date = board.creation_date;			
			var html = template(context);
			$('#container').append($(html));

			this.bindHandler($(html)[0]);
	};

	OverviewElement.prototype.bindHandler = function(el){ console.log('[Overview] bindHandler');
		el.querySelector(".remove").addEventListener('click', this.removeHandler.bind(this));
		//el.find(".view").on('click', this.viewHandler.bind(this));
	};

	OverviewElement.prototype.removeHandler = function(event){ console.log('[Overview] removeHandler');

	};

	OverviewElement.prototype.viewHandler = function(event){ console.log('[Overview] viewHandler');

	};

	

	return OverviewElement;

})();
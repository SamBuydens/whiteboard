module.exports = (function(){

	var Postit = require('./Postit');

	function PostitCreator($el) { console.log('[PostitCreator] constructor');
		this.$el = $el;
		this.creator();
	}

	PostitCreator.prototype.creator = function(){ console.log('[PostitCreator] creator');
		this.$el.find("#whiteboard").append( "<span id='postit-creator'><textarea id='postit-content' rows='4' cols='50'>textveld</textarea><p id='create'>aanmaken</p><p id='cancel'>annuleren</p></span>" );
		this.bindClickHandlers();
	};

	PostitCreator.prototype.bindClickHandlers = function($postit){ console.log('[PostitCreator] bindClickHandlers');
		this.$el.find("#create").on('click', this.createClickHandler.bind(this));
		this.$el.find("#cancel").on('click', this.cancelClickHandler.bind(this));
	};

	PostitCreator.prototype.createClickHandler = function(event){ console.log('[PostitCreator] createClickHandler');
		event.stopPropagation();
		var postitContent = this.$el.find("#postit-content").val();
		bean.fire(this, "create-postit-clicked", postitContent); 
		this.$el.find("#postit-creator").remove();
	};

	PostitCreator.prototype.cancelClickHandler = function(event){ console.log('[PostitCreator] cancelClickHandler');
		event.stopPropagation();
		this.$el.find("#postit-creator").remove();
	};

	return PostitCreator;

})();
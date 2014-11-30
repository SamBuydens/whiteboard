module.exports = (function(){

	function Postit($el,xPos,yPos) { console.log('[Postit] constructor');
		this.$el = $el;
		this.xPos = xPos;
		this.yPos = yPos;
	}

	Postit.prototype.createPostit = function(text){ console.log('[Postit] createPostit');
		var entryText = $('#postit-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};

		if(text){
			context.text = text;
		}else{
			context.text = "Nieuwe Postit";
		}

		var html = template(context);
		$('#whiteboard').append( $(html) );
		var position = {
			top : this.yPos,
			left : this.xPos
		};
		var id = this.$el.find(".postit").length;
		var $lastPostit = this.$el.find('.postit').last().attr('id', id).css(position);
		this.bindClickHandlers($lastPostit);
	};

		Postit.prototype.bindClickHandlers = function($postit){ console.log('[Postit] bindClickHandlers');
			$postit.find(".edit-button").on('click', this.editClickHandler.bind(this));
			$postit.on('mousedown', this.mousedownHandler.bind(this));
		};

	Postit.prototype.editClickHandler = function(event){ console.log('[Postit] clickHandler');
		event.stopPropagation();
		//bean.fire(this, "element-picker-clicked", event.target.id); 
	};

	Postit.prototype.mousedownHandler = function(event){ console.log('[Postit] mousedownHandler');
		event.stopPropagation();
		//bean.fire(this, "element-picker-clicked", event.target.id); 
	};

	return Postit;

})();
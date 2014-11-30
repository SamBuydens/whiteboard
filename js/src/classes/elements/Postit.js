module.exports = (function(){

	var PostitEdit = require('./PostitEdit');

	function Postit($el,xPos,yPos,txt) { console.log('[Postit] constructor');
		this.$el = $el;
		this.xPos = xPos;
		this.yPos = yPos;
		if(txt){
		this.txt = txt;
		}
	}

	Postit.prototype.createPostit = function(){ console.log('[Postit] createPostit');
		var entryText = $('#postit-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};

		if(this.txt){
			context.txt = this.txt;
		}else{
			context.txt = "Nieuwe Postit";
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
		if(!this.txt){
			this.editPostit(id);
		}
	};

	Postit.prototype.bindClickHandlers = function($postit){ console.log('[Postit] bindClickHandlers');
		$postit.find(".edit-button").on('click', this.editClickHandler.bind(this));
	};

	Postit.prototype.editClickHandler = function(event){ console.log('[Postit] editClickHandler');
		event.stopPropagation();
		var id = $(event.target).parent().attr('id');
		this.editPostit(id);
	};

	Postit.prototype.editPostit = function(id){ console.log('[Postit] editPostit');
		this.$el.find("#"+id+"> p").toggleClass("hidden");
		this.$el.find("#"+id+"> .edit-button").toggleClass("hidden");
		this.postitEdit = new PostitEdit(this.$el, this.$el.find("#"+id+"> p").text(), id);
		//LUISTEREN
		bean.on(this.postitEdit, "apply-clicked", this.applyHandler.bind(this));
	};

	Postit.prototype.applyHandler = function(event){ console.log('[PostitEdit] applyHandler');
		this.$el.find("#"+event.targetId+"> p").toggleClass("hidden").text(event.txt);
		this.$el.find("#"+event.targetId+"> .edit-button").toggleClass("hidden");
	};

	return Postit;

})();
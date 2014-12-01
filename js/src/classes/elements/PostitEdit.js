module.exports = (function(){

	function PostitEdit($el,txt,id) { console.log('[PostitEdit] constructor');
		this.$el = $el;
		var entryText = $('#postit-edit-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		context.txt = txt;

		var html = template(context);
		$('#'+id).append( $(html) );

		this.bindClickHandlers(id);
	}

	PostitEdit.prototype.bindClickHandlers = function(id){ console.log('[PostitEdit] bindClickHandlers');
		this.originalContent = this.$el.find("#"+id+"> p").text();
		this.$el.find("#"+id+" > .apply-button").on('click', this.applyClickHandler.bind(this, id));
		this.$el.find("#"+id+" > .cancel-button").on('click', this.cancelClickHandler.bind(this, id));
		this.$el.find("#"+id+" > .remove-button").on('click', this.removeClickHandler.bind(this, id));
	};

	PostitEdit.prototype.applyClickHandler = function(id){ console.log('[PostitEdit] applyClickHandler');
		var applyData = {};
		applyData.targetId = id;
		applyData.txt = this.$el.find("#"+id+" > .postit-edit").val();
		bean.fire(this, "apply-clicked", applyData);
		this.removeEditElements(id);
	};

	PostitEdit.prototype.cancelClickHandler = function(id){ console.log('[PostitEdit] cancelClickHandler');
		var applyData = {};
		applyData.targetId = id;
		applyData.txt = this.originalContent;
		bean.fire(this, "apply-clicked", applyData); 
		this.removeEditElements(id);
	};

	PostitEdit.prototype.removeClickHandler = function(id){ console.log('[PostitEdit] removeClickHandler');
		bean.fire(this, "remove-clicked", id);
		this.removeEditElements(id);
	};

	PostitEdit.prototype.removeEditElements = function(id){	
		this.$el.find("#"+id+" > .postit-edit").remove();
		this.$el.find("#"+id+" > .apply-button").remove();
		this.$el.find("#"+id+" > .cancel-button").remove();
		this.$el.find("#"+id+" > .remove-button").remove();
	};

	return PostitEdit;

})();
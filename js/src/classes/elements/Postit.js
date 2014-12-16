module.exports = (function(){

	var PostitEdit = require('./PostitEdit');

	function Postit(txt) { console.log('[Postit] constructor');
		this.txt = txt;
		this.changed = true;
		if(!this.txt){
			this.txt = "Nieuwe Postit";
		}
	}

	Postit.prototype.createPostit = function(txt){ console.log('[Postit] createPostit');
		var entryText = $('#postit-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		context.txt = this.txt;
		var html = template(context);
		return ($(html));
	};

	Postit.prototype.edit = function($el,elementId){ console.log('[Postit] edit');
		this.$el = $el;
		this.elementId = elementId;
		this.$el.find("#"+elementId+" > .postit > p").toggleClass("hidden");
		this.$el.find("#"+elementId).append(new PostitEdit(this.txt));
	};

	Postit.prototype.removeEdit = function($el,elementId){ console.log('[Postit] removeEdit');
		this.$el = $el;
		this.elementId = elementId;
		this.$el.find("#"+elementId+" .postit-edit").remove();
	};

	Postit.prototype.confirm = function(){ console.log('[Postit] confirm');
		this.txt = this.$el.find("#"+this.elementId+" .postit-edit").val();
		this.endEdit();
	};

	Postit.prototype.endEdit = function(){ console.log('[Postit] endEdit');
		this.$el.find("#"+this.elementId+" > .postit > p").addClass("hidden").text(this.txt);
		this.$el.find("#"+this.elementId+" > .postit-edit").remove();
		this.$el.find("#"+this.elementId+" > .postit > p").toggleClass("hidden");
	};

	return Postit;

})();
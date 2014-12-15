module.exports = (function(){

	function Tags($el){ console.log('[Tags] constructor');
		this.$el = $el;
		var input = $el.find('.tag-input');
		if(input.val()){
			var entryText = $('#tags-template').text();
			var template = Handlebars.compile(entryText);
	 		var context = { tags: [{}]};
				Handlebars.registerHelper('tag', function() {
				  return new Handlebars.SafeString(
				    "<li>"+input.val()+"<button class='btn deleteTag'>X</button></li>"
				  );
				});
			var html = template(context);
			this.$el.find("#tag-list").append($(html));
			this.bindDeletebutton();
			input.val("");
		}
	}

	Tags.prototype.bindDeletebutton = function(){ console.log('[Tags] bindDeletebutton');
		this.deletebuton = document.querySelectorAll('.deleteTag');
		console.log(this.deletebuton);
		this.deletebuton[this.deletebuton.length-1].addEventListener('click', this.deleteClickHandler.bind(this));
	};

	Tags.prototype.deleteClickHandler = function(event){ console.log("[Participant] deleteClickHandler");
		bean.fire(this, "delete", event.path[1]);
	};

	return Tags;

})();
module.exports = (function(){

	function Participant($el){ console.log('[Participant] constructor');
		this.$el = $el;
		var input = $el.find('.participant-input');
		console.log(input.val())
		if(input.val()){
			var entryText = $('#settings-template').text();
			var template = Handlebars.compile(entryText);
	 		var context = { elements: [{}]};
				Handlebars.registerHelper('picker', function() {
				  return new Handlebars.SafeString(
				    "<li id=''>"+input.val()+"<button class='btn btn-delete'>X</button></li>"
				  );
				});
			
			var html = template(context);
			this.$el.find("#participant-list").append($(html));
			this.bindDeletebutton();
			$('.participant-input').val("");
		}
	}

	Participant.prototype.bindDeletebutton = function(){ console.log('[Participant] bindDeletebutton');
		this.deletebuton = document.querySelectorAll('.btn-delete');
		this.deletebuton[this.deletebuton.length-1].addEventListener('click', this.deleteClickHandler.bind(this));
	};

	Participant.prototype.deleteClickHandler = function(event){ console.log("[Participant] deleteClickHandler");
		bean.fire(this, "delete", event.path[1]);
	};

	return Participant;

})();
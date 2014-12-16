module.exports = (function(){
	var WhiteboardSettingsHandler = require('./WhiteboardSettingsHandler');
	function Participant($el, boardId, participant, admin){ console.log('[Participant] constructor');
		this.$el = $el;
		this.boardId = boardId;
		this.admin	= admin
		this.whiteboardSettingsHandler = new WhiteboardSettingsHandler();
		this.whiteboardSettingsHandler.getParticipantById(participant.user_id);
		bean.on(this.whiteboardSettingsHandler, 'participant', this.createParticipant.bind(this));
	}

	Participant.prototype.createParticipant = function(participant){ console.log('[Participant] createParticipant');
			var entryText = $('#participant-template').text();
			var template = Handlebars.compile(entryText);
		 	var context = { participants: [{}]};
			if(this.admin){
				Handlebars.registerHelper('participant', function() {
				  return new Handlebars.SafeString(
				    "<li>"+participant.wb_username+"<button id='"+participant.id+"'' class='btn deletePart'>X</button></li>"
				  );
				});
			var html = template(context);
			this.$el.find("#participant-list").append($(html));
			this.bindDeletebutton();
		}else{
				Handlebars.registerHelper('participant', function() {
				  return new Handlebars.SafeString(
				    "<li>"+participant.wb_username+"</li>"
				  );
				});
			var html = template(context);
			this.$el.find("#participant-list").append($(html));
		}
	}

	Participant.prototype.bindDeletebutton = function(){ console.log('[Participant] bindDeletebutton');
		this.deletebuton = document.querySelectorAll('.deletePart');
		this.deletebuton[this.deletebuton.length-1].addEventListener('click', this.deleteClickHandler.bind(this));
	};

	Participant.prototype.deleteClickHandler = function(event){ console.log("[Participant] deleteClickHandler");
		bean.fire(this, "delete", event.path[1]);
		console.log(this.boardId+" "+event.target.id);
		this.whiteboardSettingsHandler.deletePartById(this.boardId, event.target.id);
	};

	return Participant;

})();
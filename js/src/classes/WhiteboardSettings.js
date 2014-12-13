module.exports = (function(){
	var Participant = require ('./Participant');


	function WhiteboardSettings($el, $participants, $title) { console.log('[WhiteboardSettings] constructor');
		this.$el = $el;
		this.$participants = $participants;
		this.$title = $title;

		var entryText = $('#settings-template').text();
		var template = Handlebars.compile(entryText);
	 	var context = {};
	 	if(this.$title){
	 		context.title = $title;
	 	}else{
	 		context.title = "Untitled";
	 	}
			
		var html = template(context);
		console.log(html);
		$("#container").append($(html));

		this.bindHandler();
	}

	WhiteboardSettings.prototype.toggleVisible = function(){ console.log('[WhiteboardSettings] toggleVisible');
		this.$el.find('#hide').toggleClass('hidden');
		this.$el.find('#show').toggleClass('hidden');
	};

	WhiteboardSettings.prototype.bindHandler = function(){ console.log('[WhiteboardSettings] bindHandler');
		this.$el.find('.hide-button').on('click', this.hideSettingsHandler.bind(this));
		this.$el.find('.show-button').on('click', this.hideSettingsHandler.bind(this));
		this.$el.find('.add-button').on('click', this.createParticipant.bind(this));
	};
	WhiteboardSettings.prototype.createParticipant = function(event){ console.log('[WhiteboardSettings] addClickedHandler');
		this.participant = new Participant(this.$el);
		bean.on(this.participant, "delete", this.deleteParticipant.bind(this));
	};

	WhiteboardSettings.prototype.hideSettingsHandler = function(event){ console.log('[WhiteboardSettings] hideSettingsHandler');
		this.$el.find('.hide_section').toggleClass('hidden');
		this.$el.find('.show-button').toggleClass('hidden');
	};
	
	WhiteboardSettings.prototype.deleteParticipant = function(participant) { console.log('[WhiteboardSettings] deleteParticipant');
		var el = document.querySelector('#participant-list');
		el.removeChild(participant);
		return;
	};

	return WhiteboardSettings;

})();
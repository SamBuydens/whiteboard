module.exports = (function(){
	var Participant = require ('./Participant');
	var Tag = require('./Tags');

	function WhiteboardSettings($el, admin, boardInfo) { console.log('[WhiteboardSettings] constructor');
		this.$el = $el;
		this.admin = admin;

		if(this.admin){
			var entryText = $('#settings-template').text();
		}
		else{
			var entryText = $('#info-template').text();
		}
			var template = Handlebars.compile(entryText);
		 	var context = {};
	 		context.title = boardInfo.title;
		 	context.creation_date = boardInfo.creation_date;
		 	context.creator = "CREATOR";			
		 	var html = template(context);
			$("#container").append($(html));
			this.bindHandler();
	}

	WhiteboardSettings.prototype.bindHandler = function(){ console.log('[WhiteboardSettings] bindHandler');
		this.$el.find('.hide-button').on('click', this.hideSettingsHandler.bind(this));
		this.$el.find('.show-button').on('click', this.hideSettingsHandler.bind(this));
		this.$el.find('.addParticipant').on('click', this.createParticipant.bind(this));
		this.$el.find('.addTag').on('click', this.createTag.bind(this));
	};

	WhiteboardSettings.prototype.toggleVisible = function(){ console.log('[WhiteboardSettings] toggleVisible');
		this.$el.find('#hide').toggleClass('hidden');
		this.$el.find('#show').toggleClass('hidden');
	};

	WhiteboardSettings.prototype.createParticipant = function(event){ console.log('[WhiteboardSettings] addClickedHandler');
		this.participant = new Participant(this.$el);
		bean.on(this.participant, "delete", this.deleteParticipant.bind(this));
	};

	WhiteboardSettings.prototype.createTag = function(event){ console.log('[WhiteboardSettings] createTag');
		this.tag = new Tag(this.$el);
		bean.on(this.tag, "delete", this.deleteTag.bind(this));
	};

	WhiteboardSettings.prototype.hideSettingsHandler = function(event){ console.log('[WhiteboardSettings] hideSettingsHandler');
		this.$el.find('.hide_section').toggleClass('hidden');
		this.$el.find('.show-button').toggleClass('hidden');
	};
	
	WhiteboardSettings.prototype.deleteParticipant = function(participant) { console.log('[WhiteboardSettings] deleteParticipant');
		var el = document.querySelector('#participant-list');
		el.removeChild(participant);
	};


	WhiteboardSettings.prototype.deleteTag = function(tag) { console.log('[WhiteboardSettings] deleteParticipant');
		var el = document.querySelector('#tag-list');
		el.removeChild(tag);
	};

	return WhiteboardSettings;

})();
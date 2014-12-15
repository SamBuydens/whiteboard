module.exports = (function(){
	var Participant = require ('./Participant');
	var Tags = require('./Tags');
	var WhiteboardSettingsHandler = require('./WhiteboardSettingsHandler');

	function WhiteboardSettings($el, admin, boardInfo) { console.log('[WhiteboardSettings] constructor');
		this.$el = $el;
		this.admin = admin;
		this.boardInfo = boardInfo;
		this.whiteboardSettingsHandler = new WhiteboardSettingsHandler();
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

		this.$el.find(".participant-input").on('keyup', this.searchParticipant.bind(this));
		bean.on(this.whiteboardSettingsHandler, 'participant-found', this.addToPartList.bind(this));
		this.$el.find(".title-input").on('keyup', this.addTitle.bind(this));
	}

	WhiteboardSettings.prototype.addToPartList = function(results){ console.log('[WhiteboardSettings] addToPartList');
	  		this.$el.find("#result-list").empty();
			var result = [];
			var context = {};
			context.names = [];
			for(i = 0; i < results.length; i++){
				context.names.push({name:results[i].wb_username});
			}
			var entryTxt = $('#result-template').text();
			var template = Handlebars.compile(entryTxt);
			console.log('----------------------');
			Handlebars.registerHelper('users', function() {	
				 var name = Handlebars.escapeExpression(this.name)
				  return new Handlebars.SafeString(
				    "<li id=''>"+name+"<button class='btn addResult'>X</button></li>"
				  );
				});
			var html = template(context);
			this.$el.find("#result-list").append($(html));

	}

	WhiteboardSettings.prototype.searchParticipant = function(event){ console.log('[WhiteboardSettings] addTitle');
		this.whiteboardSettingsHandler.searchParticipant(event.target.value);
	}

	WhiteboardSettings.prototype.addTitle = function(event){ console.log('[WhiteboardSettings] addTitle');
		this.whiteboardSettingsHandler.addTitle(this.boardInfo.id, event.target.value);
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
		this.participant = new Participant(this.$el, this.boardInfo.id);
		bean.on(this.participant, "delete", this.deleteParticipant.bind(this));
	};

	WhiteboardSettings.prototype.createTag = function(event){ console.log('[WhiteboardSettings] createTag');
		this.tag = new Tags(this.$el, this.boardInfo.id);
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
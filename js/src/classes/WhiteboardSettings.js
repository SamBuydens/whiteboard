module.exports = (function(){
	var Participant = require ('./Participant');
	var Tags = require('./Tags');
	var WhiteboardSettingsHandler = require('./WhiteboardSettingsHandler');

	function WhiteboardSettings($el, admin, boardInfo,userId) { console.log('[WhiteboardSettings] constructor');
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
		 	context.creator = boardInfo.wb_username;		
		 	var html = template(context);
			$("#container").append($(html));
			this.bindHandler();

		this.$el.find(".participant-input").on('keyup', this.searchParticipant.bind(this));
		bean.on(this.whiteboardSettingsHandler, 'participant-found', this.addToPartList.bind(this));
		this.$el.find(".title-input").on('keyup', this.addTitle.bind(this));
		this.whiteboardSettingsHandler.getParticipants(boardInfo.loc_id);
		bean.on(this.whiteboardSettingsHandler, 'participants', this.createParticipant.bind(this));
	}

	WhiteboardSettings.prototype.addToPartList = function(results){ console.log('[WhiteboardSettings] addToPartList');
	  	this.$el.find("#result-list").empty();
		var result = [];
		var context = {};
		context.names = [];
		for(i = 0; i < results.length; i++){
			context.names.push({name:results[i].wb_username,id:results[i].id,});
		}
		var entryTxt = $('#result-template').text();
		var template = Handlebars.compile(entryTxt);
		console.log('----------------------');
		Handlebars.registerHelper('users', function() {	
			var name = Handlebars.escapeExpression(this.name),
			id = Handlebars.escapeExpression(this.id);		
				return new Handlebars.SafeString(
				 "<li class='partList'>"+name+"<button id="+id+" class='btn addParticipant'>X</button></li>"
				);
			});
		var html = template(context);
		this.$el.find("#result-list").append($(html));
		this.bindParticipant($(html));
	}


	WhiteboardSettings.prototype.bindParticipant = function($el){
		this.addPartBtn = document.querySelectorAll('.addParticipant');
		console.log(this.addPartBtn );
		for(i = 0; i < this.addPartBtn.length; i++ ){
			this.addPartBtn[i].addEventListener('click', this.addInvitation.bind(this));
		}
	};

	WhiteboardSettings.prototype.addInvitation = function(event){ console.log("[Participant] deleteClickHandler");
		var participant = {user_id: event.target.id};
		var part = {0:{user_id: event.target.id}};
		this.whiteboardSettingsHandler.addParticipant(this.boardInfo.loc_id, participant.user_id);
		this.createParticipant(part);
		this.$el.find("#participant-list").append("<li>"+event.path[1].firstChild.data+"<button id='"+event.path[0].id+"'' class='btn deletePart'>X</button></li>");
		this.bindDeletebutton();
	}

	WhiteboardSettings.prototype.bindDeletebutton = function(){ console.log('[Participant] bindDeletebutton');
		this.deletebuton = document.querySelectorAll('.deletePart');
		console.log(this.deletebuton);
				console.log(this.deletebuton.length-1);

		this.deletebuton[this.deletebuton.length-1].addEventListener('click', this.deleteClickHandler.bind(this));
	};

	WhiteboardSettings.prototype.deleteClickHandler = function(event){ console.log("[Participant] deleteClickHandler");
		this.whiteboardSettingsHandler.deletePartById(this.boardId, event.target.id);
		console.log(event.target.id);
		event.path[1].remove();
	};

	WhiteboardSettings.prototype.createParticipant = function(participant){ console.log('[WhiteboardSettings] addClickedHandler');
		
		this.$el.find(".participant-input").val("");
		$(".partList").remove();
		for(i = 0; i < participant.length; i++){
			this.participant = new Participant(this.$el, this.boardInfo.loc_id, participant[i], this.admin);
			bean.on(this.participant, "delete", this.deleteParticipant.bind(this));
		}
	};

	WhiteboardSettings.prototype.searchParticipant = function(event){ console.log('[WhiteboardSettings] addTitle');
		this.whiteboardSettingsHandler.searchParticipant(event.target.value);
	}

	WhiteboardSettings.prototype.addTitle = function(event){ console.log('[WhiteboardSettings] addTitle');
		this.whiteboardSettingsHandler.addTitle(this.boardInfo.loc_id, event.target.value);
	}

	WhiteboardSettings.prototype.bindHandler = function(){ console.log('[WhiteboardSettings] bindHandler');
		this.$el.find('.hide-button').on('click', this.hideSettingsHandler.bind(this));
		this.$el.find('.show-button').on('click', this.hideSettingsHandler.bind(this));
		this.$el.find('.addTag').on('click', this.createTag.bind(this));
	};

	WhiteboardSettings.prototype.toggleVisible = function(){ console.log('[WhiteboardSettings] toggleVisible');
		this.$el.find('#hide').toggleClass('hidden');
		this.$el.find('#show').toggleClass('hidden');
	};

	WhiteboardSettings.prototype.createTag = function(event){ console.log('[WhiteboardSettings] createTag');
		this.tag = new Tags(this.$el, this.boardInfo.loc_id);
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
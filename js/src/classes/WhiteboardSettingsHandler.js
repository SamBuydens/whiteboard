module.exports = (function(){
	function WhiteboardSettingsHandler() { console.log('[WhiteboardSettingsHandler] constructor');
		this.url = "http://localhost/whiteboard_2/api/index.php/";
	}
	WhiteboardSettingsHandler.prototype.addTitle = function(boardId, title){ console.log('[WhiteboardSettingsHandler] addTitle');
		return $.ajax({
		  	type: "POST",
		  	url: this.url+'settings/'+boardId+'/'+title,
		  	data: {content: 'content'},
		  	success: function(data){
		  		console.log("title-added "+[data]);
		  	}.bind(this)
		});
	};

	WhiteboardSettingsHandler.prototype.getParticipants = function(boardId){ console.log('[WhiteboardSettingsHandler] getParticipants');
		return $.ajax({
		  	type: "GET",
		  	url: this.url+'getParticipants/'+boardId,
		  	data: {content: 'content'},
		  	success: function(data){
		  		console.log("participants-found"+[data]);
		  		bean.fire(this, 'participants', [data]);
		  	}.bind(this)
		});
	};

	WhiteboardSettingsHandler.prototype.searchParticipant = function(participant){ console.log('[WhiteboardSettingsHandler] searchParticipant');
		return $.ajax({
		  	type: "POST",
		  	url: this.url+'participant/'+participant,
		  	data: {content: 'content'},
		  	success: function(data){
		  		console.log("found"+[data]);
		  		bean.fire(this, 'participant-found', [data]);
		  	}.bind(this)
		});
	};

	WhiteboardSettingsHandler.prototype.addParticipant = function(boardId, participant){ console.log('[ParticipantHandler] addParticipant');
		return $.ajax({
		  	type: "POST",
		  	url: this.url+'addParticipant/'+boardId+'/'+participant,
		  	data: {content: 'content'},
		  	success: function(data){
		  		console.log([data]);
	  			bean.fire(this, "participant", [data]);
		  	}.bind(this)
		});
	};

	WhiteboardSettingsHandler.prototype.getParticipantById = function(id){console.log('[ParticipantHandler] getParticipantById');
		return $.ajax({
		  	type: "GET",
		  	url: this.url+'getParticipantById/'+id,
		  	data: {content: 'content'},
		  	success: function(data){
		  		console.log("participant "+[data]);
	  			bean.fire(this, "participant", [data]);
		  	}.bind(this)
		});
	};

	WhiteboardSettingsHandler.prototype.deletePartById = function(boardId, id){console.log('[ParticipantHandler] deleteParticipant');
		return $.ajax({
		  	type: "GET",
		  	url: this.url+'deletePartById/'+boardId+'/'+id,
		  	data: {content: 'content'},
		  	success: function(data){
		  		console.log("deleted "+[data]);
		  	}.bind(this)
		});
	};
	WhiteboardSettingsHandler.prototype.addTag = function(boardId, tag){ console.log('[WhiteboardSettingsHandler] searchParticipant');
		return $.ajax({
		  	type: "POST",
		  	url: this.url+'tag/'+boardId+'/'+tag,
		  	data: {content: 'content'},
		  	success: function(data){
		  		console.log('tag-added'+[data]);
		  	}.bind(this)
		});
	};
	return WhiteboardSettingsHandler;
})();
module.exports = (function(){
	function WhiteboardSettingsHandler() { console.log('[WhiteboardSettingsHandler] constructor');
		this.url = "http://localhost:8888/cp3/whiteboard/whiteboard/api/index.php/";
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
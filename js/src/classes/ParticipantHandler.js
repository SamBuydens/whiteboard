module.exports = (function(){
	function ParticipantHandler() { console.log('[ParticipantHandler] constructor');
		this.url = "http://localhost/whiteboard_2/api/index.php/";
	}


	ParticipantHandler.prototype.addParticipant = function(boardId, participant){ console.log('[ParticipantHandler] addParticipant');
		return $.ajax({
		  	type: "POST",
		  	url: this.url+'participant/'+boardId+'/'+participant,
		  	data: {content: 'content'},
		  	success: function(data){
		  		console.log("view-whiteboard "+[data]);
	  			bean.fire(this, "data-success", [data]);
		  	}.bind(this)
		});
	};

	return ParticipantHandler;

})();
module.exports = (function(){
	var that;
	function DataHandler() { console.log('[DataHandler] constructor');
		this.url = "http://localhost:8888/cp3/whiteboard/whiteboard/api/index.php/";
		that = this;
		this.boardList = [];
	}

	DataHandler.prototype.loadBoardElements = function(type,whiteboardId){ console.log('[DataHandler] loadBoardElements');
		return $.ajax({
	  				type: "GET",
	  				url: this.url+type+'/'+String(whiteboardId),
	  				data: {content: 'content'},
	  				success: function(data){
	  					bean.fire(that, "data-success", [data]);
	  				}
				});
	};


	DataHandler.prototype.removeBoardElement = function(elementType,id){ console.log('[DataHandler] removeBoardElement');
		switch(elementType) {
		    case "post-it":
		    	this.removeElementById('postits',id);
		        break;
		    case "static":
		    	this.removeElementById('statics',id);
		        break;
		    case "motion":
		    	this.removeElementById('motion',id);
		        break;
		}
	};

	DataHandler.prototype.removeElementById = function(elementType,id){ 
		$.ajax({
	  		type: "GET",
	  		url: this.url+elementType+'/delete/'+id,
	  		data: {content: 'content'},
	  		success: function(data){
	  			console.log("deleted = "+data);
	  		}
		});
	};


	DataHandler.prototype.newBoardElement = function(elementType,id_on_board,position,whiteboardId){ console.log('[DataHandler] newBoardElement');
		switch(elementType) {
		    case "post-it":
		    	this.newElement('postits',id_on_board, position, whiteboardId);
		        break;
		    case "static":
		    	this.newElement('statics',id_on_board, position, whiteboardId);
		        break;
		    case "motion":
		    	this.newElement('motion',whiteboardId);
		        break;
		}
	};

	DataHandler.prototype.newElement = function(elementType,id_on_board,position,whiteboardId){
		$.ajax({
	  		type: "POST",
	  		url: this.url+elementType+'/add',
	  		data: {id_on_board: id_on_board, xpos: position.xPos, ypos: position.yPos, whiteboardId: whiteboardId},
	  		success: function(data) {
	  			console.log('success:', data);
	  		},
	  		error: function(error) {
	  			console.log('error');
	  			console.log(error);
	  		}
		});
	};

	DataHandler.prototype.positionChange = function(elementType,id_on_board,xpos,ypos,whiteboardId){ console.log('[DataHandler] newBoardElement');
		switch(elementType) {
		    case "post-it":
		    	this.newPosition('postits',id_on_board, xpos, ypos,whiteboardId);
		        break;
		    case "static":
		    	this.newPosition('statics',id_on_board, xpos, ypos,whiteboardId);
		        break;
		    case "motion":
		    	this.newPosition('motion',whiteboardId);
		        break;
		}
	};

	DataHandler.prototype.newPosition = function(elementType,id_on_board,xpos,ypos,whiteboardId){
		$.ajax({
	  		type: "POST",
	  		url: this.url+elementType+'/change/position',
	  		data: {whiteboard_id: whiteboardId,id_on_board: id_on_board, xpos: xpos, ypos: ypos},
	  		success: function(data) {
	  			console.log('success:', data);
	  		},
	  		error: function(error) {
	  			console.log('error');
	  			console.log(error);
	  		}
		});
	};

	DataHandler.prototype.editContent = function(elementType,id_on_board,content,whiteboardId){ console.log('[DataHandler] editContent');
		switch(elementType) {
		    case "post-it":
		    	this.newContent('postits',id_on_board,content,whiteboardId);
		        break;
		    case "static":
		    	this.newContent('statics',id_on_board,content,whiteboardId);
		        break;
		    case "motion":
		    	this.newPosition('motion',whiteboardId);
		        break;
		}
	};

	DataHandler.prototype.newContent = function(elementType,id_on_board,content,whiteboardId){
		$.ajax({
	  		type: "POST",
	  		url: this.url+elementType+'/change/content',
	  		data: {whiteboard_id: whiteboardId,id_on_board: id_on_board, content: content},
	  		success: function(data) {
	  			console.log('success:', data);
	  		},
	  		error: function(error) {
	  			console.log('error');
	  			console.log(error);
	  		}
	  	});
	  };

	DataHandler.prototype.getAllBoards = function(){ console.log('[DataHandler] getAllBoards');
		 $.ajax({
		  	type: "GET",
		  	url: this.url+'/boards/',
		  	data: {content: 'content'},
		  	success: function(data){
		  		this.boardElements.push(data);
		  	}.bind(this)
		});
	};

	return DataHandler;

})();
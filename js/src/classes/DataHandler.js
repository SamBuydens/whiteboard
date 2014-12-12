module.exports = (function(){
	var that;
	function DataHandler() { console.log('[DataHandler] constructor');
		this.url = "http://localhost:8888/cp3/whiteboard/whiteboard/api/index.php/";
		that = this;
		this.boardElements = [];
	}

	DataHandler.prototype.loadBoardElements = function(type,whiteboardId){ console.log('[DataHandler] loadBoardElements');
		return $.ajax({
	  				type: "GET",
	  				url: this.url+type+'/'+String(whiteboardId),
	  				data: {content: 'content'},
	  				success: function(data){
	  					that.boardElements.push(data);
	  					bean.fire(that, "data-success", [data]);
	  				}
				});
	};

	DataHandler.prototype.getBoardElements = function(){ console.log('[DataHandler] getBoardElements');
		return this.boardElements;
	};

	DataHandler.prototype.removeBoardElement = function(elementType,id){ console.log('[DataHandler] removeBoardElement');
		switch(elementType) {
		    case "post-it":
		    	this.removeElementById('postits',id);
		        break;
		    case "static":
		    	this.removeElementById('static',id);
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
		    	this.newElement('static',whiteboardId);
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

	DataHandler.prototype.positionChange = function(elementType,id_on_board,xpos,ypos,whiteboardId){
		$.ajax({
	  		type: "POST",
	  		url: this.url+'postits'+'/change/position',
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

	return DataHandler;

})();
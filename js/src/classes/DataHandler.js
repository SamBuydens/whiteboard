module.exports = (function(){
	var that;
	function DataHandler() { console.log('[DataHandler] constructor');
		this.url = "http://localhost/whiteboard_2/api/index.php/";
		that = this;
		this.boardElements = [];
	}

	DataHandler.prototype.loadBoardElements = function(type){ console.log('[DataHandler] loadBoardElements');
		return $.ajax({
	  				type: "GET",
	  				url: this.url+type+'/1',
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

	DataHandler.prototype.newBoardElement = function(elementType,id_on_board,position,whiteboardId){
		$.ajax({
	  		type: "POST",
	  		url: this.url+"postits"+'/add/'+whiteboardId+"/"+id_on_board+"/"+position.xPos+"/"+position.yPos,
	  		success: function(){
	  			console.log("new element posted");
	  		}
		});
	};

	return DataHandler;

})();
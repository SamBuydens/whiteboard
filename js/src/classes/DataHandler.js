module.exports = (function(){
	var that;
	function DataHandler() { console.log('[DataHandler] constructor');
		this.url = "http://localhost:8888/cp3/whiteboard/whiteboard/api/index.php/";
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
	  					bean.fire(that, "data-success");
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
		        break;
		    case "motion":
		        break;
		}
	};

	DataHandler.prototype.removeElementById = function(elementType,id){
		console.log(this.url+elementType+'/delete/'+id);
		$.ajax({
	  		type: "GET",
	  		url: this.url+elementType+'/delete/'+id,
	  		data: {content: 'content'},
	  		success: function(data){
	  			console.log("deleted = "+data);
	  		}
		});
	};

	return DataHandler;

})();
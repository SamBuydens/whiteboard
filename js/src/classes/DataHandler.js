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

	return DataHandler;

})();
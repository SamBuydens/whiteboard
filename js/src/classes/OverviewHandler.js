module.exports = (function(){
	function OverviewHandler() { console.log('[OverviewHandler] constructor');
		this.url = "http://localhost/whiteboard_2/api/index.php/";
	}
	
	OverviewHandler.prototype.getAllBoards = function(){ console.log('[OverviewHandler] getAllBoards');
		return $.ajax({
		  	type: "GET",
		  	url: this.url+'boards/',
		  	data: {content: 'content'},
		  	success: function(data){
		  		console.log("view-whiteboard "+[data]);
	  			bean.fire(this, "data-success", [data]);
		  	}.bind(this)
		});
	};

	OverviewHandler.prototype.getMyBoards = function(userid){ console.log('[OverviewHandler] getMyBoards');
		return $.ajax({
		  	type: "GET",
		  	url: this.url+'boards/'+userid,
		  	data: {content: 'content'},
		  	success: function(data){
	  			bean.fire(this, "data-success", [data]);
		  	}.bind(this)
		});
	};

	OverviewHandler.prototype.removeBoard = function(id){ console.log('[OverviewHandler] removeBoard');
		$.ajax({
	  		type: "GET",
	  		url: this.url+'boards/'+'delete/'+id,
	  		data: {content: 'content'},
	  		success: function(data){
	  			console.log("deleted = "+data);
	  		}
		});
	};

	OverviewHandler.prototype.addWhiteboard = function(title, creatorId){
		return $.ajax({
	  		type: "POST",
	  		url: this.url+'boards/'+'add/'+title+'/'+creatorId,
		  	data: {content: 'content'},
	  		success: function(data) {
	  			console.log("view-whiteboard "+[data]);
	  			bean.fire(this, "view-whiteboard", [data]);
	  		}.bind(this)
		});
	}


	OverviewHandler.prototype.searchBoard = function(param){
		return $.ajax({
	  		type: "GET",
	  		url: this.url+'search/'+param,
		  	data: {content: 'content'},
	  		success: function(data) {
	  			console.log("search-whiteboard "+[data]);
	  			bean.fire(this, "data-success", [data]);
	  		}.bind(this)
		});
	}


	OverviewHandler.prototype.searchMyBoard = function(param, creator){
		return $.ajax({
	  		type: "GET",
	  		url: this.url+'mySearch/'+param+'/'+creator,
		  	data: {content: 'content'},
	  		success: function(data) {
	  			console.log("search-whiteboard "+[data]);
	  			bean.fire(this, "data-success", [data]);
	  		}.bind(this)
		});
	}

	return OverviewHandler;

})();
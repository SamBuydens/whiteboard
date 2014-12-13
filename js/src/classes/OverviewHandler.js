module.exports = (function(){
	function OverviewHandler() { console.log('[OverviewHandler] constructor');
		this.url = "http://localhost/whiteboard_2/api/index.php/";
	}


	OverviewHandler.prototype.getAllBoards = function(){ console.log('[OverviewHandler] getAllBoards');
		return $.ajax({
		  	type: "GET",
		  	url: this.url+'/boards/',
		  	data: {content: 'content'},
		  	success: function(data){
	  			bean.fire(this, "data-success", [data]);
		  	}.bind(this)
		});
	};

	return OverviewHandler;

})();
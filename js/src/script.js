(function(){
	var Profile = require('./classes/Profile');
	var App = require('./classes/App');
	var Overview = require('./classes/Overview');
	this.user = [];


	function init() {
		this.overview = new Overview($('#container'), this.user);
		this.profile = new Profile($('#profile'));		
		bean.on(this.profile , 'refresh', windowRefresh.bind(this));
		bean.on(this.overview, 'leak-boardData', storeBoardInfo.bind(this));
	}


	function storeBoardInfo(boardInfo){ console.log('[Script] storeBoardInfo');
		this.boardInfo = boardInfo;
	}

	function windowRefresh(user){ console.log('[Script] windowRefresh');
		$("#container").html("");
		if(typeof this.boardInfo !== "undefined"){
			this.app = new App($('#container'), this.boardInfo , user);
		}
		if(typeof user !== "undefined"){
			this.overview = new Overview($('#container'), user.id);
		}else{
			this.overview = new Overview($('#container'));
		}
	}

	init();

})();
(function(){
	var Profile = require('./classes/Profile');
	var App = require('./classes/App');
	var Overview = require('./classes/Overview');


	function init() {
		new App($('#container'));
		//new Profile($('#container'));		
		//new Overview($('#container'));

	}

	init();

})();
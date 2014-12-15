module.exports = (function(){
	function UserHandler() { console.log('[OverviewHandler] constructor');
		this.url = "http://localhost:8888/cp3/whiteboard/whiteboard/api/index.php/";
	}

	UserHandler.prototype.login = function(email, password){ console.log('[UserHandler] login');
		$.ajax({
	  		type: "POST",
	  		data: {content: 'content'},
	  		url: this.url+"users"+'/login/'+email+"/"+password,
	  		success: function(data){
	  			console.log("user found", [data]);
	  			bean.fire(this, "user-found", [data]);
	  		}.bind(this)
		});
	};

	UserHandler.prototype.register = function(username, email, password){ console.log('[UserHandler] register');
			$.ajax({
		  		type: "POST",
		  		data: {content: 'content'},
		  		url: this.url+"users"+"/register/"+username+"/"+email+"/"+password,
		  		success: function(data){
		  			console.log("new user created", [data]);
		  			bean.fire(this, "user-found", [data]);
		  		}.bind(this)
			});
		};
	return UserHandler;

})();
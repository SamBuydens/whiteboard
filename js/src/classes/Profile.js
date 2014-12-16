module.exports = (function(){
	var UserHandler = require('./UserHandler');

	function Profile($el, username, email, password) { console.log('[Profile] constructor');
		this.$el = $el;
		this.user =  [];
		this.userHandler = new UserHandler();
			
		//LOGIN-TEMPLATE
		this.username = username;
		this.email = email;
		var entryText = $('#login-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		var html = template(context);
		$('#profile').append($(html));

		//REGISTER-TEMPLATE
		var entryText = $('#register-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		var html = template(context);
		$('#profile').append($(html));

		this.$el.find("#register-button").on('click', this.register.bind(this));
		$('.register').on("click", this.addUser.bind(this));
		this.$el.find(".login").on('click', this.login.bind(this));
		bean.on(this.userHandler, "user-found", this.bindUser.bind(this));
	}

	Profile.prototype.register = function() { console.log('[Profile] register');
		$("#register").toggleClass('hidden');
	};

	Profile.prototype.addUser = function() { console.log('[Profile] addUser');
		this.username = this.$el.find('.register_name').val();
		this.email = this.$el.find('.register_email').val();
		this.password = this.$el.find('.register_password').val();
		this.password_2 = this.$el.find('.register_password_2').val();

		if(this.password==this.password_2){
			this.userHandler.register(this.username, this.email, this.password);
		}
	};

	Profile.prototype.login = function() { console.log('[Profile] login');
		this.email = this.$el.find('.login_email').val();
		this.password = this.$el.find('.login_password').val();
		this.userHandler.login(this.email, this.password);
	};

	Profile.prototype.logout = function() { console.log('[Profile] logout');
		this.user = [];
		this.toggleVisible();
		$("#register-button").removeClass('hidden');
		$("#logout").remove();
		//huidige situate refreshen.
		bean.fire(this, "refresh", this.user);
	};

	Profile.prototype.bindUser = function(event){ console.log('[Profile] bindUser');
		this.user = [event];
		if(this.user[0]){
			$('input').val("");
			$("#register-button").addClass('hidden');
			$("#register").addClass('hidden');
			this.toggleVisible();
			bean.fire(this, "refresh", this.user);

			//LOGGED-IN-TEMPLATE
			var entryText = $('#logged-in-template').text();
			var template = Handlebars.compile(entryText);
			var context = {};
			context.username = this.user[0].wb_username;
			var html = template(context);
			$('#profile').append($(html));
			$(".logout").on('click', this.logout.bind(this));
		}
	}

	Profile.prototype.toggleVisible = function(){ console.log('[Profile] toggleVisible');
		$("#login").toggleClass('hidden');
	};

	return Profile;

})();
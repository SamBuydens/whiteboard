module.exports = (function(){


	function WhiteboardSettings($el, $participants, $title) { console.log('[WhiteboardSettings] constructor');
		this.$el = $el;
		this.$participants = $participants;
		this.$title = $title;
	
	}

	WhiteboardSettings.prototype.createSettingPanel = function(){ console.log('[WhiteboardSettings] createSettingPanel');
		var entryText = $('#settings-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};			


		if(this.$title){
			context.projectTitle = this.projectTitle;
		}else{
			context.projectTitle = "Untitled";
		}

		context.participants = this.participants;
		var html = template(context)
		$('#whiteboard').append( $(html) );

		this.bindHandler();
		
	};


	WhiteboardSettings.prototype.addClickedHandler = function(event){ console.log('[WhiteboardSettings] addClickedHandler');
		
	};

	WhiteboardSettings.prototype.minimizeHandler = function(event){ console.log('[WhiteboardSettings] minimizeHandler');
		
	};


	WhiteboardSettings.prototype.toggleVisible = function(){ console.log('[WhiteboardSettings] toggleVisible');
		this.$el.find('#hide').toggleClass('hidden');
		this.$el.find('#show').toggleClass('hidden');
	};

	WhiteboardSettings.prototype.bindHandler = function(){ console.log('[WhiteboardSettings] bindHandler');
		this.$el.find('.hide-button').on('click', this.clickHandler.bind(this));
		this.$el.find('.show-button').on('click', this.clickHandler.bind(this));

		console.log(this.$el);
	};

	WhiteboardSettings.prototype.clickHandler = function(event){ console.log('[WhiteboardSettings] clickHandler');
		this.$el.find('.hide_section').toggleClass('hidden');
		this.$el.find('.show-button').toggleClass('hidden');

	};



	return WhiteboardSettings;

})();
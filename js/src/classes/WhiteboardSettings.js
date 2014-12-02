module.exports = (function(){

	var AddContributor = require('./AddContributor');

	function WhiteboardSettings($el, contributors, prjct_title) { console.log('[WhiteboardSettings] constructor');
		this.$el = $el;
		this.contributors = contributors;
		if(prjct_title){
			this.prjct_title = prjct_title;
		}

	}

	WhiteboardSettings.prototype.createSettingPanel = function(){ console.log('[WhiteboardSettings] createSettingPanel');
		var entryText = $('#setting-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};

		if(this.prjct_title){
			context.prjct_title = this.prjct_title;
		}else{
			context.prjct_title = "Untitled";
		}

		context.contributor = this.contributor;

		var html = template(context);
		$('#whiteboard').append( $(html) );
	};

	WhiteboardSettings.prototype.addContributor = function(){console.log('[WhiteboardSettings] addContributor');
		this.addContributor = new AddContributor(this.$el.find('.contributor-form'));
		console.log(this.$el);
		//this.AddContributor.createSettingPanel();
	};

	return WhiteboardSettings;

})();
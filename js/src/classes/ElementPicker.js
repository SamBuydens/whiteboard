module.exports = (function(){


	function ElementPicker($el) { console.log('[ElementPicker] constructor');
		this.$el = $el;
		this.$el.find("#whiteboard").append( "<div id='element-picker'><span id='postit'>post-it</span><span id='image'>image</span><span id='video'>video</span></div>" );
		this.$el.find("#element-picker").addClass("hidden");

		this.bindClickHandlers();
	}

	ElementPicker.prototype.bindClickHandlers = function(){ console.log('[ElementPicker] bindClickHandlers');
		this.$el.find("span").on('click', this.clickHandler.bind(this));
	};

	ElementPicker.prototype.clickHandler = function(event){ console.log('[ElementPicker] clickHandler');
		bean.fire(this, "element-picker-clicked", event.target.id); 
	};

	return ElementPicker;

})();
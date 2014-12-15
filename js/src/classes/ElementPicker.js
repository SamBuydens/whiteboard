module.exports = (function(){

	function ElementPicker($el) { console.log('[ElementPicker] constructor');
		this.$el = $el;
		var entryText = $('#element-picker-template').text();
		var template = Handlebars.compile(entryText);
		var context = {
		  elements: [	
		  			{element: "post-it", name: "post-it"},
		  			{element: "static", name: "image"},
		  			{element: "motion", name: "video"}
  				]
  			};
			Handlebars.registerHelper('picker', function() {
			  var element = Handlebars.escapeExpression(this.element),
			      name = Handlebars.escapeExpression(this.name);

			  return new Handlebars.SafeString(
			    "<li id="+element+">"+name+"</li>"
			  );
			});
		
		var html = template(context);
		this.$el.find("#whiteboard").append( $(html) );
		this.toggleVisible();
		this.bindHandler();
	}

	ElementPicker.prototype.toggleVisible = function(){ console.log('[ElementPicker] toggleVisible');
		this.$el.find('#element-picker').toggleClass("hidden");
	};

	ElementPicker.prototype.setLocation = function(xPos, yPos){ console.log('[ElementPicker] setLocation');
		var position = {
			top : yPos,
			left : xPos
		};
		this.$el.find("#element-picker").css(position);
	};

	ElementPicker.prototype.bindHandler = function(){ console.log('[ElementPicker] bindHandler');
		this.$el.find('#element-picker > ul > li').on('click', this.clickHandler.bind(this));
	};

	ElementPicker.prototype.clickHandler = function(event){ console.log('[ElementPicker] clickHandler');
		bean.fire(this, "element-picker-clicked", event.target.id);
	};

	return ElementPicker;

})();
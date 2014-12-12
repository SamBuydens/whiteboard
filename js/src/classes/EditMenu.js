module.exports = (function(){

	function EditMenu($el,elementId) { console.log('[EditMenu] constructor');
		this.$el = $el;
		this.elementId = elementId;
		var entryText = $('#edit-menu-template').text();
		var template = Handlebars.compile(entryText);
		var context = {
		  actions: [	
		  			{actionId: "cancel", name: "annuleer"},
		  			{actionId: "edit", name: "wijzigen"},
		  			{actionId: "remove", name: "verwijderen"}
  				]
  			};
			Handlebars.registerHelper('editmenu', function() {
			  var actionId = Handlebars.escapeExpression(this.actionId),
			      name = Handlebars.escapeExpression(this.name);

			  return new Handlebars.SafeString(
			    "<li id="+actionId+">"+name+"</li>"
			  );
			});
		
		var html = template(context);
		this.$el.find('#'+this.elementId).append(html);
		this.$el.find('#'+this.elementId+' > p').toggleClass('hidden');
		this.bindHandlers();
		this.toggleVisible();
	}

	EditMenu.prototype.toggleVisible = function(){ console.log('[EditMenu] toggleVisible');
		this.$el.find('#'+this.elementId+' > p').toggleClass('hidden');
		this.$el.find('#'+this.elementId+' .edit-menu').toggleClass('hidden');
	};

	EditMenu.prototype.bindHandlers = function(){ console.log('[EditMenu] bindHandlers');
		this.$el.find('#'+this.elementId+' > p').on('click', this.clickHandler.bind(this));
		this.$el.find('#'+this.elementId+' li').on('click', this.clickHandler.bind(this));
	};

	EditMenu.prototype.clickHandler = function(event){ console.log('[EditMenu] clickHandler');
		if(event.target.className === "editButton"){
			bean.fire(this, "edit-clicked", actionEvent);
			this.toggleVisible();
		}else{
			var actionEvent = {};
   			actionEvent.targetId = event.target.id;
   			actionEvent.elementId = this.elementId;
			bean.fire(this, "action-clicked", actionEvent);
		}

	};

	return EditMenu;

})();
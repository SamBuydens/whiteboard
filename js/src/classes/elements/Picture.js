module.exports = (function(){
	var PictureEdit = require('./PictureEdit');
	var that;
	function Picture(imgSrc) { console.log('[Picture] constructor');
		that = this;
		this.imgSrc = imgSrc;
		if(this.imgSrc){
			this.imgSrc = "";
		}
		if (
			window.File && 
			window.FileReader && 
			window.FileList && 
			window.Blob
		) {
			console.log("Full file support");
		}
	}

	Picture.prototype.createPicture = function(){ console.log('[Picture] creatPicture');
		var entryText = $('#picture-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		if(this.imgSrc){
			context.imgSrc = this.imgSrc;
			var html = template(context); 
			return($(html));
		}
	};
	
	Picture.prototype.edit = function($el,elementId){ console.log('[Picture] edit');
		this.$el = $el;
		this.elementId = elementId;
		var pictureEdit = new PictureEdit(this.$el,this.imgSrc,elementId);
		this.$el.find("#"+elementId).append(pictureEdit);
		this.imgInputs = this.$el.find('#'+elementId+' >.input-picture');
		this.imgInputs.change(function(){
			var file = this.files[0];
			that.createThumb(file);
		});
	};

	Picture.prototype.createThumb = function(file){ console.log('[Picture] createThumb');
			var reader = new FileReader();
			reader.onload = function(file){ console.log('loaded');
				var img = that.$el.find("#"+that.elementId+' >.picture'+' .image-preview');
				img.attr('src', file.target.result);
				that.confirm(file.target.result);
			};
			reader.readAsDataURL(file);

	};

	Picture.prototype.confirm = function(file){ console.log('[Picture] confirm');
		this.imgSrc = this.$el.find("#"+this.elementId+" .input-picture").val();
		bean.fire(this, "image-changed", file);
		this.endEdit();
	};

	Picture.prototype.endEdit = function(){ console.log('[Picture] endEdit');
		this.$el.find("#"+this.elementId+" > .input-picture").remove();
	};

	return Picture;

})();
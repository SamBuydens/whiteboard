module.exports = (function(){
	var MotionEdit = require('./MotionEdit');
	var that;

	function Motion($el,vidSrc) { console.log('[Motion] constructor');
		this.$el = $el;
		this.changed = false;
		that = this;
		if(vidSrc){
			this.vidSrc = vidSrc;
		}
	}

	Motion.prototype.createMotion = function(){ console.log('[Motion] creatMotion');
		var entryText = $('#motion-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		if(this.vidSrc){
			context.vidSrc = 'motion/'+this.vidSrc+'.mp4';
		}else{
			context.vidSrc = "";
		}
		var html = template(context);
		return ($(html));
	};
	
 	Motion.prototype.playSelectedFile = function(file) { console.log('[Motion] playSelectedFile');
		var vid = this.$el.find('#'+this.elementId+' > .motion > video');
        //var type = file.type;
        if(URL){ console.log('URL BESTAAD');
        	var fileURL = URL.createObjectURL(file);
        	vid.attr('src', fileURL);
        	vid.autoPlay = true;
        }
        var reader = new FileReader();
		reader.onload = function(file){ console.log('loaded');
			that.confirm(file.target.result);
		};
		reader.readAsDataURL(file);
	};

	Motion.prototype.edit = function($el,elementId){  console.log('[Motion] edit');
		this.$el = $el;
		this.elementId = elementId;	
		this.$el.find("#"+elementId).append(new MotionEdit(this.vidSrc, elementId));
		this.videoInput = this.$el.find('#'+elementId+' >.motion-edit');
		this.videoInput.change(function(){
			var file = this.files[0];
			that.playSelectedFile(file);
			that.changed = true;
		});
	};

	Motion.prototype.confirm = function(video){ console.log('[Motion] confirm');
		if(this.changed === true){ console.log(this.changed);
			this.vidSrc = this.$el.find("#"+this.elementId+" .motion-edit").val();
			bean.fire(this, "video-changed",  video);
			this.changed = false;
		}
		this.endEdit();
	};

	Motion.prototype.endEdit = function(){ console.log('[Motion] endEdit');
		this.$el.find("#"+this.elementId+" > .motion-edit").remove();
	};

	return Motion;

})();
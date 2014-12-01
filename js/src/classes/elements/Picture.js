module.exports = (function(){

	function Picture($el,xPos,yPos) { console.log('[Picture] constructor');
		this.$el = $el;
		this.xPos = xPos;
		this.yPos = yPos;
	}

	Picture.prototype.createPicture = function(){ console.log('[Picture] creatPicture');
		
	};

	return Picture;

})();
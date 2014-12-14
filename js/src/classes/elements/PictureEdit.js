module.exports = (function(){

	function PictureEdit($el,txt,elementId) { console.log('[PictureEdit] constructor');
		this.$el = $el;
		var entryText = $('#picture-edit-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		context.txt = txt;
		var html = template(context);
		return ($(html));
	}
	
	function initImageInput(elementId){ console.log('[PictureEdit] initImageInput');
		var imgInputs = $('#'+elementId+' > .input-picture')[0];
		imgInputs.addEventListener('change', createThumb);
	}
	
	function createThumb(e){console.log('[PictureEdit] createThumb');
		var elementId = event.target.parentNode.id;
		if (
			this.files && 
			this.files[0] && 
			this.files[0].type.match('image.*')
		) {
			var reader = new FileReader();
			var img = $('#'+elementId+'> .picture > #image-preview')[0];

			reader.onload = function(e){
				img.setAttribute('src', e.target.result);
				img.setAttribute('width', img.width);
				img.setAttribute('height', img.height);
				img.onload = function(){
					if(errors.length === 0){
						img.style.backgroundImage = "url('"+ e.target.result +"')";
						img.style.height = img.width+"px";
						img.style.width = img.height+"px";
					}else{
						errors = [];
					}
				};
			};
			reader.readAsDataURL(this.files[0]);

		}else{
			errors.push("File is not a valid image");
		}
	}

	return PictureEdit;

})();
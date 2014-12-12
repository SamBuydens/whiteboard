module.exports = (function(){
	var errors = [];

	function PictureEdit($el,txt,elementId) { console.log('[PictureEdit] constructor');
		if (
			window.File && 
			window.FileReader && 
			window.FileList && 
			window.Blob
		) {
			console.log("Full file support");
		}

		this.$el = $el;
		var entryText = $('#picture-edit-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		context.txt = txt;

		var html = template(context);
		setTimeout(function(){ initImageInput(elementId);}, 100);
		return ($(html));
	}
	
	function initImageInput(elementId){ console.log('[PictureEdit] initImageInput');
		var imgInputs = document.querySelector('#'+elementId+' > .input-picture');
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
			var img = document.querySelector('#'+elementId+'> .picture > #image-preview');

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
						alert(errors.join("\n"));
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
module.exports = (function(){
	var errors = [];

	function Picture($el,xPos,yPos, imgSrc) { console.log('[Picture] constructor');
		this.$el = $el;
		console.log($el);
		if(imgSrc){
		this.imgSrc = imgSrc;
		};

		if (
			window.File && 
			window.FileReader && 
			window.FileList && 
			window.Blob
		) {
			console.log("Full file support");

		};
	}

	Picture.prototype.createPicture = function(){ console.log('[Picture] creatPicture');
		var entryText = $('#picture-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};

		if(this.txt){
			context.imgSrc = this.imgSrc;
		}else{
			context.imgSrc = "";
		}
		var html = template(context);
		return($(html));

	};

	
	Picture.prototype.initImageInputs= function(){ console.log('[Picture] initImageinputs');
			var imgInputs = this.$el.find('.image-input')[0];
			initImageImput(imgInputs);
	};
	
	function initImageImput(el){
		el.classList.add('image-input-js');

		var fileInput = el.querySelector('input[type=file]');
		fileInput.addEventListener('change', createThumb);
		
		var previewContainer = document.createElement('div');
		previewContainer.classList.add('image-input-preview');

		
		el.insertBefore(previewContainer, fileInput);
	}
	
	function createThumb(e){
		console.log("Input changed");

		if (
			this.files && 
			this.files[0] && 
			this.files[0].type.match('image.*')
		) {
			var reader = new FileReader();
			var previewContainer = this.parentNode.querySelector('.image-input-preview');

			reader.onload = function(e){
				var img = document.createElement('img');

				img.onload = function(){

					/*if (
						previewContainer.parentNode.getAttribute('data-width') && 
						img.width != parseInt(previewContainer.parentNode.getAttribute('data-width'))
					) {
						errors.push("Image should be "+ previewContainer.parentNode.getAttribute('data-width') +" pixels wide");
					}

					if (
						previewContainer.parentNode.getAttribute('data-height') && 
						img.height != parseInt(previewContainer.parentNode.getAttribute('data-height'))
					) {
						errors.push("Image should be "+ previewContainer.parentNode.getAttribute('data-width') +" pixels high");
					}

					if (
						previewContainer.parentNode.getAttribute('data-ratio')
					) {
						var splitRatio = previewContainer.parentNode.getAttribute('data-ratio').split(':');
						if(splitRatio.length > 1){
							var w = parseInt(splitRatio[0]);
							var h = parseInt(splitRatio[1]);
							
							if ((img.width / img.height) !== (w / h)) {
								errors.push("Image ratio should be "+ w +"x"+ h);	
							}	
						}
					}*/

					if(img.width > 300 ){
						newWidth = img.width/img.width*300;
						newHeight = img.height/img.width*300;
					}else{
						newWidth = img.width;
						newHeight = img.height;
					}

					if(errors.length === 0){
						previewContainer.style.backgroundImage = "url('"+ e.target.result +"')";
						previewContainer.style.height = newHeight+"px";
						previewContainer.style.width = newWidth+"px";


						
					}else{
						alert(errors.join("\n"));
						errors = [];
					}
				}
				
				img.setAttribute('src', e.target.result);
				img.setAttribute('width', newWidth);
				img.setAttribute('height', newHeight);
			}


			reader.readAsDataURL(this.files[0]);

		}else{
			errors.push("File is not a valid image");
		}
		
	}
	
	function checkErrors(){
		if(errors.length === 0){
			return false;
		}else{
			return true;
		}
	}

	return Picture;

})();
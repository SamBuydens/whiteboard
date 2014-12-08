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

		if (
			this.files && 
			this.files[0] && 
			this.files[0].type.match('image.*')
		) {
			var reader = new FileReader();
			var previewContainer = this.parentNode.querySelector('.image-input-preview');

			reader.onload = function(e){
				var img = document.createElement('img');

				img.setAttribute('src', e.target.result);
				img.setAttribute('width', img.width);
				img.setAttribute('height', img.height);
				img.onload = function(){

					if(errors.length === 0){
						previewContainer.style.backgroundImage = "url('"+ e.target.result +"')";
						previewContainer.style.height = img.width+"px";
						previewContainer.style.width = img.height+"px";

					}else{
						alert(errors.join("\n"));
						errors = [];
					}
				}
		
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

	Picture.prototype.edit = function($el,elementId){ console.log('[Picture] edit');
	};

	Picture.prototype.confirm = function(){ console.log('[Picture] confirm');
	};

	Picture.prototype.endEdit = function(){ console.log('[Picture] endEdit');
	};

	return Picture;

})();
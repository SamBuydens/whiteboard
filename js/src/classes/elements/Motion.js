module.exports = (function(){

	function Motion($el,xPos,yPos,vidSrc) { console.log('[Motion] constructor');
		this.$el = $el;
		console.log($el);
		if(vidSrc){
		this.vidSrc = vidSrc;
		};

		if (
			window.File && 
			window.FileReader && 
			window.FileList && 
			window.Blob
		) {

		};
	}

	Motion.prototype.createMotion = function(){ console.log('[Motion] creatMotion');
		var entryText = $('#motion-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};

		if(this.txt){
			context.vidSrc = this.vidSrc;
		}else{
			context.vidSrc = "";
		}
		var html = template(context);
		return($(html));

	};

	
	Motion.prototype.initMotionInputs= function(){ console.log('[Motion] initMotionInputs');
			var motionInputs = this.$el.find('.motion-input')[0];
			initMotionInput(motionInputs);
	};
	
	function initMotionInput(el){  console.log('[Motion] initMotionInput');
		el.classList.add('motion-input-js');

		var fileInput = el.querySelector('input[type=file]');
		fileInput.addEventListener('change', createThumb);
		
		var previewContainer = document.createElement('div');
		previewContainer.classList.add('motion-input-preview');

		
		el.insertBefore(previewContainer, fileInput);
	}
	
	function createThumb(e){
		console.log("Input changed");

		if (
			this.files && 
			this.files[0] && 
			this.files[0].type.match('video.*')
		) {
			var reader = new FileReader();
			var previewContainer = this.parentNode.querySelector('.motion-input-preview');

				reader.onload = function(e){
				var vid = document.createElement('video');

				vid.onload = function(){
				console.log(vid);

					if(vid.width > 300 ){
						newWidth = vid.width/img.width*300;
						newHeight = vid.height/img.width*300;
					}else{
						newWidth = vid.width;
						newHeight = vid.height;
					}

					if(errors.length === 0){
						previewContainer.style.src = "'"+ e.target.result +"'";
						//previewContainer.style.height = newHeight;
						//previewContainer.style.width = newWidth;


						
					}else{
						alert(errors.join("\n"));
						errors = [];
					}
				}
				vid.setAttribute('src', e.target.result);
				//vid.setAttribute('width', newHeight);
				//vid.setAttribute('height', newHeight);

			}

			//reader.URL.createObjectURL(this.files[0]);
			reader.readAsDataURL(this.files[0]);
		}else{
			errors.push("File is not a valid video");
		}
		
	}
	
	function checkErrors(){
		if(errors.length === 0){
			return false;
		}else{
			return true;
		}
	}


	return Motion;

})();
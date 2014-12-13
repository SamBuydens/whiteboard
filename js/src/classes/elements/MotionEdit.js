module.exports = (function(){

	function MotionEdit(vidSrc, elementId) { console.log('[MotionEdit] constructor');
		var entryText = $('#motion-edit-template').text();
		var template = Handlebars.compile(entryText);
		var context = {};
		context.vidSrc = vidSrc;

		var html = template(context);
		setTimeout(function(){initMotionInput(elementId);
 		}, 100);
		return ($(html));
	}

	function initMotionInput(elementId){ console.log('[Motion] initMotionInput');
		var fileInput = $('#'+elementId+' > input[type=file]')[0];
	    fileInput.addEventListener('change', playSelectedFile);
	}

 	function playSelectedFile(event) { console.log('[Motion] playSelectedFile');
		var elementId = event.target.parentNode.id;
		var vid = $('#'+elementId+' > .motion > video')[0];
        var file = this.files[0];
        var type = file.type;
        var canPlay = vid.canPlayType(type);
        canPlay = (canPlay === '' ? 'no' : canPlay);
        //var message = 'Can play type "' + type + '": ' + canPlay;
        //var isError = canPlay === 'no';
        if(URL){
	        var fileURL = URL.createObjectURL(file);
	        vid.src = fileURL;
	        vid.autoPlay = true;
       	}
	}
	
	return MotionEdit;

})();



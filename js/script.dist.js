!function e(i,n,t){function o(l,c){if(!n[l]){if(!i[l]){var d="function"==typeof require&&require;if(!c&&d)return d(l,!0);if(r)return r(l,!0);var s=new Error("Cannot find module '"+l+"'");throw s.code="MODULE_NOT_FOUND",s}var a=n[l]={exports:{}};i[l][0].call(a.exports,function(e){var n=i[l][1][e];return o(n?n:e)},a,a.exports,e,i,n,t)}return n[l].exports}for(var r="function"==typeof require&&require,l=0;l<t.length;l++)o(t[l]);return o}({1:[function(e){!function(){function i(){new n($("#container"))}var n=e("./classes/App");i()}()},{"./classes/App":2}],2:[function(e,i){i.exports=function(){function i(e){console.log("[App] constructor"),this.$el=e,this.whiteboard=new n(this.$el),this.whiteboard.createBlanc(),bean.on(this.whiteboard,"whiteboard-clicked",this.whiteboardClickedHandler.bind(this)),bean.on(this.whiteboard.elementPicker,"element-picker-clicked",this.elementPickerClickedHandler.bind(this))}var n=e("./Whiteboard");return i.prototype.whiteboardClickedHandler=function(e){console.log("[App] whiteboardClickedHandler - position: X="+e.xPos+" Y="+e.yPos);var i={top:e.yPos,left:e.xPos};this.$el.find("#element-picker").css(i)},i.prototype.elementPickerClickedHandler=function(e){console.log("[App] elementPickerClickedHandler - id = "+e)},i}()},{"./Whiteboard":4}],3:[function(e,i){i.exports=function(){function e(e){console.log("[ElementPicker] constructor"),this.$el=e,this.$el.find("#whiteboard").append("<div id='element-picker'><span id='postit'>post-it</span><span id='image'>image</span><span id='video'>video</span></div>"),this.$el.find("#element-picker").addClass("hidden"),this.bindClickHandlers()}return e.prototype.bindClickHandlers=function(){console.log("[ElementPicker] bindClickHandlers"),this.$el.find("span").on("click",this.clickHandler.bind(this))},e.prototype.clickHandler=function(e){console.log("[ElementPicker] clickHandler"),bean.fire(this,"element-picker-clicked",e.target.id)},e}()},{}],4:[function(e,i){i.exports=function(){function i(e){console.log("[Whiteboard] constructor"),this.$el=e}var n=e("./ElementPicker");return i.prototype.createBlanc=function(){console.log("[Whiteboard] createsBlanc"),this.$el.append("<div id='whiteboard'></div>"),this.addElementPicker(),this.bindClickHandler()},i.prototype.bindClickHandler=function(){console.log("[Whiteboard] bindClickHandler"),this.$el.find("#whiteboard").on("click",this.clickHandler.bind(this))},i.prototype.clickHandler=function(e){console.log("[Whiteboard] clickHandler");var i=e.pageX-this.$el.offset().left,n=e.pageY-this.$el.offset().top,t={};t.xPos=i,t.yPos=n,this.$el.find("#element-picker").toggleClass("hidden"),bean.fire(this,"whiteboard-clicked",t)},i.prototype.addElementPicker=function(){console.log("[Whiteboard] addElementPicker"),this.elementPicker=new n(this.$el)},i}()},{"./ElementPicker":3}]},{},[1]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvc2NyaXB0LmpzIiwianMvc3JjL2NsYXNzZXMvQXBwLmpzIiwianMvc3JjL2NsYXNzZXMvRWxlbWVudFBpY2tlci5qcyIsImpzL3NyYy9jbGFzc2VzL1doaXRlYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsUUFBQSxHQUFBLEVBQUEsRUFBQSxHQUFBLFFBQUEsR0FBQSxFQUFBLEdBQUEsSUFBQSxFQUFBLEdBQUEsQ0FBQSxJQUFBLEVBQUEsR0FBQSxDQUFBLEdBQUEsR0FBQSxrQkFBQSxVQUFBLE9BQUEsS0FBQSxHQUFBLEVBQUEsTUFBQSxHQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsTUFBQSxHQUFBLEdBQUEsRUFBQSxJQUFBLEdBQUEsR0FBQSxPQUFBLHVCQUFBLEVBQUEsSUFBQSxNQUFBLEdBQUEsS0FBQSxtQkFBQSxFQUFBLEdBQUEsR0FBQSxFQUFBLElBQUEsV0FBQSxHQUFBLEdBQUEsR0FBQSxLQUFBLEVBQUEsUUFBQSxTQUFBLEdBQUEsR0FBQSxHQUFBLEVBQUEsR0FBQSxHQUFBLEVBQUEsT0FBQSxHQUFBLEVBQUEsRUFBQSxJQUFBLEVBQUEsRUFBQSxRQUFBLEVBQUEsRUFBQSxFQUFBLEdBQUEsTUFBQSxHQUFBLEdBQUEsUUFBQSxJQUFBLEdBQUEsR0FBQSxrQkFBQSxVQUFBLFFBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxPQUFBLElBQUEsRUFBQSxFQUFBLEdBQUEsT0FBQSxLQUFBLEdBQUEsU0FBQSxJQ0FBLFdBSUEsUUFBQSxLQUNBLEdBQUEsR0FBQSxFQUFBLGVBSEEsR0FBQSxHQUFBLEVBQUEsZ0JBTUEsK0NDUkEsRUFBQSxRQUFBLFdBSUEsUUFBQSxHQUFBLEdBQUEsUUFBQSxJQUFBLHFCQUNBLEtBQUEsSUFBQSxFQUVBLEtBQUEsV0FBQSxHQUFBLEdBQUEsS0FBQSxLQUNBLEtBQUEsV0FBQSxjQUdBLEtBQUEsR0FBQSxLQUFBLFdBQUEscUJBQUEsS0FBQSx5QkFBQSxLQUFBLE9BQ0EsS0FBQSxHQUFBLEtBQUEsV0FBQSxjQUFBLHlCQUFBLEtBQUEsNEJBQUEsS0FBQSxPQVZBLEdBQUEsR0FBQSxFQUFBLGVBMkJBLE9BYkEsR0FBQSxVQUFBLHlCQUFBLFNBQUEsR0FBQSxRQUFBLElBQUEsZ0RBQUEsRUFBQSxLQUFBLE1BQUEsRUFBQSxLQUNBLElBQUEsSUFDQSxJQUFBLEVBQUEsS0FDQSxLQUFBLEVBQUEsS0FHQSxNQUFBLElBQUEsS0FBQSxtQkFBQSxJQUFBLElBR0EsRUFBQSxVQUFBLDRCQUFBLFNBQUEsR0FBQSxRQUFBLElBQUEsNENBQUEsSUFJQSwyQ0M3QkEsRUFBQSxRQUFBLFdBR0EsUUFBQSxHQUFBLEdBQUEsUUFBQSxJQUFBLCtCQUNBLEtBQUEsSUFBQSxFQUNBLEtBQUEsSUFBQSxLQUFBLGVBQUEsT0FBQSw2SEFDQSxLQUFBLElBQUEsS0FBQSxtQkFBQSxTQUFBLFVBRUEsS0FBQSxvQkFXQSxNQVJBLEdBQUEsVUFBQSxrQkFBQSxXQUFBLFFBQUEsSUFBQSxxQ0FDQSxLQUFBLElBQUEsS0FBQSxRQUFBLEdBQUEsUUFBQSxLQUFBLGFBQUEsS0FBQSxRQUdBLEVBQUEsVUFBQSxhQUFBLFNBQUEsR0FBQSxRQUFBLElBQUEsZ0NBQ0EsS0FBQSxLQUFBLEtBQUEseUJBQUEsRUFBQSxPQUFBLEtBR0EsMkJDbkJBLEVBQUEsUUFBQSxXQUtBLFFBQUEsR0FBQSxHQUFBLFFBQUEsSUFBQSw0QkFDQSxLQUFBLElBQUEsRUFIQSxHQUFBLEdBQUEsRUFBQSxrQkErQkEsT0F6QkEsR0FBQSxVQUFBLFlBQUEsV0FBQSxRQUFBLElBQUEsNkJBQ0EsS0FBQSxJQUFBLE9BQUEsK0JBQ0EsS0FBQSxtQkFDQSxLQUFBLG9CQUdBLEVBQUEsVUFBQSxpQkFBQSxXQUFBLFFBQUEsSUFBQSxpQ0FDQSxLQUFBLElBQUEsS0FBQSxlQUFBLEdBQUEsUUFBQSxLQUFBLGFBQUEsS0FBQSxRQUdBLEVBQUEsVUFBQSxhQUFBLFNBQUEsR0FBQSxRQUFBLElBQUEsNEJBQ0EsSUFBQSxHQUFBLEVBQUEsTUFBQSxLQUFBLElBQUEsU0FBQSxLQUNBLEVBQUEsRUFBQSxNQUFBLEtBQUEsSUFBQSxTQUFBLElBQ0EsSUFDQSxHQUFBLEtBQUEsRUFDQSxFQUFBLEtBQUEsRUFFQSxLQUFBLElBQUEsS0FBQSxtQkFBQSxZQUFBLFVBQ0EsS0FBQSxLQUFBLEtBQUEscUJBQUEsSUFHQSxFQUFBLFVBQUEsaUJBQUEsV0FBQSxRQUFBLElBQUEsaUNBQ0EsS0FBQSxjQUFBLEdBQUEsR0FBQSxLQUFBLE1BR0EiLCJmaWxlIjoic2NyaXB0LmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpe1xuXG5cdHZhciBBcHAgPSByZXF1aXJlKCcuL2NsYXNzZXMvQXBwJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpwqB7XG5cdFx0bmV3IEFwcCgkKCcjY29udGFpbmVyJykpO1xuXHR9XG5cblx0aW5pdCgpO1xuXG59KSgpOyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XG5cblx0dmFyIFdoaXRlYm9hcmQgPSByZXF1aXJlKCcuL1doaXRlYm9hcmQnKTtcblxuXHRmdW5jdGlvbiBBcHAoJGVsKSB7IGNvbnNvbGUubG9nKCdbQXBwXSBjb25zdHJ1Y3RvcicpO1xuXHRcdHRoaXMuJGVsID0gJGVsO1xuXG5cdFx0dGhpcy53aGl0ZWJvYXJkID0gbmV3IFdoaXRlYm9hcmQoIHRoaXMuJGVsICk7XG5cdFx0dGhpcy53aGl0ZWJvYXJkLmNyZWF0ZUJsYW5jKCk7XG5cblx0XHQvL0xVSVNURVJFTlxuXHRcdGJlYW4ub24odGhpcy53aGl0ZWJvYXJkLCBcIndoaXRlYm9hcmQtY2xpY2tlZFwiLCB0aGlzLndoaXRlYm9hcmRDbGlja2VkSGFuZGxlci5iaW5kKHRoaXMpKTtcblx0XHRiZWFuLm9uKHRoaXMud2hpdGVib2FyZC5lbGVtZW50UGlja2VyLCBcImVsZW1lbnQtcGlja2VyLWNsaWNrZWRcIiwgdGhpcy5lbGVtZW50UGlja2VyQ2xpY2tlZEhhbmRsZXIuYmluZCh0aGlzKSk7XG5cblx0fVxuXG5cdEFwcC5wcm90b3R5cGUud2hpdGVib2FyZENsaWNrZWRIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHsgY29uc29sZS5sb2coJ1tBcHBdIHdoaXRlYm9hcmRDbGlja2VkSGFuZGxlciAtIHBvc2l0aW9uOiBYPScgKyBldmVudC54UG9zICtcIiBZPVwiK2V2ZW50LnlQb3MgKTtcblx0XHR2YXIgcG9zaXRpb24gPSB7XG5cdFx0XHR0b3AgOiBldmVudC55UG9zLFxuXHRcdFx0bGVmdCA6IGV2ZW50LnhQb3Ncblx0XHR9XG5cblx0XHR0aGlzLiRlbC5maW5kKFwiI2VsZW1lbnQtcGlja2VyXCIpLmNzcyhwb3NpdGlvbik7XG5cdH07XG5cblx0QXBwLnByb3RvdHlwZS5lbGVtZW50UGlja2VyQ2xpY2tlZEhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkgeyBjb25zb2xlLmxvZygnW0FwcF0gZWxlbWVudFBpY2tlckNsaWNrZWRIYW5kbGVyIC0gaWQgPSAnICsgZXZlbnQgKTtcblx0XHRcblx0fTtcblxuXHRyZXR1cm4gQXBwO1xuXG59KSgpOyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XG5cblxuXHRmdW5jdGlvbiBFbGVtZW50UGlja2VyKCRlbCkgeyBjb25zb2xlLmxvZygnW0VsZW1lbnRQaWNrZXJdIGNvbnN0cnVjdG9yJyk7XG5cdFx0dGhpcy4kZWwgPSAkZWw7XG5cdFx0dGhpcy4kZWwuZmluZChcIiN3aGl0ZWJvYXJkXCIpLmFwcGVuZCggXCI8ZGl2IGlkPSdlbGVtZW50LXBpY2tlcic+PHNwYW4gaWQ9J3Bvc3RpdCc+cG9zdC1pdDwvc3Bhbj48c3BhbiBpZD0naW1hZ2UnPmltYWdlPC9zcGFuPjxzcGFuIGlkPSd2aWRlbyc+dmlkZW88L3NwYW4+PC9kaXY+XCIgKTtcblx0XHR0aGlzLiRlbC5maW5kKFwiI2VsZW1lbnQtcGlja2VyXCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuXG5cdFx0dGhpcy5iaW5kQ2xpY2tIYW5kbGVycygpO1xuXHR9XG5cblx0RWxlbWVudFBpY2tlci5wcm90b3R5cGUuYmluZENsaWNrSGFuZGxlcnMgPSBmdW5jdGlvbigpeyBjb25zb2xlLmxvZygnW0VsZW1lbnRQaWNrZXJdIGJpbmRDbGlja0hhbmRsZXJzJyk7XG5cdFx0dGhpcy4kZWwuZmluZChcInNwYW5cIikub24oJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cdH07XG5cblx0RWxlbWVudFBpY2tlci5wcm90b3R5cGUuY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpeyBjb25zb2xlLmxvZygnW0VsZW1lbnRQaWNrZXJdIGNsaWNrSGFuZGxlcicpO1xuXHRcdGJlYW4uZmlyZSh0aGlzLCBcImVsZW1lbnQtcGlja2VyLWNsaWNrZWRcIiwgZXZlbnQudGFyZ2V0LmlkKTsgXG5cdH07XG5cblx0cmV0dXJuIEVsZW1lbnRQaWNrZXI7XG5cbn0pKCk7IiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKXtcblxuXHQvL1RPRE86IElOU1RFTExJTkdFTiBLQURFUiBUT0VWT0VHRU4gVklBIEhBTkRMRUJBUlNcblx0dmFyIEVsZW1lbnRQaWNrZXIgPSByZXF1aXJlKCcuL0VsZW1lbnRQaWNrZXInKTtcblx0XG5cdGZ1bmN0aW9uIFdoaXRlYm9hcmQoJGVsKSB7IGNvbnNvbGUubG9nKCdbV2hpdGVib2FyZF0gY29uc3RydWN0b3InKTtcblx0XHR0aGlzLiRlbCA9ICRlbDtcblx0fVxuXG5cdFdoaXRlYm9hcmQucHJvdG90eXBlLmNyZWF0ZUJsYW5jID0gZnVuY3Rpb24oKXsgY29uc29sZS5sb2coJ1tXaGl0ZWJvYXJkXSBjcmVhdGVzQmxhbmMnKTtcblx0XHR0aGlzLiRlbC5hcHBlbmQoIFwiPGRpdiBpZD0nd2hpdGVib2FyZCc+PC9kaXY+XCIgKTtcblx0XHR0aGlzLmFkZEVsZW1lbnRQaWNrZXIoKTtcblx0XHR0aGlzLmJpbmRDbGlja0hhbmRsZXIoKTtcblx0fTtcblxuXHRXaGl0ZWJvYXJkLnByb3RvdHlwZS5iaW5kQ2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oKXsgY29uc29sZS5sb2coJ1tXaGl0ZWJvYXJkXSBiaW5kQ2xpY2tIYW5kbGVyJyk7XG5cdFx0dGhpcy4kZWwuZmluZChcIiN3aGl0ZWJvYXJkXCIpLm9uKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuXHR9O1xuXG5cdFdoaXRlYm9hcmQucHJvdG90eXBlLmNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KXsgY29uc29sZS5sb2coJ1tXaGl0ZWJvYXJkXSBjbGlja0hhbmRsZXInKTtcbiAgIFx0XHR2YXIgeFBvcyA9IGV2ZW50LnBhZ2VYIC0gdGhpcy4kZWwub2Zmc2V0KCkubGVmdDtcbiAgIFx0XHR2YXIgeVBvcyA9IGV2ZW50LnBhZ2VZIC0gdGhpcy4kZWwub2Zmc2V0KCkudG9wO1xuICAgXHRcdHZhciBwb3NpdGlvbiA9IHt9O1xuICAgXHRcdHBvc2l0aW9uLnhQb3MgPSB4UG9zO1xuICAgXHRcdHBvc2l0aW9uLnlQb3MgPSB5UG9zO1xuXHRcdFxuXHRcdHRoaXMuJGVsLmZpbmQoXCIjZWxlbWVudC1waWNrZXJcIikudG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIik7XG5cdFx0YmVhbi5maXJlKHRoaXMsIFwid2hpdGVib2FyZC1jbGlja2VkXCIsIHBvc2l0aW9uKTsgXG5cdH07XG5cblx0V2hpdGVib2FyZC5wcm90b3R5cGUuYWRkRWxlbWVudFBpY2tlciA9IGZ1bmN0aW9uKCl7IGNvbnNvbGUubG9nKCdbV2hpdGVib2FyZF0gYWRkRWxlbWVudFBpY2tlcicpO1xuXHRcdHRoaXMuZWxlbWVudFBpY2tlciA9IG5ldyBFbGVtZW50UGlja2VyKCB0aGlzLiRlbCApO1xuXHR9O1xuXG5cdHJldHVybiBXaGl0ZWJvYXJkO1xuXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
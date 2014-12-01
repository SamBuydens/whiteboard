!function e(t,i,n){function o(r,s){if(!i[r]){if(!t[r]){var c="function"==typeof require&&require;if(!s&&c)return c(r,!0);if(l)return l(r,!0);var a=new Error("Cannot find module '"+r+"'");throw a.code="MODULE_NOT_FOUND",a}var d=i[r]={exports:{}};t[r][0].call(d.exports,function(e){var i=t[r][1][e];return o(i?i:e)},d,d.exports,e,t,i,n)}return i[r].exports}for(var l="function"==typeof require&&require,r=0;r<n.length;r++)o(n[r]);return o}({1:[function(e){!function(){function t(){new i($("#container"))}var i=e("./classes/App");t()}()},{"./classes/App":2}],2:[function(e,t){t.exports=function(){function t(e){console.log("[App] constructor"),this.$el=e,this.position={},this.whiteboard=new i(this.$el),this.elementPicker=new n(this.$el),bean.on(this.whiteboard,"whiteboard-clicked",this.whiteboardClickedHandler.bind(this)),bean.on(this.elementPicker,"element-picker-clicked",this.elementPickerClickedHandler.bind(this))}var i=e("./Whiteboard"),n=e("./ElementPicker"),o=e("./Element");return t.prototype.whiteboardClickedHandler=function(e){console.log("[App] whiteboardClickedHandler"),this.elementPicker.toggleVisible(),this.elementPicker.setLocation(e.xPos,e.yPos),this.position=e},t.prototype.elementPickerClickedHandler=function(e){console.log("[App] elementPickerClickedHandler"),this.elementPicker.toggleVisible();new o(this.$el,e,this.position)},t}()},{"./Element":3,"./ElementPicker":4,"./Whiteboard":5}],3:[function(e,t){t.exports=function(){function t(e,t,i,n){console.log("[Element] constructor"),this.$el=e,this.elementId=n,this.elementId=this.elementId?n:this.$el.find(".element-holder").length+1,this.elementType=t,this.position=i,this.createElementHolder()}var i=e("./elements/Postit");return t.prototype.createElementHolder=function(){console.log("[Element] createElementHolder"),this.$el.find("#whiteboard").append("<section class='element-holder'></section>"),this.$el.find(".element-holder:last-of-type").attr("id",this.elementId);var e={top:this.position.yPos,left:this.position.xPos};this.$el.find("#"+this.elementId).css(e),this.createElement()},t.prototype.createElement=function(){switch(console.log("[Element] createElement"),this.elementType){case"post-it":this.element=new i,this.$el.find("#"+this.elementId).append(this.element.createPostit);break;case"static":break;case"motion":}},t}()},{"./elements/Postit":6}],4:[function(e,t){t.exports=function(){function e(e){console.log("[ElementPicker] constructor"),this.$el=e;var t=$("#element-picker-template").text(),i=Handlebars.compile(t),n={elements:[{element:"post-it",name:"post-it"},{element:"static",name:"image"},{element:"motion",name:"video"}]};Handlebars.registerHelper("picker",function(){var e=Handlebars.escapeExpression(this.element),t=Handlebars.escapeExpression(this.name);return new Handlebars.SafeString("<li id="+e+">"+t+"</li>")});var o=i(n);this.$el.find("#whiteboard").append($(o)),this.toggleVisible(),this.bindHandler()}return e.prototype.toggleVisible=function(){console.log("[ElementPicker] toggleVisible"),this.$el.find("#element-picker").toggleClass("hidden")},e.prototype.setLocation=function(e,t){console.log("[ElementPicker] setLocation");var i={top:t,left:e};this.$el.find("#element-picker").css(i)},e.prototype.bindHandler=function(){console.log("[ElementPicker] bindHandler"),this.$el.find("#element-picker > ul > li").on("click",this.clickHandler.bind(this))},e.prototype.clickHandler=function(e){console.log("[ElementPicker] clickHandler"),bean.fire(this,"element-picker-clicked",e.target.id)},e}()},{}],5:[function(e,t){t.exports=function(){function e(e){console.log("[Whiteboard] constructor"),this.$el=e,this.createWhiteboard()}return e.prototype.createWhiteboard=function(){console.log("[Whiteboard] createWhiteboard"),this.board=this.$el.append("<article id='whiteboard'></article>"),this.bindHandler()},e.prototype.bindHandler=function(){console.log("[Whiteboard] bindHandler"),this.board.on("click",this.clickHandler.bind(this))},e.prototype.clickHandler=function(e){console.log("[Whiteboard] clickHandler");var t=e.pageX-this.$el.offset().left,i=e.pageY-this.$el.offset().top,n={};n.xPos=t,n.yPos=i,"whiteboard"===e.target.id&&bean.fire(this,"whiteboard-clicked",n)},e}()},{}],6:[function(e,t){t.exports=function(){function e(e){console.log("[Postit] constructor"),e&&(this.txt=e)}return e.prototype.createPostit=function(){console.log("[Postit] createPostit");var e=$("#postit-template").text(),t=Handlebars.compile(e),i={};i.txt=this.txt?this.txt:"Nieuwe Postit";var n=t(i);return $(n)},e}()},{}]},{},[1]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvc2NyaXB0LmpzIiwianMvc3JjL2NsYXNzZXMvQXBwLmpzIiwianMvc3JjL2NsYXNzZXMvRWxlbWVudC5qcyIsImpzL3NyYy9jbGFzc2VzL0VsZW1lbnRQaWNrZXIuanMiLCJqcy9zcmMvY2xhc3Nlcy9XaGl0ZWJvYXJkLmpzIiwianMvc3JjL2NsYXNzZXMvZWxlbWVudHMvUG9zdGl0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFFBQUEsR0FBQSxFQUFBLEVBQUEsR0FBQSxRQUFBLEdBQUEsRUFBQSxHQUFBLElBQUEsRUFBQSxHQUFBLENBQUEsSUFBQSxFQUFBLEdBQUEsQ0FBQSxHQUFBLEdBQUEsa0JBQUEsVUFBQSxPQUFBLEtBQUEsR0FBQSxFQUFBLE1BQUEsR0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsR0FBQSxHQUFBLEVBQUEsSUFBQSxHQUFBLEdBQUEsT0FBQSx1QkFBQSxFQUFBLElBQUEsTUFBQSxHQUFBLEtBQUEsbUJBQUEsRUFBQSxHQUFBLEdBQUEsRUFBQSxJQUFBLFdBQUEsR0FBQSxHQUFBLEdBQUEsS0FBQSxFQUFBLFFBQUEsU0FBQSxHQUFBLEdBQUEsR0FBQSxFQUFBLEdBQUEsR0FBQSxFQUFBLE9BQUEsR0FBQSxFQUFBLEVBQUEsSUFBQSxFQUFBLEVBQUEsUUFBQSxFQUFBLEVBQUEsRUFBQSxHQUFBLE1BQUEsR0FBQSxHQUFBLFFBQUEsSUFBQSxHQUFBLEdBQUEsa0JBQUEsVUFBQSxRQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsT0FBQSxJQUFBLEVBQUEsRUFBQSxHQUFBLE9BQUEsS0FBQSxHQUFBLFNBQUEsSUNBQSxXQUlBLFFBQUEsS0FDQSxHQUFBLEdBQUEsRUFBQSxlQUhBLEdBQUEsR0FBQSxFQUFBLGdCQU1BLCtDQ1JBLEVBQUEsUUFBQSxXQU1BLFFBQUEsR0FBQSxHQUFBLFFBQUEsSUFBQSxxQkFDQSxLQUFBLElBQUEsRUFDQSxLQUFBLFlBQ0EsS0FBQSxXQUFBLEdBQUEsR0FBQSxLQUFBLEtBQ0EsS0FBQSxjQUFBLEdBQUEsR0FBQSxLQUFBLEtBRUEsS0FBQSxHQUFBLEtBQUEsV0FBQSxxQkFBQSxLQUFBLHlCQUFBLEtBQUEsT0FDQSxLQUFBLEdBQUEsS0FBQSxjQUFBLHlCQUFBLEtBQUEsNEJBQUEsS0FBQSxPQVhBLEdBQUEsR0FBQSxFQUFBLGdCQUNBLEVBQUEsRUFBQSxtQkFDQSxFQUFBLEVBQUEsWUF3QkEsT0FaQSxHQUFBLFVBQUEseUJBQUEsU0FBQSxHQUFBLFFBQUEsSUFBQSxrQ0FDQSxLQUFBLGNBQUEsZ0JBQ0EsS0FBQSxjQUFBLFlBQUEsRUFBQSxLQUFBLEVBQUEsTUFDQSxLQUFBLFNBQUEsR0FHQSxFQUFBLFVBQUEsNEJBQUEsU0FBQSxHQUFBLFFBQUEsSUFBQSxxQ0FDQSxLQUFBLGNBQUEsZUFFQSxJQUFBLEdBQUEsS0FBQSxJQUFBLEVBQUEsS0FBQSxXQUdBLDZFQzVCQSxFQUFBLFFBQUEsV0FLQSxRQUFBLEdBQUEsRUFBQSxFQUFBLEVBQUEsR0FBQSxRQUFBLElBQUEseUJBQ0EsS0FBQSxJQUFBLEVBRUEsS0FBQSxVQUFBLEVBRUEsS0FBQSxVQURBLEtBQUEsVUFDQSxFQUVBLEtBQUEsSUFBQSxLQUFBLG1CQUFBLE9BQUEsRUFHQSxLQUFBLFlBQUEsRUFDQSxLQUFBLFNBQUEsRUFDQSxLQUFBLHNCQWRBLEdBQUEsR0FBQSxFQUFBLG9CQTJDQSxPQTFCQSxHQUFBLFVBQUEsb0JBQUEsV0FBQSxRQUFBLElBQUEsaUNBQ0EsS0FBQSxJQUFBLEtBQUEsZUFBQSxPQUFBLDhDQUNBLEtBQUEsSUFBQSxLQUFBLGdDQUFBLEtBQUEsS0FBQSxLQUFBLFVBQ0EsSUFBQSxJQUNBLElBQUEsS0FBQSxTQUFBLEtBQ0EsS0FBQSxLQUFBLFNBQUEsS0FFQSxNQUFBLElBQUEsS0FBQSxJQUFBLEtBQUEsV0FBQSxJQUFBLEdBQ0EsS0FBQSxpQkFHQSxFQUFBLFVBQUEsY0FBQSxXQUNBLE9BREEsUUFBQSxJQUFBLDJCQUNBLEtBQUEsYUFDQSxJQUFBLFVBQ0EsS0FBQSxRQUFBLEdBQUEsR0FDQSxLQUFBLElBQUEsS0FBQSxJQUFBLEtBQUEsV0FBQSxPQUFBLEtBQUEsUUFBQSxhQUNBLE1BQ0EsS0FBQSxTQUVBLEtBQ0EsS0FBQSxZQU1BLGdEQzlDQSxFQUFBLFFBQUEsV0FHQSxRQUFBLEdBQUEsR0FBQSxRQUFBLElBQUEsK0JBQ0EsS0FBQSxJQUFBLENBQ0EsSUFBQSxHQUFBLEVBQUEsNEJBQUEsT0FDQSxFQUFBLFdBQUEsUUFBQSxHQUNBLEdBQ0EsV0FDQSxRQUFBLFVBQUEsS0FBQSxZQUNBLFFBQUEsU0FBQSxLQUFBLFVBQ0EsUUFBQSxTQUFBLEtBQUEsVUFHQSxZQUFBLGVBQUEsU0FBQSxXQUNBLEdBQUEsR0FBQSxXQUFBLGlCQUFBLEtBQUEsU0FDQSxFQUFBLFdBQUEsaUJBQUEsS0FBQSxLQUVBLE9BQUEsSUFBQSxZQUFBLFdBQ0EsVUFBQSxFQUFBLElBQUEsRUFBQSxVQUlBLElBQUEsR0FBQSxFQUFBLEVBQ0EsTUFBQSxJQUFBLEtBQUEsZUFBQSxPQUFBLEVBQUEsSUFDQSxLQUFBLGdCQUNBLEtBQUEsY0F1QkEsTUFwQkEsR0FBQSxVQUFBLGNBQUEsV0FBQSxRQUFBLElBQUEsaUNBQ0EsS0FBQSxJQUFBLEtBQUEsbUJBQUEsWUFBQSxXQUdBLEVBQUEsVUFBQSxZQUFBLFNBQUEsRUFBQSxHQUFBLFFBQUEsSUFBQSw4QkFDQSxJQUFBLElBQ0EsSUFBQSxFQUNBLEtBQUEsRUFFQSxNQUFBLElBQUEsS0FBQSxtQkFBQSxJQUFBLElBR0EsRUFBQSxVQUFBLFlBQUEsV0FBQSxRQUFBLElBQUEsK0JBQ0EsS0FBQSxJQUFBLEtBQUEsNkJBQUEsR0FBQSxRQUFBLEtBQUEsYUFBQSxLQUFBLFFBR0EsRUFBQSxVQUFBLGFBQUEsU0FBQSxHQUFBLFFBQUEsSUFBQSxnQ0FDQSxLQUFBLEtBQUEsS0FBQSx5QkFBQSxFQUFBLE9BQUEsS0FHQSwyQkNqREEsRUFBQSxRQUFBLFdBRUEsUUFBQSxHQUFBLEdBQUEsUUFBQSxJQUFBLDRCQUNBLEtBQUEsSUFBQSxFQVFBLEtBQUEsbUJBdUJBLE1BcEJBLEdBQUEsVUFBQSxpQkFBQSxXQUFBLFFBQUEsSUFBQSxpQ0FDQSxLQUFBLE1BQUEsS0FBQSxJQUFBLE9BQUEsdUNBQ0EsS0FBQSxlQUdBLEVBQUEsVUFBQSxZQUFBLFdBQUEsUUFBQSxJQUFBLDRCQUNBLEtBQUEsTUFBQSxHQUFBLFFBQUEsS0FBQSxhQUFBLEtBQUEsUUFHQSxFQUFBLFVBQUEsYUFBQSxTQUFBLEdBQUEsUUFBQSxJQUFBLDRCQUNBLElBQUEsR0FBQSxFQUFBLE1BQUEsS0FBQSxJQUFBLFNBQUEsS0FDQSxFQUFBLEVBQUEsTUFBQSxLQUFBLElBQUEsU0FBQSxJQUNBLElBQ0EsR0FBQSxLQUFBLEVBQ0EsRUFBQSxLQUFBLEVBQ0EsZUFBQSxFQUFBLE9BQUEsSUFDQSxLQUFBLEtBQUEsS0FBQSxxQkFBQSxJQUlBLDJCQ2xDQSxFQUFBLFFBQUEsV0FFQSxRQUFBLEdBQUEsR0FBQSxRQUFBLElBQUEsd0JBQ0EsSUFDQSxLQUFBLElBQUEsR0FrQkEsTUFkQSxHQUFBLFVBQUEsYUFBQSxXQUFBLFFBQUEsSUFBQSx3QkFDQSxJQUFBLEdBQUEsRUFBQSxvQkFBQSxPQUNBLEVBQUEsV0FBQSxRQUFBLEdBQ0EsSUFHQSxHQUFBLElBREEsS0FBQSxJQUNBLEtBQUEsSUFFQSxlQUVBLElBQUEsR0FBQSxFQUFBLEVBQ0EsT0FBQSxHQUFBLElBR0EiLCJmaWxlIjoic2NyaXB0LmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpe1xuXG5cdHZhciBBcHAgPSByZXF1aXJlKCcuL2NsYXNzZXMvQXBwJyk7XG5cblx0ZnVuY3Rpb24gaW5pdCgpwqB7XG5cdFx0bmV3IEFwcCgkKCcjY29udGFpbmVyJykpO1xuXHR9XG5cblx0aW5pdCgpO1xuXG59KSgpOyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XG5cblx0dmFyIFdoaXRlYm9hcmQgPSByZXF1aXJlKCcuL1doaXRlYm9hcmQnKTtcblx0dmFyIEVsZW1lbnRQaWNrZXIgPSByZXF1aXJlKCcuL0VsZW1lbnRQaWNrZXInKTtcblx0dmFyIEVsZW1lbnQgPSByZXF1aXJlKCcuL0VsZW1lbnQnKTtcblxuXHRmdW5jdGlvbiBBcHAoJGVsKSB7IGNvbnNvbGUubG9nKCdbQXBwXSBjb25zdHJ1Y3RvcicpO1xuXHRcdHRoaXMuJGVsID0gJGVsO1xuXHRcdHRoaXMucG9zaXRpb24gPSB7fTtcblx0XHR0aGlzLndoaXRlYm9hcmQgPSBuZXcgV2hpdGVib2FyZCh0aGlzLiRlbCk7XG5cdFx0dGhpcy5lbGVtZW50UGlja2VyID0gbmV3IEVsZW1lbnRQaWNrZXIodGhpcy4kZWwpO1xuXHRcdC8vTFVJU1RFUkVOXG5cdFx0YmVhbi5vbih0aGlzLndoaXRlYm9hcmQsIFwid2hpdGVib2FyZC1jbGlja2VkXCIsIHRoaXMud2hpdGVib2FyZENsaWNrZWRIYW5kbGVyLmJpbmQodGhpcykpO1xuXHRcdGJlYW4ub24odGhpcy5lbGVtZW50UGlja2VyLCBcImVsZW1lbnQtcGlja2VyLWNsaWNrZWRcIiwgdGhpcy5lbGVtZW50UGlja2VyQ2xpY2tlZEhhbmRsZXIuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRBcHAucHJvdG90eXBlLndoaXRlYm9hcmRDbGlja2VkSGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KXsgY29uc29sZS5sb2coJ1tBcHBdIHdoaXRlYm9hcmRDbGlja2VkSGFuZGxlcicpO1xuXHRcdHRoaXMuZWxlbWVudFBpY2tlci50b2dnbGVWaXNpYmxlKCk7XG5cdFx0dGhpcy5lbGVtZW50UGlja2VyLnNldExvY2F0aW9uKGV2ZW50LnhQb3MsIGV2ZW50LnlQb3MpO1xuXHRcdHRoaXMucG9zaXRpb24gPSBldmVudDtcblx0fTtcblxuXHRBcHAucHJvdG90eXBlLmVsZW1lbnRQaWNrZXJDbGlja2VkSGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KXsgY29uc29sZS5sb2coJ1tBcHBdIGVsZW1lbnRQaWNrZXJDbGlja2VkSGFuZGxlcicpOyBcblx0XHR0aGlzLmVsZW1lbnRQaWNrZXIudG9nZ2xlVmlzaWJsZSgpO1xuXHRcdC8vQ1JFQVRFIEJMQU5DXG5cdFx0dmFyIGVsZW1lbnQgPSBuZXcgRWxlbWVudCh0aGlzLiRlbCxldmVudCx0aGlzLnBvc2l0aW9uKTtcblx0fTtcblxuXHRyZXR1cm4gQXBwO1xuXG59KSgpOyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XG5cblxuXHR2YXIgUG9zdGl0ID0gcmVxdWlyZSgnLi9lbGVtZW50cy9Qb3N0aXQnKTtcblxuXHRmdW5jdGlvbiBFbGVtZW50KCRlbCxlbGVtZW50VHlwZSxwb3NpdGlvbixpZCkgeyBjb25zb2xlLmxvZygnW0VsZW1lbnRdIGNvbnN0cnVjdG9yJyk7XG5cdFx0dGhpcy4kZWwgPSAkZWw7XG5cblx0XHR0aGlzLmVsZW1lbnRJZCA9IGlkO1xuXHRcdGlmKHRoaXMuZWxlbWVudElkKXtcblx0XHRcdHRoaXMuZWxlbWVudElkID0gaWQ7XG5cdFx0fWVsc2Uge1xuXHRcdFx0dGhpcy5lbGVtZW50SWQgPSB0aGlzLiRlbC5maW5kKFwiLmVsZW1lbnQtaG9sZGVyXCIpLmxlbmd0aCArIDE7XG5cdFx0fVxuXG5cdFx0dGhpcy5lbGVtZW50VHlwZSA9IGVsZW1lbnRUeXBlO1xuXHRcdHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcblx0XHR0aGlzLmNyZWF0ZUVsZW1lbnRIb2xkZXIoKTtcblx0fVxuXG5cdEVsZW1lbnQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnRIb2xkZXIgPSBmdW5jdGlvbigpeyBjb25zb2xlLmxvZygnW0VsZW1lbnRdIGNyZWF0ZUVsZW1lbnRIb2xkZXInKTtcblx0XHR0aGlzLiRlbC5maW5kKFwiI3doaXRlYm9hcmRcIikuYXBwZW5kKFwiPHNlY3Rpb24gY2xhc3M9J2VsZW1lbnQtaG9sZGVyJz48L3NlY3Rpb24+XCIpO1xuXHRcdHRoaXMuJGVsLmZpbmQoXCIuZWxlbWVudC1ob2xkZXI6bGFzdC1vZi10eXBlXCIpLmF0dHIoJ2lkJywgdGhpcy5lbGVtZW50SWQpO1xuXHRcdHZhciBwb3NpdGlvbiA9IHtcblx0XHRcdHRvcCA6IHRoaXMucG9zaXRpb24ueVBvcyxcblx0XHRcdGxlZnQgOiB0aGlzLnBvc2l0aW9uLnhQb3Ncblx0XHR9O1xuXHRcdHRoaXMuJGVsLmZpbmQoXCIjXCIrdGhpcy5lbGVtZW50SWQpLmNzcyhwb3NpdGlvbik7XG5cdFx0dGhpcy5jcmVhdGVFbGVtZW50KCk7XG5cdH07XG5cblx0RWxlbWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKCl7IGNvbnNvbGUubG9nKCdbRWxlbWVudF0gY3JlYXRlRWxlbWVudCcpO1xuXHRcdHN3aXRjaCh0aGlzLmVsZW1lbnRUeXBlKSB7XG5cdFx0ICAgIGNhc2UgXCJwb3N0LWl0XCI6XG5cdFx0ICAgIFx0dGhpcy5lbGVtZW50ID0gbmV3IFBvc3RpdCgpO1xuXHRcdCAgICBcdHRoaXMuJGVsLmZpbmQoXCIjXCIrdGhpcy5lbGVtZW50SWQpLmFwcGVuZCh0aGlzLmVsZW1lbnQuY3JlYXRlUG9zdGl0KTtcblx0XHQgICAgICAgIGJyZWFrO1xuXHRcdCAgICBjYXNlIFwic3RhdGljXCI6XG5cblx0XHQgICAgICAgIGJyZWFrO1xuXHRcdCAgICBjYXNlIFwibW90aW9uXCI6XG5cblx0XHQgICAgICAgIGJyZWFrO1xuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gRWxlbWVudDtcblxufSkoKTsiLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpe1xuXG5cblx0ZnVuY3Rpb24gRWxlbWVudFBpY2tlcigkZWwpIHsgY29uc29sZS5sb2coJ1tFbGVtZW50UGlja2VyXSBjb25zdHJ1Y3RvcicpO1xuXHRcdHRoaXMuJGVsID0gJGVsO1xuXHRcdHZhciBlbnRyeVRleHQgPSAkKCcjZWxlbWVudC1waWNrZXItdGVtcGxhdGUnKS50ZXh0KCk7XG5cdFx0dmFyIHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKGVudHJ5VGV4dCk7XG5cdFx0dmFyIGNvbnRleHQgPSB7XG5cdFx0ICBlbGVtZW50czogW1x0XG5cdFx0ICBcdFx0XHR7ZWxlbWVudDogXCJwb3N0LWl0XCIsIG5hbWU6IFwicG9zdC1pdFwifSxcblx0XHQgIFx0XHRcdHtlbGVtZW50OiBcInN0YXRpY1wiLCBuYW1lOiBcImltYWdlXCJ9LFxuXHRcdCAgXHRcdFx0e2VsZW1lbnQ6IFwibW90aW9uXCIsIG5hbWU6IFwidmlkZW9cIn1cbiAgXHRcdFx0XHRdXG4gIFx0XHRcdH07XG5cdFx0XHRIYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdwaWNrZXInLCBmdW5jdGlvbigpIHtcblx0XHRcdCAgdmFyIGVsZW1lbnQgPSBIYW5kbGViYXJzLmVzY2FwZUV4cHJlc3Npb24odGhpcy5lbGVtZW50KSxcblx0XHRcdCAgICAgIG5hbWUgPSBIYW5kbGViYXJzLmVzY2FwZUV4cHJlc3Npb24odGhpcy5uYW1lKTtcblxuXHRcdFx0ICByZXR1cm4gbmV3IEhhbmRsZWJhcnMuU2FmZVN0cmluZyhcblx0XHRcdCAgICBcIjxsaSBpZD1cIitlbGVtZW50K1wiPlwiK25hbWUrXCI8L2xpPlwiXG5cdFx0XHQgICk7XG5cdFx0XHR9KTtcblx0XHRcblx0XHR2YXIgaHRtbCA9IHRlbXBsYXRlKGNvbnRleHQpO1xuXHRcdHRoaXMuJGVsLmZpbmQoXCIjd2hpdGVib2FyZFwiKS5hcHBlbmQoICQoaHRtbCkgKTtcblx0XHR0aGlzLnRvZ2dsZVZpc2libGUoKTtcblx0XHR0aGlzLmJpbmRIYW5kbGVyKCk7XG5cdH1cblxuXHRFbGVtZW50UGlja2VyLnByb3RvdHlwZS50b2dnbGVWaXNpYmxlID0gZnVuY3Rpb24oKXsgY29uc29sZS5sb2coJ1tFbGVtZW50UGlja2VyXSB0b2dnbGVWaXNpYmxlJyk7XG5cdFx0dGhpcy4kZWwuZmluZCgnI2VsZW1lbnQtcGlja2VyJykudG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIik7XG5cdH07XG5cblx0RWxlbWVudFBpY2tlci5wcm90b3R5cGUuc2V0TG9jYXRpb24gPSBmdW5jdGlvbih4UG9zLCB5UG9zKXsgY29uc29sZS5sb2coJ1tFbGVtZW50UGlja2VyXSBzZXRMb2NhdGlvbicpO1xuXHRcdHZhciBwb3NpdGlvbiA9IHtcblx0XHRcdHRvcCA6IHlQb3MsXG5cdFx0XHRsZWZ0IDogeFBvc1xuXHRcdH07XG5cdFx0dGhpcy4kZWwuZmluZChcIiNlbGVtZW50LXBpY2tlclwiKS5jc3MocG9zaXRpb24pO1xuXHR9O1xuXG5cdEVsZW1lbnRQaWNrZXIucHJvdG90eXBlLmJpbmRIYW5kbGVyID0gZnVuY3Rpb24oKXsgY29uc29sZS5sb2coJ1tFbGVtZW50UGlja2VyXSBiaW5kSGFuZGxlcicpO1xuXHRcdHRoaXMuJGVsLmZpbmQoJyNlbGVtZW50LXBpY2tlciA+IHVsID4gbGknKS5vbignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcblx0fTtcblxuXHRFbGVtZW50UGlja2VyLnByb3RvdHlwZS5jbGlja0hhbmRsZXIgPSBmdW5jdGlvbihldmVudCl7IGNvbnNvbGUubG9nKCdbRWxlbWVudFBpY2tlcl0gY2xpY2tIYW5kbGVyJyk7XG5cdFx0YmVhbi5maXJlKHRoaXMsIFwiZWxlbWVudC1waWNrZXItY2xpY2tlZFwiLCBldmVudC50YXJnZXQuaWQpO1xuXHR9O1xuXG5cdHJldHVybiBFbGVtZW50UGlja2VyO1xuXG59KSgpOyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XG5cblx0ZnVuY3Rpb24gV2hpdGVib2FyZCgkZWwsIGJvYXJkTmFtZSkgeyBjb25zb2xlLmxvZygnW1doaXRlYm9hcmRdIGNvbnN0cnVjdG9yJyk7XG5cdFx0dGhpcy4kZWwgPSAkZWw7XG5cdFx0Lypcblx0XHRpZihib2FyZE5hbWUpe1xuXHRcdFx0dGhpcy5ib2FyZE5hbWUgPSBib2FyZE5hbWU7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLmJvYXJkTmFtZSA9IFwiTmlldXcgYm9hcmRcIjtcblx0XHR9XG5cdFx0Ki9cblx0XHR0aGlzLmNyZWF0ZVdoaXRlYm9hcmQoKTtcblx0fVxuXG5cdFdoaXRlYm9hcmQucHJvdG90eXBlLmNyZWF0ZVdoaXRlYm9hcmQgPSBmdW5jdGlvbigpeyBjb25zb2xlLmxvZygnW1doaXRlYm9hcmRdIGNyZWF0ZVdoaXRlYm9hcmQnKTtcblx0XHR0aGlzLmJvYXJkID0gdGhpcy4kZWwuYXBwZW5kKFwiPGFydGljbGUgaWQ9J3doaXRlYm9hcmQnPjwvYXJ0aWNsZT5cIik7XG5cdFx0dGhpcy5iaW5kSGFuZGxlcigpO1xuXHR9O1xuXG5cdFdoaXRlYm9hcmQucHJvdG90eXBlLmJpbmRIYW5kbGVyID0gZnVuY3Rpb24oKXsgY29uc29sZS5sb2coJ1tXaGl0ZWJvYXJkXSBiaW5kSGFuZGxlcicpO1xuXHRcdHRoaXMuYm9hcmQub24oJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cdH07XG5cblx0V2hpdGVib2FyZC5wcm90b3R5cGUuY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpeyBjb25zb2xlLmxvZygnW1doaXRlYm9hcmRdIGNsaWNrSGFuZGxlcicpO1xuXHRcdHZhciB4UG9zID0gZXZlbnQucGFnZVggLSB0aGlzLiRlbC5vZmZzZXQoKS5sZWZ0O1xuICAgXHRcdHZhciB5UG9zID0gZXZlbnQucGFnZVkgLSB0aGlzLiRlbC5vZmZzZXQoKS50b3A7XG4gICBcdFx0dmFyIHBvc2l0aW9uID0ge307XG4gICBcdFx0cG9zaXRpb24ueFBvcyA9IHhQb3M7XG4gICBcdFx0cG9zaXRpb24ueVBvcyA9IHlQb3M7XG5cdFx0aWYoZXZlbnQudGFyZ2V0LmlkID09PSBcIndoaXRlYm9hcmRcIil7IC8vYW5kZXJzIGtsaWt0IGhpaiBcImRvb3JcIiBlbGVtZW50ZW5cblx0XHRcdGJlYW4uZmlyZSh0aGlzLCBcIndoaXRlYm9hcmQtY2xpY2tlZFwiLCBwb3NpdGlvbik7XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiBXaGl0ZWJvYXJkO1xuXG59KSgpOyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XG5cblx0ZnVuY3Rpb24gUG9zdGl0KHR4dCkgeyBjb25zb2xlLmxvZygnW1Bvc3RpdF0gY29uc3RydWN0b3InKTtcblx0XHRpZih0eHQpe1xuXHRcdHRoaXMudHh0ID0gdHh0O1xuXHRcdH1cblx0fVxuXG5cdFBvc3RpdC5wcm90b3R5cGUuY3JlYXRlUG9zdGl0ID0gZnVuY3Rpb24oKXsgY29uc29sZS5sb2coJ1tQb3N0aXRdIGNyZWF0ZVBvc3RpdCcpO1xuXHRcdHZhciBlbnRyeVRleHQgPSAkKCcjcG9zdGl0LXRlbXBsYXRlJykudGV4dCgpO1xuXHRcdHZhciB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShlbnRyeVRleHQpO1xuXHRcdHZhciBjb250ZXh0ID0ge307XG5cblx0XHRpZih0aGlzLnR4dCl7XG5cdFx0XHRjb250ZXh0LnR4dCA9IHRoaXMudHh0O1xuXHRcdH1lbHNle1xuXHRcdFx0Y29udGV4dC50eHQgPSBcIk5pZXV3ZSBQb3N0aXRcIjtcblx0XHR9XG5cdFx0dmFyIGh0bWwgPSB0ZW1wbGF0ZShjb250ZXh0KTtcblx0XHRyZXR1cm4gKCQoaHRtbCkpO1xuXHR9O1xuXG5cdHJldHVybiBQb3N0aXQ7XG5cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
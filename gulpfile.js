var gulp 		= require('gulp');
var gutil 		= require('gulp-util');
var browserify  = require('browserify');
var source 		= require('vinyl-source-stream');
var jshint 		= require('gulp-jshint');
var stylish 	= require('jshint-stylish');
var uglify 		= require('gulp-uglify');
var buffer 		= require('vinyl-buffer');
var sourcemaps  = require('gulp-sourcemaps');
var compass = require('gulp-compass');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');



gulp.task('default', ['lint', 'browserify', 'compass'], function(){
	var watcher = gulp.watch('./js/src/**/*.js', ['browserify']); 
	var csswatcher = gulp.watch('./_scss/**/*.scss', ['compass']); 
});

gulp.task('lint', function() {
  return gulp.src('js/src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});

gulp.task('browserify', ['lint'], function(){ 
	var bundler = browserify({
		entries: ['./js/src/script.js'], debug:true 
	});

	return bundler.bundle() 
		.on('error', function(err) { 
			gutil.beep();
			console.log(err.message); 
			this.emit('end');
			
		})
		.pipe(source('script.dist.js')) 
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./js'));
});



gulp.task('compass', function() {
  return gulp.src('_scss/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: '_scss'
    }))
    .pipe(gulp.dest('css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCSS())
	.pipe(gulp.dest('css'));

});


















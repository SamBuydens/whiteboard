var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var buffer = require('gulp-buffer');
var source = require('vinyl-source-stream');
var header = require('gulp-header');
var pkg = require('./package.json');

gulp.task('default', ['browserify', 'compass'], function(){
	var jsWatch = gulp.watch('js/src/**/*.js', ['browserify']);
	jsWatch.on('change', function(e){
		console.log('JavaScript File ' + e.path + ' was ' + e.type + ', running tasks...');
	});

	var scssWatch = gulp.watch('scss/**/*.scss', ['compass']);
	scssWatch.on('change', function(e){
		console.log('SCSS File ' + e.path + ' was ' + e.type + ', precompressing and minfying...');
	});
});

gulp.task('browserify', ['lint'], function(){
	var bundler = browserify({
			entries: ['./js/src/script.js']
	});

	return bundler.bundle()
				.on('error', function(err){
					console.log(err.message);
					gutil.beep();
					this.emit('end');
				})
				//.pipe(buffer())
				.pipe(source('script.dist.js'))
				.pipe(header('/* copyright <%= pkg.author %>, 2014 */ \n', { pkg: pkg }))
				.pipe(uglify().on('error', function(e) {
					console.log('\x07',e.message);
					return this.end(); 
				}))
				.pipe(gulp.dest('./js'));
});

gulp.task('lint', function(){
	return gulp.src('js/src/**/*.js')
    		.pipe(jshint())
    		.pipe(jshint.reporter(stylish));
});

gulp.task('compass', function() {
  	gulp.src('screen.scss')
  		//.pipe(buffer())
    	.pipe(compass({
      		css: '/css',
      		sass: '/scss',
      		image: '/img'
    	}))
    	.on('error', function(err){
    		console.log(err.message);
    		gutil.beep();
    		this.emit('end');
    	})
    	.pipe(minifyCSS())
    	.pipe(gulp.dest('./css'));
});
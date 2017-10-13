const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglifyjs');

gulp.task('styles', function () {
	gulp.src('./src/scss/**/*.scss')
		.pipe(
			sass({
				outputStyle: 'compressed'
			})
			.on('error', sass.logError)
		)
		.pipe(gulp.dest('./public/css'))
		.pipe(browserSync.stream())
});

gulp.task('serve', function() {

	browserSync.init({
		server: {
			proxy: "localhost/kostinbrod"
		}
	});

	gulp.watch('./src/scss/**/*.scss', ['styles']);
	gulp.watch('./src/js/**/*.js', ['scripts']);

});

gulp.task('scripts', function() {
  	return gulp.src([
  			'src/js/image-preload.js',
  			'src/js/main.js',
  			'src/js/nav.js',
  			'src/js/gerb/gerb.js',
  			'src/js/gerb/gerb-items.js',
  			'src/js/gerb/castle.js',
  			'src/js/gerb/sun.js',
  			'src/js/gerb/key.js',
  			'src/js/gerb/bird.js',
  		])
    	.pipe(uglify('bundle.js'))
    	.pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['styles', 'serve', 'scripts']);

// @todo create sprites

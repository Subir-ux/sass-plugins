var gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');

var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var sourcemaps = require('gulp-sourcemaps');

const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
 
sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(prefix('last 2 versions'))
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('css'));  
});

gulp.task('compress', function () {
  return pipeline(
        gulp.src('src/js/**/*.js'),
        uglify(),
        gulp.dest('js')
        // gulp.dest('production/js')
  );
});

 
gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('src/js/**/*.js', gulp.series('compress'));
});

// HTML task: Minified HTML for production version
 function minifyTask(){
  return src(['index.html'])
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(dest('production'));
 }

// Image task: Minified Images for production version
function pdImage(){
	return src('images/**')
	.pipe(imagemin())
	.pipe(gulp.dest('production/images'));
}

// Default Task
gulp.task('default', gulp.series('sass', 'compress', minifyTask, pdImage, 'watch'));

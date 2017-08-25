var gulp = require('gulp');
connect = require('gulp-connect');
plumber = require('gulp-plumber');
sass = require('gulp-sass');
autoprefixer = require('gulp-autoprefixer');
minifyCss = require('gulp-minify-css');
concat = require('gulp-concat');
uglify = require('gulp-uglify');
zip = require('gulp-zip');
del = require('del');

//localhost
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    port: '8888',
    livereload: true
    });
  });

// html
gulp.task('html', function () {
  gulp.src('dev/html/*.html')
  .pipe(gulp.dest('./app'))
  .pipe(connect.reload());
  });

//images
gulp.task('images', function () {
  gulp.src('dev/img/*')
  .pipe(gulp.dest('./app/img'))
  .pipe(connect.reload());
  });

// vendor css
gulp.task('css', function () {
  gulp.src('dev/css/*.css')
  .pipe(gulp.dest('./app/css'))
  .pipe(connect.reload());
  });

// sass
gulp.task('sass', function(){
  return gulp.src('dev/sass/*.scss')
  .pipe(plumber())
  .pipe(autoprefixer({
    browsers: ['last 2 versions','Firefox ESR', 'Opera 12.1'],
    cascade: true
    }))
  .pipe(sass({
      style: 'expanded'
      }))
  // .pipe(minifyCss())
  .pipe(gulp.dest('./app/css'))
  .pipe(connect.reload());
  });

//functions scripts
gulp.task('functionsScripts', function(){
  return gulp.src('dev/js/functions/*.js')
  .pipe(plumber())
  .pipe(concat('functions.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./app/js'))
  .pipe(connect.reload());
  });

//vendor scripts
gulp.task('vendorScripts', function(){
  return gulp.src('dev/js/vendor/*.js')
  .pipe(plumber())
  //.pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./app/js'))
  .pipe(connect.reload());
  });

//fonts
gulp.task('fonts', function () {
  gulp.src('dev/fonts/*')
  .pipe(gulp.dest('./app/fonts'))
  .pipe(connect.reload());
  });

//zip it all
gulp.task('zip', function () {
  return gulp.src('app/*')
  .pipe(zip('app.zip'))
  .pipe(gulp.dest('././'));
  });

gulp.task('clean', function() {
  del(['app','app.zip'], function(err) {
    console.log('Files deleted');
  })
})

//watch it
gulp.task('watch', function(){
  gulp.watch('dev/html/*.html', ['html']);
  gulp.watch('dev/img/*', ['images']);
  gulp.watch('dev/css/*.css', ['css']);
  gulp.watch('dev/sass/**', ['sass']);
  gulp.watch('dev/js/functions/*.js', ['functionsScripts']);
  gulp.watch('dev/js/vendor/*.js', ['vendorScripts']);
  gulp.watch('dev/fonts/*', ['fonts']);
  });

//run gulp
gulp.task('default',['html','images','css','sass','functionsScripts','vendorScripts','fonts','connect','watch']);
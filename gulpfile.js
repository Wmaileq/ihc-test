const gulp = require('gulp'),
  prefixer = require('gulp-autoprefixer'),
  watch = require('gulp-watch'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  rigger = require('gulp-rigger'),
  cssmin = require('gulp-minify-css'),
  notify = require('gulp-notify'),
  concatcss = require('gulp-concat-css'),
  browserSync = require("browser-sync"),
  reload = browserSync.reload;

gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(rigger())
    .pipe(gulp.dest('build/'))
    .pipe(reload({stream :true}))
});

gulp.task('js', function() {
  gulp.src('src/js/*.js')
    .pipe(rigger())
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'))
    .pipe(reload({stream: true}))
});

gulp.task('scss', function() {
  gulp.src('src/styles/*.scss')
    .pipe(sass().on('error', notify.onError(
      {
        message: '<%= error.message %>',
        title: 'Sass error!'
      }
    )))
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(concatcss('compiled.css'))
    .pipe(gulp.dest('build/css/'))
    .pipe(reload({stream: true}))
});

gulp.task('imgs', function() {
  gulp.src('src/img/**/*.*')
    .pipe(gulp.dest('build/img/'))
});

gulp.task('fonts', function() {
  gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('build/fonts/'))
});

gulp.task('build', [
  'html',
  'js',
  'scss',
  'fonts',
  'imgs'
]);

gulp.task('watch', function(){
  watch(['src/*.html'], function() {
    gulp.start('html');
  });
  watch(['src/styles/*.scss'], function() {
    gulp.start('scss');
  });
  watch(['src/js/*.js'], function() {
    gulp.start('js');
  });
  watch(['src/img/**/*.*'], function() {
    gulp.start('imgs');
  });
  watch(['src/fonts/*.*'], function() {
    gulp.start('fonts');
  });
});

gulp.task('webserver', function () {
  browserSync({
    server: {
      baseDir: "./build"
    },
    host: 'localhost',
    port: 4000,
  })
});

gulp.task('default', ['build', 'webserver', 'watch']);
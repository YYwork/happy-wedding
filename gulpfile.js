'use strict';

var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var compass = require('gulp-compass');

var jadesassDir = './layout',
  htmlcssDir = './layout';

var source = {
  sassDir: path.join(jadesassDir, 'style/sass'),
  jadeDir: path.join(jadesassDir, 'templates/jade'),
  imagesDir: path.join(jadesassDir, 'images'),

  sassFileDir: path.join(jadesassDir, 'style/sass/*.scss'),
  jadeFileDir: path.join(jadesassDir, 'templates/jade/*.jade')
}

var output = {
  cssDir: path.join(htmlcssDir, 'style/css'),
  htmlDir: path.join(htmlcssDir, 'templates/html')
}


gulp.task('sass', function() {
  gulp.src(source.sassFileDir)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(output.cssDir));
});

gulp.task('compass', function() {
  gulp.src(source.sassFileDir)
    .pipe(compass({
      config_file: './config.rb',
      images: source.imagesDir,
      sass: source.sassDir,
      css: output.cssDir
    }))
    .pipe(gulp.dest(output.cssDir));
});

gulp.task('jade', function() {
  gulp.src(source.jadeFileDir)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(output.htmlDir))
});


gulp.task('compass:watch', function() {
  gulp.watch(source.sassFileDir, ['compass']);
});

gulp.task('jade:watch', function() {
  gulp.watch(source.jadeFileDir, ['jade']);
});

gulp.task('build', ['compass', 'jade']);
gulp.task('watch', ['compass:watch', 'jade:watch']);

gulp.task('default', ['build', 'watch']);

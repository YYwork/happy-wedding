'use strict';

var gulp = require('gulp');
var path = require('path');

var sass = require('gulp-sass');
var jade = require('gulp-jade');
var compass = require('gulp-compass');
var coffee = require('gulp-coffee');

var gutil = require('gulp-util');

var jadesassDir = './',
  jscoffeeDir = './',
  htmlcssDir = './';

var source = {
  sassDir: path.join(jadesassDir, 'style/sass'),
  jadeDir: path.join(jadesassDir, 'templates/jade'),
  coffeeDir: path.join(jscoffeeDir, 'script/coffee'),
  imagesDir: path.join(jadesassDir, 'images'),

  sassFileDir: path.join(jadesassDir, 'style/sass/*.scss'),
  coffeeFileDir: path.join(jscoffeeDir, 'script/coffee/*.coffee'),
  jadeFileDir: path.join(jadesassDir, 'templates/jade/*.jade')
}

var output = {
  cssDir: path.join(htmlcssDir, 'style/css'),
  htmlDir: path.join(htmlcssDir, 'templates/html'),
  jsDir: path.join(jscoffeeDir, 'script/js')
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


gulp.task('coffee', function() {
  gulp.src(source.coffeeFileDir)
    .pipe(coffee({
      bare: true
    }).on('error', gutil.log))
    .pipe(gulp.dest(output.jsDir))
});

gulp.task('compass:watch', function() {
  gulp.watch(source.sassFileDir, ['compass']);
});

gulp.task('jade:watch', function() {
  gulp.watch(source.jadeFileDir, ['jade']);
});

gulp.task('coffee:watch', function() {
  gulp.watch(source.coffeeFileDir, ['coffee']);
});

gulp.task('build', ['compass', 'jade', 'coffee']);
gulp.task('watch', ['compass:watch', 'jade:watch', 'coffee:watch']);

gulp.task('default', ['build', 'watch']);

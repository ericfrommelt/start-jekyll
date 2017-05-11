var browserSync = require('browser-sync').create();
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var run = require('gulp-run');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var config = require('./_dev/gulp/config');
var paths = require('./_dev/gulp/paths');


// Build styles
gulp.task('build:styles', function() {
  return gulp.src(paths.devSassFiles + '/main.scss')
  .pipe(sass())
  .pipe(gulp.dest(paths.siteCssFiles))
  .pipe(browserSync.stream())
  .on('error', gutil.log);
});


// Build scripts
// ToDo: Optimize scripts
gulp.task('build:scripts', function() {
  return gulp.src(paths.devJsFiles + paths.jsPattern)
  .pipe(gulp.dest(paths.siteScriptFiles))
  .on('error', gutil.log);
});


// Build images
// ToDo: Optimize images
gulp.task('build:images', function() {
  return gulp.src(paths.devImageFiles + '**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(gulp.dest(paths.siteDir))
  .on('error', gutil.log);
});


// Run Jekyll Build
gulp.task('build:jekyll', function() {
  var shellCommand = 'bundle exec jekyll build --config _config.yml';
  if (config.drafts) {
    shellCommand += ' --drafts';
  };
  return gulp.src(paths.jekyllDir)
  .pipe(run(shellCommand))
  .on('error', gutil.log);
});


// Run Jekyll Build to serve locally
gulp.task('build:jekyll:local', function() {
  var shellCommand = 'bundle exec jekyll build --config _config_dev.yml';
  if (config.drafts) {
    shellCommand += ' --drafts';
  };
  return gulp.src(paths.jekyllDir)
  .pipe(run(shellCommand))
  .on('error', gutil.log);
});


// Build site
// Optionally pass the --drafts flag to enable including drafts
// run 'gulp build' to build jekyll, styles, scripts, and images for production
gulp.task('build', function(callback) {
  runSequence('build:jekyll', 'build:styles', 'build:images', 'build:scripts', callback);
})

// Build site locally
// run 'gulp build:local' to build jekyll, styles, scripts, and images for development
gulp.task('build:local', function(callback) {
  runSequence('build:jekyll:local', 'build:styles', 'build:scripts', 'build:images', callback);
})


// Default task: builds site
// run 'gulp' to build for production
gulp.task('default', ['build']);


// Static server
// run 'gulp serve' to spin up a local web server
gulp.task('serve', ['build:local'], function() {
  browserSync.init({
    server: paths.siteDir
  });
})


// Watch site settings
gulp.watch('_config.yml', ['build:jekyll']);


// Watch dev .scss files, changes are piped to browserSync
gulp.watch('_dev/styles/**/*.scss', ['build:styles']);


// Watch JS files
gulp.watch('_dev/scripts/**/*.js', ['build:scripts']);


// Watch Jekyll html files
gulp.watch(['**/*.html', '!_site/**/*.*'], ['build:local']);

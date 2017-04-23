var gulp = require('gulp')
var minify = require('gulp-minify')
var minifyCSS = require('gulp-minify-css')

gulp.task('buildHTML', function () {
  gulp.src('content/*.html')
  .pipe(minify())
  .pipe(gulp.dest('dist/'))
})

gulp.task('buildCSS', function () {
  gulp.src('assets/css/*.css')
  .pipe(minifyCSS())
  .pipe(gulp.dest('dist/css'))
})

gulp.task('build', ['buildHTML', 'buildCSS'], function () {
  console.log('Building Site')
})

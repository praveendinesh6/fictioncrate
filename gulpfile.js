var gulp = require('gulp')
var exec = require('child_process').exec
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

gulp.task('deploy', ['build'], function () {
  console.log('Deploying Site to gh-pages')
  exec('sh lib/deploy.sh', function (err) {
    if (err) {
      console.error(err)
    }
  })
})

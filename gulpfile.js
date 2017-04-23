var gulp = require('gulp')
var exec = require('child_process').exec
var minify = require('gulp-minify')
var minifyCSS = require('gulp-minify-css')
var watch = require('gulp-watch')
var server = require('gulp-server-livereload')

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

gulp.task('buildJS', function () {
  gulp.src('assets/js/*.js')
  .pipe(gulp.dest('dist/js'))
})

gulp.task('copyStatic', function () {
  gulp.src('assets/images/*.*')
  .pipe(gulp.dest('dist/images'))
})

gulp.task('build', ['buildHTML', 'buildCSS', 'buildJS', 'copyStatic'], function () {
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

gulp.task('devBuild', function () {
  gulp.src('assets/css/*.css')
  .pipe(gulp.dest('build/css'))

  gulp.src('assets/js/*.js')
  .pipe(gulp.dest('build/js'))

  gulp.src('assets/images/*.*')
  .pipe(gulp.dest('build/images'))

  gulp.src('content/*.html')
  .pipe(gulp.dest('build/'))
})

gulp.task('server', ['devBuild'], function () {
  gulp.src('build')
  .pipe(server({
    livereload: true,
    directoryListing: false,
    open: true
  }))
  /* Watch files and run tasks to update files */
  watch('assets/css/*.css', function (events, done) {
    console.log('Building CSS files..')
    gulp.start('buildCSS', done)
  })

  watch('assets/css/*.js', function (events, done) {
    console.log('Building JS files..')
    gulp.start('buildJS', done)
  })

  watch('content/*.html', function (events, done) {
    console.log('Building HTML files..')
    gulp.start('buildHTML', done)
  })
})

const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')

// compile scss into css
function style() {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({overrideBrowserslist: ['last 10 version'], grid: true}))
    .pipe(cleanCss(({level: {1: {specialComments: 0}}})))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(browserSync.stream())
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
  gulp.watch('./src/styles/**/*.scss', style)
  gulp.watch('./**/*.html').on('change', browserSync.reload)
  gulp.watch('./src/js/**/*.js').on('change', browserSync.reload)
}

exports.style = style
exports.watch = watch


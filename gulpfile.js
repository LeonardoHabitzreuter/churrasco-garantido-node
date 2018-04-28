const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const paths = {
  scripts: {
    src: 'src/**/*.js',
    dest: 'dist'
  }
}

gulp.task('build', () => (
  gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel({
      presets: ['babel-preset-env'],
      plugins: [
        ['transform-runtime', {
          'helpers': false,
          'polyfill': false,
          'regenerator': true
        }]
      ]
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
))

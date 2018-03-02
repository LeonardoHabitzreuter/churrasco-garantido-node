const gulp = require('gulp')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const paths = {
  scripts: {
    src: 'src/**/*.js',
    dest: 'dist'
  }
};

function compress() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel({
			presets: ['babel-preset-env']
		}))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

const build = gulp.series(compress);
gulp.task('build', build);

module.exports = build
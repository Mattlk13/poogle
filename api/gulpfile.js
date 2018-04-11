const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');

const JSON_FILES = ['src/*.json', 'src/**/*.json'];


const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () => {
  return gulp.src('build/*.js', {read: false})
    .pipe(clean());
});

gulp.task('build', ['clean'], () => {
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', ['build']);
});

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('build'));
});

gulp.task('default', ['watch', 'assets']);

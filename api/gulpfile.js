const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const tslint = require('gulp-tslint');

const JSON_FILES = ['src/*.json', 'src/**/*.json'];


const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () => {
  return gulp.src('build/*.js', {read: false})
    .pipe(clean());
});

gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({ formatter: "verbose" }))
    .pipe(tslint.report());
});

gulp.task('assets', () => {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('build'));
});

gulp.task('build', ['clean', 'tslint', 'assets'], () => {
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('build'));
});
var gulp = require('gulp');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var sourcemaps = require('gulp-sourcemaps');
var shell = require('gulp-shell');

////////
gulp.task('default', ['build']);
gulp.task('build', ['rollup', 'css', 'html']);

////////
var dest_path = 'build';

gulp.task('rollup' , shell.task([
    'rollup -c'
]));

gulp.task('css', function () {
    return gulp.src('./src/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest_path));
});

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dest_path));
});



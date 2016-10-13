var gulp = require('gulp');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var gulp_sequence = require('gulp-sequence');
var sourcemaps = require('gulp-sourcemaps');
var shell = require('gulp-shell');

////////
gulp.task('default', ['build']);
gulp.task('build', gulp_sequence('html', ['rollup', 'css'], 'docs'));
//gulp.task('build', ['rollup', 'css', 'html']);

////////
let src_path = 'src';
var build_path = 'build';
let js_build = [build_path, 'js'].join('/');
let css_build = [build_path, 'css'].join('/');

gulp.task('rollup' , shell.task([
    'rollup -c'
]));

gulp.task('css', function () {
    return gulp.src('./src/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(css_build));
});

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(build_path));
});

gulp.task('docs', function () {
    gulp.src([build_path + '/*'])
        .pipe(gulp.dest('docs'));

    gulp.src([js_build + '/*'])
        .pipe(gulp.dest('docs/js'));

    gulp.src([css_build + '/*'])
        .pipe(gulp.dest('docs/css'));
});


gulp.task('docs_2', function () {
    let src_array = [build_path + '/*', js_build + '/*', css_build + '/*'];
    return gulp.src(src_array)
        .pipe(gulp.dest('docs'));
});

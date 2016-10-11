var gulp = require('gulp');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
// var gulp_rollup = require('gulp-rollup');
var sourcemaps = require('gulp-sourcemaps');
var shell = require('gulp-shell');
var rollup = require('rollup');
var rollup_babel = require('rollup-plugin-babel');
var rollup_commonjs = require('rollup-plugin-commonjs');
// var rollup_json = require('rollup-plugin-json');
// var node_resolve = require('rollup-plugin-node-resolve');
// var rollup_uglify = require('rollup-plugin-uglify');

var dest_path = 'build';
var is_ugly = false;

gulp.task('set_ugly', function () {
    is_ugly = true;
});

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

gulp.task('watch', function () {
    gulp.watch('less/*.*', ['css']);
    gulp.watch('js/*.*', ['rollup']);
});

gulp.task('default', ['build']);
gulp.task('build', ['rollup', 'css', 'html']);
gulp.task('ugly', ['set_ugly', 'build']);
/*
function get_plugin_array() {
    let plugin_array = [];

    plugin_array.push(rollup_json());

    plugin_array.push(node_resolve({
        jsnext: true,
        main: true,
        browser: true
    }));

    plugin_array.push(rollup_commonjs());
    plugin_array.push(rollup_babel());

    return plugin_array;
}



 gulp.task('default', ['rollup', 'css', 'watch']);
 gulp.task('build', ['rollup', 'css', 'watch']);
 gulp.task('release', ['set_ugly', 'build']);
 */
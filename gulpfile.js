'use strict';
const gulp = require('gulp'),
    sass = require("gulp-sass"),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    del = require('del'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    gutil = require('gulp-util'),
    webserver = require('gulp-webserver'),
    opn = require('opn'),
    rjs = require('gulp-requirejs');

var server = {
    host: 'localhost',
    port: '8001'
}
gulp.task('webserver', function () {
    gulp.src('.')
        .pipe(webserver({
            host: server.host,
            port: server.port,
            livereload: true,
            directoryListing: false
        }));
});
gulp.task('openbrowser', function () {
    opn('http://' + server.host + ':' + server.port);
});
// Create an electron-connect server to enable reloading
const config = {
    //Include all js files but exclude any min.js files
    scriptFiles: ['src/module.js'], //all custom js we write
    scssFiles: ['./src/loader.scss'], //main scss to we need
    outputDir: 'dist',
    outputFiles: 'dist/*'
};
//delete the output file(s)
gulp.task('clean', function () {
    //del is an async function and not a gulp plugin (just standard nodejs)
    //It returns a promise, so make sure you return that from this task function
    //  so gulp knows when the delete is complete
    return del(config.outputFiles);
});


gulp.task('script', function () {
    return gulp.src(config.scriptFiles)
        .pipe(babel({
            // presets: ['es2015']
            presets: ['env']
        }))
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename({
            basename: "winloader.min",
        }))
        .pipe(gulp.dest(config.outputDir));
});
gulp.task("css", function () {
    return setTimeout(() => {
        return gulp.src(config.scssFiles)
            .pipe(sass().on('error', sass.logError))
            .pipe(cleanCSS())
            //   .pipe(cleanCSS({ debug: true }, function(details) {
            //       console.log(details.name + ': ' + details.stats.originalSize);
            //       console.log(details.name + ': ' + details.stats.minifiedSize);
            //   }))
            .pipe(rename({
                // suffix: '.min'
                basename: "winloader.min"
            }))
            .pipe(gulp.dest(config.outputDir))
    }, 500)
});
//Set a default tasks
gulp.task('default', ['clean', 'script', 'css', 'webserver', 'openbrowser'], function () {
    gulp.watch(config.subScssFiles, ['css']);
    gulp.watch(config.scriptFiles, ['script']);
});

'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

livereload({
    start: true,
    port: 35727
});

gulp.task('sass', function () {
    gulp.src('./scss/**/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(livereload({
            port: 35727
        }));
});
gulp.task('sass:watch', function () {
    livereload.listen({
        port: 35727
    });
    gulp.watch('./scss/**/*.scss', ['sass']);
});


'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var deploy = require('gulp-deploy-git');


var runSequence = require('run-sequence');



livereload({
    start: true,
    port: 35727
});

/**
 *   
 * Sass
 * 
 */
gulp.task('sass', function () {
    gulp.src('./scss/**/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(livereload({
            port: 35727
        }));
});


/**
 *   
 * Watch
 * 
 */
gulp.task('watch:sass', function () {
    livereload.listen({
        port: 35727
    });
    gulp.watch('./scss/**/*.scss', ['sass']);
});


/**
 *   
 * Copy
 * 
 */
gulp.task('copy', [
    'copy:img',
    'copy:css',
    'copy:html',
    'copy:font',
    'copy:src'
]);

gulp.task('copy:img', function(){
    return gulp.src(['img/*'])
        .pipe(gulp.dest('build/img/'));
});

gulp.task('copy:css', function(){
    return gulp.src(['css/'])
        .pipe(gulp.dest('build/css/'));
});

gulp.task('copy:html', function(){
    return gulp.src(['*.html'])
        .pipe(gulp.dest('build/'));
});

gulp.task('copy:font', function(){
    return gulp.src(['font/'])
        .pipe(gulp.dest('build/font/'));
});

gulp.task('copy:src', function(){
    return gulp.src(['src/'])
        .pipe(gulp.dest('build/src/'));
});


/**
 *   
 * Build 
 * 
 */
gulp.task('build', function(done){
    runSequence(
        'clean',
        'sass:bootstrap',
        'sass:foundation',
        'sass:app',
        'useref',
        'copy',
        'compress:img',
        'inject',
        //'manifest',
        done);
});


/**
 *   
 * Deploy
 * 
 */
gulp.task('deploy', function() {
    return gulp.src('build/**/*')
        .pipe(deploy({
            repository: 'git@github.com:cfangwei/cfangwei.github.io.git',
            branches:   ['master']
        }));
});

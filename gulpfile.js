'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var changed = require('gulp-changed');

var gutil = require('gulp-util');
var log = gutil.log;
var colors = gutil.colors;

var outPath = "./dist";
var bootstrapPath = "bower_components/bootstrap-sass/assets/stylesheets/bootstrap";

gulp.task('styles', function () {
    log(colors.blue('Copying fonts'));
    return gulp.src('./styles/**/*.scss')
        .pipe(sass({ includePaths : [bootstrapPath] }).on('error', sass.logError))
        .pipe(gulp.dest(outPath+'/css'));
});

gulp.task('fonts', function() {
    log(colors.blue('Copying fonts'));

    var fonts = gulp.src('styles/fonts/**/*.*')
        .pipe(changed('styles/fonts'))
        .pipe(gulp.dest(outPath+'/css/fonts'));

    return fonts;
});

gulp.task('static', function() {
    log(colors.blue('Copying static stuff'));

    var fonts = gulp.src('styles/fonts/**/*.*')
        .pipe(changed('styles/fonts'))
        .pipe(gulp.dest(outPath+'/css/fonts'));

    return fonts;
});

gulp.task('watch', ['build'], function() {

    gulp.watch('./styles/**/*.scss', ['styles']);
    gulp.watch('./styles/fonts/**/*.*', ['fonts']);

    // gulp.watch('yarn/assets/{img,images}/**/*.*',    ['images']);
    // gulp.watch('yarn/assets/{js,scripts}/**/*.*',    ['lint:scripts', 'scripts', browserSync.reload]);
    // gulp.watch('yarn/assets/ie7/**/*.*',             ['files']);
});

// gulp.task('build',   ['styles', 'fonts', 'images', 'scripts', 'files']);
gulp.task('build',   ['styles', 'fonts', 'static']);
gulp.task('default', ['build']);

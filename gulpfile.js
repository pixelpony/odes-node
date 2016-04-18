'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var es = require('event-stream');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var gutil = require('gulp-util');
var log = gutil.log;
var colors = gutil.colors;

var appRoot = ".";
var appEntryPath = appRoot + '/app.js';
// var appPath = appRoot + '/scripts/*.*';
var scriptsPath = appRoot + '/scripts/*.*';
var stylesPath = appRoot + "/styles/**/*.scss";
var fontsPath = appRoot + "/styles/fonts/**/*.*";
var staticPath = appRoot + '/static/**/*.*';
var imgsPath = appRoot + '/styles/images/**/*.*';

var outPath = "./dist";
var stylesOutPath = outPath + "/css";
var browserScriptsOutPath = outPath + '/scripts';
var fontsOutPath = outPath + "/css/fonts";

var bootstrapPath = "bower_components/bootstrap-sass/assets/stylesheets/bootstrap";

var bowerRoot = "./bower_components";

var browserScripts = [
    (bowerRoot + '/jquery/dist/jquery.js'),
    (bowerRoot + '/lodash/dist/lodash.js'),
    (appRoot + '/scripts/timeline.js')
];

gulp.task('scripts', function() {
    log(colors.blue('Copying scripts'));

    var appEntry = gulp.src(appEntryPath)
        .pipe(gulp.dest(outPath));


    // var scripts = gulp.src(appPath)
        // .pipe(named())
        // .pipe(webpack(require('./webpack.config.js')))
        //     .on('error', onError)
        // .pipe(gulpif(options.prod, stripDebug()))
        // .pipe(gulpif(options.prod, uglify({
        //     output: {ascii_only: true}
        // })))
        //
        // .pipe(gulp.dest(outPath + '/scripts'));

    // return es.merge(appEntry, scripts);
    return appEntry;
});

gulp.task('browserScripts', function() {
    log(colors.blue('Concatenating browser scripts'));
    return gulp.src(browserScripts)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest(browserScriptsOutPath));

});

gulp.task('styles', function () {
    log(colors.blue('Copying fonts'));
    return gulp.src(stylesPath)
        .pipe(sass({ includePaths: [bootstrapPath] }).on('error', sass.logError))
        .pipe(gulp.dest(stylesOutPath));
});

gulp.task('fonts', function() {
    log(colors.blue('Copying fonts'));

    var fonts = gulp.src(fontsPath)
        // .pipe(changed('styles/fonts'))
        .pipe(gulp.dest(fontsOutPath));

    return fonts;
});

gulp.task('static', function() {
    log(colors.blue('Copying static stuff'));

    var files = gulp.src(staticPath)
        // .pipe(changed('static'))
        .pipe(gulp.dest(outPath+'/static'));

    return files;
});

gulp.task('images', function() {
    log(colors.blue('Copying images'));

    var images = gulp.src(imgsPath)
        // .pipe(changed('yarn/static/images'))
        .pipe(gulp.dest(outPath+'/css/images'));

    return images;
});

gulp.task('watch', ['build'], function() {

    gulp.watch(stylesPath, ['styles']);
    gulp.watch(fontsPath,  ['fonts']);
    gulp.watch(imgsPath,  ['images']);
    gulp.watch(appEntryPath,  ['scripts']);
    gulp.watch(scriptsPath,  ['browserScripts']);
    gulp.watch(staticPath,  ['static']);

    // gulp.watch('yarn/assets/{img,images}/**/*.*',    ['images']);
    // gulp.watch('yarn/assets/{js,scripts}/**/*.*',    ['lint:scripts', 'scripts', browserSync.reload]);
    // gulp.watch('yarn/assets/ie7/**/*.*',             ['files']);
});

// gulp.task('build',   ['styles', 'fonts', 'images', 'scripts', 'files']);
gulp.task('build',   ['browserScripts', 'styles', 'fonts', 'images', 'scripts', 'static' ]);
gulp.task('default', ['build']);

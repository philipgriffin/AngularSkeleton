var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    templateCache = require('gulp-angular-templatecache'),
    clean = require('gulp-clean');
    htmlmin = require('gulp-htmlmin');

var paths = {
    mainModule: 'skeletonApp',
    srcIndex: 'src/app/index.html',
    srcJsModules: 'src/**/*.module.js',
    srcJsComponents: 'src/**/*.component.js',
    srcJsConfig: 'src/**/*.component.js',
    srcJsAll: 'src/**/*.js',
    srcTemplates: 'src/**/*.html',
    tmpTemplates: '.tmp/templates.js',
    dist: 'dist/',
    distJs: 'dist/scripts/',
    temp:  '.tmp/'
};

gulp.task('scripts', ['templatecache'], function () {
    return gulp.src([
            paths.srcJsModules,
            paths.tmpTemplates,
            paths.srcJsComponents,
            paths.srcJsConfig,
            paths.srcJsAll])
        .pipe(concat('scripts.js'))
//        .pipe(gulp.dest(paths.distJs))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('templatecache', function() {
    return gulp.src(['!src/app/index.html', paths.srcTemplates])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(templateCache({
        module: 'skeletonApp',
        standAlone: false
    }))
    .pipe(gulp.dest(paths.temp));
});

gulp.task('html', function() {
    return gulp.src(paths.srcIndex)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('clean', ['scripts'], function () {
    return gulp.src(paths.temp)
    .pipe(clean({
    read: false
    }));
});

gulp.task('default', ['scripts', 'html', 'clean']);
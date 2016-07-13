var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    templateCache = require('gulp-angular-templatecache'),
    clean = require('gulp-clean');
    htmlmin = require('gulp-htmlmin'),
    gutil = require('gulp-util')
    clear = require('clear'),
        browserSync = require('browser-sync').create();

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

var vendorJs = [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js'
];

// MAIN TASKS

gulp.task('build', ['clear', 'vendor', 'scripts', 'html', 'css', 'images', 'clean'], function(){
    gutil.log(gutil.colors.green('Build - Finished!'));
});

// SUB TASKS

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
        .pipe(gulp.dest(paths.distJs))
        .on('end', function() {
            gutil.log(gutil.colors.blue('Scripts: Minify | Concat | Rename | > '), gutil.colors.green('dist/'));
        });
});

gulp.task('vendor', function () {
    return gulp.src(vendorJs)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(paths.distJs))
        .on('end', function() {
            gutil.log(gutil.colors.blue('Vendor: Concat | >'), gutil.colors.green('dist/'));
        });
});

gulp.task('templatecache', function() {
    return gulp.src(['!src/app/index.html', paths.srcTemplates])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(templateCache({
        module: 'skeletonApp',
        standAlone: false
    }))
    .pipe(gulp.dest(paths.temp))
    .on('end', function() {
        gutil.log(gutil.colors.blue('Templates: Minify | Template Cache | >'), gutil.colors.green('.tmp/'));
    });
});

gulp.task('html', function() {
    return gulp.src(paths.srcIndex)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.dist))
    .on('end', function() {
        gutil.log(gutil.colors.blue('Html: Minify | >'), gutil.colors.green('dist/'));
    });
});

gulp.task('clean', ['scripts'], function () {
    return gulp.src(paths.temp)
    .pipe(clean({read: false}))
    .on('end', function() {
        gutil.log(gutil.colors.blue('Clean:'), gutil.colors.red('.tmp/'));
    });
});

gulp.task('clear', function () {
    clear();
    gutil.log(gutil.colors.green('Clearing console...'));
});

gulp.task('images', function () {
    return gulp.src('src/app/assets/images/*.jpeg')
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('css', function () {
    return gulp.src('src/app/*.css')
        .pipe(gulp.dest('dist/'));
});

gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});
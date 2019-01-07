'use strict';

const gulp         = require('gulp');
const sass         = require('gulp-sass');
const multipipe    = require('multipipe');
const concat       = require('gulp-concat');
const notify       = require("gulp-notify");
const minify       = require('gulp-clean-css');
const sourcemaps   = require('gulp-sourcemaps');
const fileinclude  = require('gulp-file-include');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync').create();

gulp.task('styles', () =>
    multipipe(
        gulp.src(['./src/styles/style.scss', './src/styles/media.scss']),
        sourcemaps.init(),
            concat('main.scss'),
            sass({ includePaths: require('node-normalize-scss').includePaths }).on('error', sass.logError),
            autoprefixer({browsers: ['last 5 versions']}),
            minify({compatibility: 'ie10'}),
        sourcemaps.write(),
        gulp.dest('./build/styles')
    ).on('error', notify.onError())
);

gulp.task('layouts', () =>
    multipipe(
        gulp.src('./src/*.html'),
        fileinclude({
            prefix: '@@',
            basepath: './src/components/'
        }),
        gulp.dest('./build/')
    )
);

gulp.task('watch', () => {
    gulp.watch('./src/styles/**.*', gulp.series('styles'));
    gulp.watch('./src/**/*.html', gulp.series('layouts'));
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    browserSync.watch('./src/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(gulp.parallel('styles', 'layouts'), gulp.parallel('watch', 'serve')));

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
//var sequence = require('gulp-watch-sequence');

gulp.task('default', function () {
    gulp.run('js');
    gulp.run('js:watch');
    gulp.run('sass:watch');

});

gulp.task('build:dist', function () {
    gulp.run('js');
    gulp.run('sass');
});

gulp.task('js', function () {
    return gulp.src('source/jquery.searchdrawer.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
        .pipe(notify({ message: 'Finished minifying JavaScript'}));
});

gulp.task('sass', function () {
    return gulp.src('./source/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'))
        .pipe(notify({ message: 'Finished compiling SASS'}));
});



gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});


gulp.task('js:watch', function () {
    gulp.watch('*/*.js', ['js']);
});

/*

gulp.task('watch', function () {
    var queue = sequence(300);

    watch({
        name: 'JS',
        emitOnGlob: false,
        glob: 'src/!**!/!*.js'
    }, queue.getHandler('js', 'html', 'reload'));

    watch({
        name: 'CSS',
        emitOnGlob: false,
        glob: 'scss/!**!/!*.scss'
    }, queue.getHandler('css', 'html', 'reload'));
});
*/

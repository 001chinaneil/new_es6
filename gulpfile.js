const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
//ES6 转 ES5
gulp.task('babel', function(){
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('compressed'))
});
//压缩ES5代码
// gulp.task('min', function(){
//     return gulp.src('dist/**/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('compressed'))
// });
// gulp.task('auto', function () {
//     // 监听文件修改，当文件被修改则执行 script 任务
//     gulp.watch('src/**/*.js', ['babel']);
//     gulp.watch('dist/*.js', ['min']);
//
// });
gulp.task('default',['babel']);
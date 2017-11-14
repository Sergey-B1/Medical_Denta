var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');

// task по умолчанию
gulp.task('default', function () {
    gulp.start(['js', 'less', 'watch']);
});

// исходные файлы
var lessSrc = [
        'source/less/*.less',
        'source/less/*/*.less'
    ],
    jsSrc = [
        'source/js/*.js'
    ];

// обработать less, обработать автопрефиксером,
// минифицировать и объединить в 1 файл
gulp.task('less', function () {
    gulp.src('source/less/style.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 3 version'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('.'));
});

// минифицировать и обйединить в 1 файл js-скрипты
gulp.task('js', function () {
    gulp.src(jsSrc)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

// запустить таски less и js, а потом следить за изменениями исходников
// если произофла запись исходника, то выполнить соответствующий таск
gulp.task('watch', function () {
    gulp.start(['less', 'js']);
    gulp.watch([lessSrc], ['less']);
    gulp.watch([jsSrc], ['js']);
});
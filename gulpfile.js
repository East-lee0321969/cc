
const gulp = require('gulp'); 
const html = require('gulp-minify-html'); 
const css = require('gulp-cssmin');



const babel = require('gulp-babel'); 
const bablecore = require('babel-core'); 
const es2015 = require('babel-preset-es2015'); 
const uglifyjs = require('gulp-uglifyjs'); 

const watch = require('gulp-watch');
// const imagemin = require('gulp-imagemin');

// //gulp-sass   gulp-sourcemaps    gulp-load-plugins
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plugins = require('gulp-load-plugins');



//1.复制文件 - 无需安装包 - 考试的重点
// gulp.task('copyfile', () => {
//     return gulp.src('src/fonts/*.woff').pipe(gulp.dest('dist/fonts/'));
// });
// gulp.task('copyfile', () => {
//     return gulp.src('src/fonts/*.woff').pipe(gulp.dest('dist/fonts/'));
// });

//2.压缩html文件 - 需要安装包 - gulp-minify-html/gulp-htmlmin
gulp.task('uglifyhtml', () => {
    return gulp.src('src/*.html') //引入文件
        .pipe(html()) //压缩
        .pipe(gulp.dest('dist/')); //输出
});

//3.压缩css文件 - 需要安装包 - gulp-clean-css / gulp-cssmin
gulp.task('uglifycss', () => {
    return gulp.src('src/style/*.css') //引入文件
        .pipe(css()) //压缩
        .pipe(gulp.dest('dist/css/')); //输出
});

//4.压缩js文件
gulp.task('uglifyjs', function() {
    return gulp.src('src/script/*.js') //引入文件
        .pipe(babel({ //转码
            presets: ['es2015']
        }))
        .pipe(uglifyjs()) //压缩
        .pipe(gulp.dest('dist/script/')); //输出
});

//5.压缩图片
gulp.task('runimg', function() {
    return gulp.src('src/images/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'));
});

//6.sass编译成css并且压缩
gulp.task('runsass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sourcemaps.init()) //初始化map文件
        .pipe(sass({
            outputStyle: 'compressed' //执行编译,compressed:压缩一行
        }))
        .pipe(sourcemaps.write('./')) //生成写入map文件
        .pipe(gulp.dest('src/style/')); //输出
});

//7.监听
//watch([监听的目录])
//gulp.parallel 并行运行任务 
//被监听的任务必须先执行一次。 'uglifyhtml', 'uglifycss', 'uglifyjs'
gulp.task('default', function() {
    watch(['src/*.html', 'src/style/*.css','src/sass/*.scss', 'src/script/*.js'], gulp.parallel('uglifyhtml', 'uglifycss', 'uglifyjs','runsass'));
});
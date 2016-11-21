/**
 * Created by Administrator on 2016/11/18 0018.
 */
(function(){


    var gulp = require('gulp'),
        runSequence = require('run-sequence'),               //判断是一部还是同步
        browserSync = require('browser-sync').create(),      //启动浏览器
        //concat = require('gulp.concat'),                   //文件合并
        del = require('del'),                                //清空文件夹
        uglify = require('gulp-uglify'),                          //压缩js
        minifyCss = require('gulp-minify-css');              //压缩css


    /**
     定义任务
     */


    gulp.task('default', function (callback) {
        return runSequence(['clean'],['build'],['server','watch'],callback)
    });
    /**
     *  将任务分组copy miniJs miniCss
     **/
    gulp.task('build',function(callback){
        return runSequence(['copy','miniJs','miniCss'],callback)
    });
    /**
     *   清空目录
     **/

    gulp.task('clean', function (callback) {
        return del(['./dist'],callback)
    });

    /**
     *   文件复制
     **/

    gulp.task('copy', function () {
        return gulp.src('./src/**/*.*')
            .pipe(gulp.dest('./dist'))
    });

    /**
     *   js压缩
     **/
    gulp.task('miniJs',function(){
        return gulp.src('./src/**/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('./dist/'))
    });

    /**
     *   css压缩
     **/
    gulp.task('miniCss',function(){
        return gulp.src('./**/*.css')
            .pipe(minifyCss())
            .pipe(gulp.dest('./dist'))
    });
    /**
     *  文件合并concat
     **/
    gulp.task("concat",function(){
        return gulp.src('./src/*.js')
            .pipe(concat('all.js',{newLine:':\n'}))
            .pipe(gulp.dest('.dist/'))
    });

    /**
     *  browser-sync启动浏览器
     **/
    gulp.task('server', function () {
        //启动浏览器不需要gulp开头了！需要browserSync初始化一个
        return browserSync.init({
            server: {
                baseDir:'./dist'
            },
            //prot设置端口号！默认3000
            port: 7411
        })
    });
    /**
     *  监听文件变化
     **/
    gulp.task('watch', function () {
        return gulp.watch('./src/**/*.*',['reload'])
    });

    /**
     *  reload 重新加载
     **/
    gulp.task('reload',function(callback){
        //每一个参数是同步的，参数数组里面任务的是异步的。
        return runSequence(['build'],['reload-browser'],callback)
    });
    /**
     *  调用浏览器的reload方法
     **/
    gulp.task('reload-browser',function(){
        return browserSync.reload();
    });
}).call(this);














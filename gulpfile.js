var gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  sass = require('gulp-sass'),
  ejs = require('gulp-ejs'),
	connect = require('gulp-connect'),
  webpack = require('webpack-stream'),
  cssnext = require('postcss-cssnext'),
  px2rem = require('postcss-px2rem'),
  cssnano = require('cssnano'),
  babel = require('gulp-babel');

gulp.task('css',function () {

  console.log('css starting')

  var processors = [
        cssnext({browsers: ['last 20 version', '>1%','Firefox ESR', 'Opera 12.1']}),
        // px2rem({remUnit: 64}),
        // cssnano({zindex: false})

    ];
  return gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('src/css'))
        .pipe(connect.reload());

});


gulp.task('html', function () {
  gulp.src('./src/ejs/**/*.ejs')
    .pipe(ejs({},{ext: '.html'}))
    .pipe(gulp.dest('src/html'))
    .pipe(connect.reload());
});

// gulp.task('webpack', function () {
//   return gulp.src('./src/js')
//     // .pipe(babel())
//     .pipe(webpack( require('./webpack.config.js')))
//     .pipe(gulp.dest('dist/'))
//     .pipe(connect.reload());
// });


gulp.task('connect', function() {
  connect.server({
    root: './',
    port: 4000,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(['./src/ejs/**/*.ejs'], ['html']);
  gulp.watch(['./src/sass/**/*.scss'], ['css']);
  // gulp.watch(['./src/js/**'], ['webpack']);
  // gulp.watch(['./dist/js/**/*.js'], ['scripts']);
});


gulp.task('default', ['connect', 'watch'], function(){
  console.log("starting watch");
})

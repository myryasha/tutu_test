var gulp = require('gulp'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat-css'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	rigger = require('gulp-rigger'),
	path = require('path');

gulp.task('connect', function () {
	connect.server({
		root: 'dist/',
		livereload: true
	});
});

gulp.task('sass', function () {
	gulp.src('app/scss/main.scss')
		// .pipe(concat('main.css'))
		.pipe(autoprefixer({
			browsers: ['> 1%'],
			cascade: false
		}))
		.pipe(sass())

	.pipe(gulp.dest('./dist/css'))
		.pipe(connect.reload());
});

gulp.task('html', function () {
	gulp.src('app/index.html')
		.pipe(gulp.dest('./dist/'))
		.pipe(connect.reload());
});

gulp.task('js', function () {
	gulp.src(['app/js/*.js', 'app/js/*.json'])
		.pipe(rigger())
		.pipe(gulp.dest('./dist/js'))
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch('app/index.html', ['html'])
	gulp.watch('app/scss/*.scss', ['sass'])
	gulp.watch(['app/js/*.js', 'app/js/*.json'], ['js']);

});

gulp.task('default', ['connect', 'sass', 'html', 'js', 'watch']);
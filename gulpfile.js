var gulp = require('gulp');

// require other packages

var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var cssmin = require('gulp-clean-css');
var notifier = require('node-notifier');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var msg = function( title, message ){
	notifier.notify({
		title: title,
		message: message
	});
};

var scriptInput = [
	'./node_modules/jquery/dist/jquery.min.js',
	'./node_modules/magnific-popup/dist/jquery.magnific-popup.js',
	'./src/js/modules/*.js',
	'./src/js/main.js'
];

var sassInput = [
	'./src/sass/*.scss'
];

var sassOutput = './dist/css/';
var scriptOutput = './dist/js/';

var sassOpts = {
	errLogToConsole: true,
	outputStyle: 'nested',
	includePaths: [
		'./src/sass'
	]
};

var criticalSassOpts = {
	outputStyle: 'nested'
};

var autoprefixerOpts = {
	browsers: ['> 2% in GB', 'IE >= 9']
};


gulp.task('icons', function() {
	return gulp
		.src('./src/packages/font-awesome/fonts/**.*')
		.pipe(gulp.dest('./dist/fonts'));
});


// autoprefix debug info
gulp.task('autoprefix-debug', function() {
	var info = autoprefixer( autoprefixerOpts ).info();
	console.log( info );
});


// scripts task
gulp.task('scripts', function() {
	return gulp.src( scriptInput )
		.pipe(concat('app.js'))
		.pipe(gulp.dest( scriptOutput ))
		.pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest( scriptOutput ));
});

// styles task
gulp.task('styles', function() {
	return gulp.src( sassInput )
		.pipe(sass( sassOpts))
		.pipe(gulp.dest( sassOutput ))
		.pipe(sourcemaps.init())
		.pipe(cssmin({compatibility: 'ie8'}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest( sassOutput ));
});

// critical styles task
gulp.task('critical', function() {
	return gulp.src('./src/sass/base/critical.scss')
		.pipe(sass({includePaths: ['./src/sass/base'], outputStyle: 'expanded'}))
		.pipe(gulp.dest('./dist/css/'));
});

// watch task
gulp.task('watch', function() {
	gulp.watch([
		'./src/js/*.js',
		'./src/js/**/*.js'
	], ['scripts'], msg( 'Javascript Build', 'Built app.js' ));
	gulp.watch([
		'./src/sass/*.scss',
		'./src/sass/**/*.scss'
	], ['styles'], msg( 'Sass Build', 'Built styles.css' ));
});

gulp.task('default', ['scripts', 'styles', 'watch']);

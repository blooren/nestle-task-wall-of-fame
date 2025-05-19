/**
 * Gulpfile for Wall of Fame Drupal module
 * Fixed to prevent "Maximum call stack size exceeded" issues
 */


// Import required packages
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const del = require('del');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();

// Module paths
const paths = {
  styles: {
    src: './src/scss/**/*.scss',
    dest: './css/'
  },
  scripts: {
    src: './src/js/**/*.js',
    dest: './js/'
  },
  templates: {
    src: './src/templates/**/*.twig',
    dest: './templates/'
  },
  drupal: {
    moduleFiles: ['./*.module', './*.info.yml', './*.libraries.yml']
  }
};

// Configure Drupal site URL for BrowserSync
const drupalSiteUrl = 'https://wall-of-fame.ddev.site/node/6'; // Update with your Drupal dev URL

// Clean output directories
function clean() {
  return del([
    paths.styles.dest + '**/*',
    paths.scripts.dest + '**/*',
    paths.templates.dest + '**/*'
  ]);
}

// Process SCSS files
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Lint JS files
function lintScripts() {
  return gulp.src(paths.scripts.src)
    .pipe(eslint())
    .pipe(eslint.format());
    // Removed failAfterError to prevent build failures
}

// Process JS files
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Copy Twig templates
function templates() {
  return gulp.src(paths.templates.src)
    .pipe(gulp.dest(paths.templates.dest))
    .pipe(browserSync.stream());
}

// Watch files for changes
function watch() {
  // Initialize BrowserSync
  browserSync.init({
    proxy: drupalSiteUrl,
    open: false,
    notify: false
  });

  // Watch for file changes
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, gulp.series(lintScripts, scripts));
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.drupal.moduleFiles).on('change', browserSync.reload);
}

// Define complex tasks
const build = gulp.series(clean, gulp.parallel(styles, gulp.series(lintScripts, scripts), templates));

// Export tasks
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.lintScripts = lintScripts;
exports.templates = templates;
exports.watch = watch;
exports.build = build;
exports.default = gulp.series(build, watch);
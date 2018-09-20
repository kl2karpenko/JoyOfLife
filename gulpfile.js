const
  gulp                = require('gulp'),
  less                = require('gulp-less'),
  path                = require('path'),
  LessAutoprefix      = require('less-plugin-autoprefix'),
  autoprefix          = new LessAutoprefix({ browsers: ['last 2 versions'] }),
  LessPluginCleanCSS  = require('less-plugin-clean-css'),
  cleanCSSPlugin      = new LessPluginCleanCSS({advanced: true}),
  pump                = require('pump'),
  fs                  = require('fs'),
  gulpCopy            = require('gulp-copy'),
  imagemin            = require('gulp-imagemin'),
  concat              = require('gulp-concat'),
  nunjucksRender      = require('gulp-nunjucks-render'),
  debug               = require('gulp-debug'),
  deepExtend          = require('deep-extend'),
  clip                = require('gulp-clip-empty-files'),
  uglify              = require('gulp-uglify'),
  rename              = require("gulp-rename");

const date = new Date();
const version = `${date.getDay()}${date.getMonth() + 1}${date.getYear()}${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}`;

let CONFIG = JSON.parse(fs.readFileSync('./src/config.json'));
let INDEX_CONFIG = JSON.parse(fs.readFileSync('./src/index.json'));

let mainIndexConfig = {}, eventsPageConfig = {}, childPagesConfig = {};

deepExtend(mainIndexConfig, CONFIG, INDEX_CONFIG, { version, pathToSrc: "", pathTmpl: 'src/tmpl/' });

/* delete 2 item in menu: mothodology for child pages */
INDEX_CONFIG.body.menuItems.splice(1, 1);
/* delete 2 item in menu: mothodology for child pages */

deepExtend(eventsPageConfig, INDEX_CONFIG, CONFIG, { version, pathToSrc: "../", pathTmpl: 'src/tmpl/' });
deepExtend(childPagesConfig, INDEX_CONFIG, CONFIG, { version, pathToSrc: "../../", pathTmpl: 'src/tmpl/' });

const lessTask = gulp.task('less', function () {
  return gulp.src('src/css/app.less')
    .pipe(less({
      plugins: [
        autoprefix,
        cleanCSSPlugin
      ],
      paths: [ path.join(__dirname, 'src') ]
    }))
    .pipe(gulp.dest('./public'));
});

const htmlMain = gulp.task('htmlMain', () =>
  gulp.src("src/app/index.html")
    .pipe(debug({title: 'unicorn:'}))
    .pipe(nunjucksRender({
      data: mainIndexConfig
    }))
    .pipe(clip())
    .pipe(gulp.dest("./public"))
);

const htmlEvents = gulp.task('htmlEvents', () =>
  gulp.src("src/app/events.html")
    .pipe(rename(function (path) {
      path.basename = "index";
    }))
    .pipe(debug({title: 'unicorn:'}))
    .pipe(nunjucksRender({
      data: eventsPageConfig
    }))
    .pipe(clip())
    .pipe(gulp.dest("./public/events"))
);

const htmlPages = gulp.task('htmlPages', () =>
  gulp.src("src/app/events/**.html", { base: 'src'})
    .pipe(rename(function (path) {
      console.log(path);
      path.dirname = `${path.basename}`;
      path.basename = "index";
    }))
    .pipe(debug({title: 'unicorn:'}))
    .pipe(nunjucksRender({
      data: childPagesConfig
    }))
    .pipe(clip())
    .pipe(gulp.dest("./public/events"))
);

const copeSeparateJs =
  gulp.task('copeSeparateJs', function (cb) {
    return gulp
      .src('src/js/separate/*.js')
      .pipe(gulp.dest('public/js/separate'));
  });

const uglifyJS =
  gulp.task('uglifyJS', function (cb) {
    pump([
        gulp.src('src/js/parts/*.js'),
        uglify({
          keep_fnames: true
        }),
        concat('joyoflife.min.js'),
        gulp.dest('public/js')
      ],
      cb
    );
  });

const uglifyJSForEvents =
  gulp.task('uglifyJSForEvents', function (cb) {
    pump([
        gulp.src('src/js/events/*.js'),
        concat('events.min.js'),
        gulp.dest('public/js')
      ],
      cb
    );
  });

const imgMin =
  gulp.task('imgMin', () =>
    gulp.src('src/img/howitwas/*')
      .pipe(imagemin())
      .pipe(gulp.dest('public/img/howitwas'))
  );

gulp.task('html', () => ([
  htmlMain,
  htmlEvents,
  htmlPages
]));

gulp.task('default', () => {
  gulp.watch('src/app/**/*.html', ['htmlMain']);
  gulp.watch('src/tmpl/**/*.html', ['htmlMain', 'htmlPages', 'htmlEvents']);
  // gulp.watch('src/app/events/**.html', ['htmlPages']);
  // gulp.watch('src/app/events.html', ['htmlEvents']);
  gulp.watch('src/css/app.less', ['less']);
  gulp.watch('src/js/separate/*.js', ['uglifyJSForEvents']);
  gulp.watch('src/js/events/*.js', ['uglifyJSForEvents']);
  gulp.watch('src/js/parts/*.js', ['uglifyJS']);
});
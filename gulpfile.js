const
  gulp = require('gulp'),
  less = require('gulp-less'),
  path = require('path'),
  LessAutoprefix = require('less-plugin-autoprefix'),
  autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] }),
  LessPluginCleanCSS = require('less-plugin-clean-css'),
  cleanCSSPlugin = new LessPluginCleanCSS({advanced: true}),
  nunjucks = require('gulp-nunjucks'),
  fs = require('fs'),
  rename = require("gulp-rename");

const date = new Date();
const version = `${date.getDay()}${date.getMonth() + 1}${date.getYear()}${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}`;

const CONFIG = JSON.parse(fs.readFileSync('./src/config.json'));
const INDEX_CONFIG = JSON.parse(fs.readFileSync('./src/index.json'));

let mainIndexConfig = Object.assign({},
  CONFIG, INDEX_CONFIG, { version, path: "" }
);

let childPagesConfig = Object.assign({},
  CONFIG, { version, path: "../../" }
);

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
    .pipe(nunjucks.compile(mainIndexConfig))
    .pipe(gulp.dest("./public"))
);

const htmlPages = gulp.task('htmlPages', () =>
  gulp.src("src/app/events/**.html")
    .pipe(rename(function (path) {
      path.dirname += `/events/${path.basename}`;
      path.basename = "index";
    }))
    .pipe(nunjucks.compile(childPagesConfig))
    .pipe(gulp.dest("./public"))
);

gulp.task('default', () => ([
  lessTask,
  htmlMain,
  htmlPages
]));
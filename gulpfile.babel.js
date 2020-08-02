import gulp from "gulp";
import gPug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-csso";

const routes = {
  pug: {
    watch: "src/**/*.puge",
    src: "src/*.pug",
    dest: "dist",
  },
  scss: {
    watch: "src/scss/*.scss",
    src: "src/scss/style.scss",
    dest: "dist/css",
  },
};

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.scss.watch, scss);
};

const clean = () => del(["dist"]);

const webserver = () =>
  gulp.src("dist").pipe(ws({ livereload: true, open: true }));

const pug = () =>
  gulp.src(routes.pug.src).pipe(gPug()).pipe(gulp.dest(routes.pug.dest));

const scss = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace",
        overrideBrowserslist: "last 2 versions",
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.scss.dest));

const prepare = gulp.series([clean]);
const assets = gulp.series([pug, scss]);
const live = gulp.series([webserver, watch]);

export const build = gulp.series([prepare, assets]);

export const dev = gulp.series([build, live]);

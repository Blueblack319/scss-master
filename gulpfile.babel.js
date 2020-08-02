import gulp from "gulp";
import gPug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";

const routes = {
  pug: {
    watch: "src/**/*.puge",
    src: "src/*.pug",
    dest: "dist",
  },
};

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
};

const clean = () => del(["dist"]);

const webserver = () =>
  gulp.src("dist").pipe(ws({ livereload: true, open: true }));

const pug = () =>
  gulp.src(routes.pug.src).pipe(gPug()).pipe(gulp.dest(routes.pug.dest));

const prepare = gulp.series([clean]);
const assets = gulp.series([pug]);
const live = gulp.series([webserver, watch]);

export const build = gulp.series([prepare, assets]);

export const dev = gulp.series([build, live]);

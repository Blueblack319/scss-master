import gulp from "gulp";
import gPug from "gulp-pug";
import del from "del";

const routes = {
  pug: {
    src: "src/*.pug",
    dest: "dist",
  },
};

const clean = () => del(["dist"]);

const pug = () =>
  gulp.src(routes.pug.src).pipe(gPug()).pipe(gulp.dest(routes.pug.dest));

export const dev = gulp.series([clean, pug]);

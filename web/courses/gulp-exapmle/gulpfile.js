var gulp = require("gulp");
var sass = require("gulp-sass");
var uglifycss = require("gulp-uglifycss");

gulp.task("sass", function() {
    return gulp
        .src("./sass/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./css"));
});

gulp.task("css", function() {
    return gulp
        .src("./css/*.css")
        .pipe(
            uglifycss({
                uglyComments: true
            })
        )
        .pipe(gulp.dest("./dist/"));
});

// needs to updated for v4 it should work on gulp v3
// gulp.task("run", gulp.series("sass", "css"));

// gulp.task("watch", function() {
//     gulp.watch("./sass/*.sass", ["sass"]);
//     gulp.watch("./css/*.css", ["css"]);
// });

// gulp.task("default", gulp.series("run", "watch"));

const {src, dest} = require('gulp'),
    gulp = require('gulp'),
    concat = require("gulp-concat"),
    browsersync = require("browser-sync").create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass')(require("sass")),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    squoosh = require('gulp-libsquoosh')

const paths = {
    build: {
        html: "./index.html",
        css: "./dist/css/",
        js: "./dist/js/",
        img: "./dist/img/",
    },
    src: {
        html: "./index.html",
        scss: "./src/**/*.scss",
        js: "./src/**/*.js",
        img: "./src/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: './dist'
}

function clean() {
    return del(paths.clean);
}

function css() {
    return src(paths.src.scss, {allowEmpty: true})
        .pipe(scss({outputStyle: "expanded"}))
        .pipe(concat("style.min.css"))
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(dest(paths.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(paths.src.js, {allowEmpty: true})
        .pipe(fileinclude())
        .pipe(uglify())
        .pipe(concat("script.min.js"))
        .pipe(dest(paths.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(paths.src.img, {allowEmpty: true})
        .pipe(squoosh())
        .pipe(dest(paths.build.img))
        .pipe(browsersync.stream())
}

let build = gulp.series(js, css);

function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./"
        },
        port: 3000,
        notify: false
    })
    gulp.watch(paths.src.scss, css).on("change", browsersync.reload)
    gulp.watch(paths.src.js, js).on("change", browsersync.reload)
    gulp.watch(paths.src.img, images).on("change", browsersync.reload)
    gulp.watch(paths.src.html, build).on("change", browsersync.reload)

}

gulp.task("default", gulp.series(clean,  gulp.parallel(build, images), browserSync))

const gulp      = require('gulp')
const babel     = require('gulp-babel')
const uglify    = require('gulp-uglify')
const cleancss  = require('gulp-clean-css')
const rename    = require('gulp-rename')
const concat    = require('gulp-concat')
const clean     = require('gulp-clean')
const umd       = require('gulp-umd')
const css2js    = require('gulp-css2js')
const merge2    = require('merge2')
const watch     = require('gulp-watch')
const rollup    = require('rollup')
const roBabel   = require('rollup-plugin-babel')
const commonjs  = require('rollup-plugin-commonjs')
const resolve   = require('rollup-plugin-node-resolve')
const pkgs      = require('./package.json')

const dest = gulp.dest


gulp.task('coDialog:clean', async function () {

    const _clean = await gulp
    .src('dist/*', { allowEmpty: true, read: false })
    .pipe(clean({force: true}))

    return _clean
})


var caches = {};
gulp.task('coDialog:js', async function(params) {

    const js = await rollup.rollup({
            input: 'src/index.js',
            plugins: [
                resolve({
                    extensions: [ '.mjs', '.js', '.ejs'],
                    browser: true,
                }),
                roBabel({
                    babelrc: true,
                    exclude: 'node_modules/**'
                }),
                commonjs()
            ]
        })

    await js.write({
        file: pkgs.main,
        format: 'umd',
        name: 'Coog',
        sourcemap: false,
        runtimeHelpers: true
    })
})


gulp.task('coDialog:css', async function (params) {

    const css = await gulp
        .src('src/css/co-dialog.css')
        .pipe(concat('co-dialog.css'))
        .pipe(dest('dist/'))
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(concat('co-dialog.min.css'))
        .pipe(dest('dist/'))

    return css
})



gulp.task('coDialog:build', async function (params) {

        // 把 rollup 编译之后生成的 co-dialog.js 文件压缩成 co-dialog.min.js 文件
        gulp.src('dist/co-dialog.js').pipe(uglify()).pipe(concat('co-dialog.min.js')).pipe(dest('dist/'))

        const all =  merge2(
            gulp.src('dist/co-dialog.js'),
            gulp.src('src/css/co-dialog.css').pipe(cleancss()).pipe(css2js())
        )

        return all
        .pipe(concat('co-dialog.all.js'))
        .pipe(dest('dist/'))
        .pipe(uglify())
        .pipe(concat('co-dialog.all.min.js'))
        .pipe(dest('dist/'))
})


const _paral = gulp.parallel('coDialog:js', 'coDialog:css')


gulp.task('default', gulp.series('coDialog:clean', _paral, function (done) {
    done()
}))


gulp.task('build', gulp.parallel('coDialog:build'), function (done) {
    done()
})
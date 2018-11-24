'use strict';

// open /Applications/LegoFlow.app/Contents/Resources/app/node_modules/gulp-modules/index.js

const fs = require('fs');
const path = require('path');
const del = require('del');
const gulp = require('gulp');
const fse = require('fs-extra');
const shell = require('shelljs');
const es = require('event-stream');
const dest = require('gulp-dest');
const inquirer = require('inquirer');
const replace = require('gulp-replace');

gulp.task('move', () => {
    return gulp.src(
        [
            'src/js/module/**/*.js',
            'src/js/module/**/*.ts',
        ]
    ).pipe(
        dest('src/js/export', { ext : '.js' })
    ).pipe(
        gulp.dest('.')
    );
});

gulp.task('clean', ( cb ) => {
    return del(['src/js/export/**/*.*', '!src/js/export/*.md'], cb);
});

gulp.task('export', () => {
    return gulp.src(
        [
            'src/js/module/**/*.js',
            'src/js/module/**/*.ts',
        ]
    ).pipe(
        gulp.dest('src/js/export')
    );
});

gulp.task('tsc', ['export'], () => {
    return gulp.src(
        [
            'src/js/export/**/*.ts',
        ]
    ).pipe(es.map(( file, cb ) => {
        shell.exec(`tsc ${ file.path } --module es2015 --t ESNext`);
        console.log(`compile success : ${ file.path }`);
        return del([file.path], cb);
    }));
});

gulp.task('replace', () => {
    return gulp.src(
        [
            'src/js/export/**/*.js',
        ]
    ).pipe(
        replace(/\/\*\*/g, '/*!')
    ).pipe(
        gulp.dest('src/js/export')
    );
});

gulp.task('build', ['clean'], ( cb ) => {
    let filepath = path.join(__dirname, '.legoflow');
    fse.ensureFileSync(filepath);
    let legoflow = fs.readFileSync(filepath, 'utf8').trim();
    if (legoflow.length) {
        let filepath = path.join(legoflow, '/Contents/Resources/app/node_modules/gulp-modules/index.js');
        fs.readFile(filepath, 'utf8', ( err, file ) => {
            if (err) {
                console.log(err);
                console.log(`文件不存在，请自行检查路径是否正确`);
                process.exit(0);
            }
            cb();
            inquirer.prompt({
                type : 'list',
                name : 'type',
                message : '请选择需要构建的版本',
                default : 'flow',
                choices : [
                    'flow',
                    'min',
                ],
            }).then(( answer ) => {
                let code = file.toString().replace(/comments\:\sfalse/, 'comments: /^!/');
                if (answer.type == 'flow') {
                    shell.exec(`gulp move`);
                    shell.exec(`gulp replace`);
                    fse.outputFileSync(filepath, code);
                } else {
                    shell.exec(`gulp tsc`);
                    shell.exec(`gulp replace`);
                    code = code.replace(/require.resolve\('babel-plugin-.*?\),$/mg, ( keyword ) => {
                        if (/remove-strict-mode/.test(keyword)) {
                            return keyword;
                        } else {
                            return '';
                        }
                    });
                    fse.outputFileSync(filepath, code);
                }
                console.log('请现在使用 LegoFlow 构建');
                inquirer.prompt({
                    type : 'confirm',
                    name : 'done',
                    message : '是否构建完成',
                    default : 'Y',
                }).then(() => {
                    fse.outputFileSync(filepath, file);
                    del.sync(['dist/js/sdk.js']);
                    if (answer.type == 'flow') {
                        fs.readdirSync(path.join(__dirname, 'dist/js')).forEach(( filename ) => {
                            if (/\.min\.js$/.test(filename)) {
                                fse.moveSync(
                                    path.join(__dirname, 'dist/js', filename),
                                    path.join(__dirname, 'dist/js', filename.replace('.min.', '.'))
                                );
                            }
                        });
                    }
                    fs.readdirSync(path.join(__dirname, 'dist/js')).forEach(( filename ) => {
                        fse.moveSync(
                            path.join(__dirname, 'dist/js', filename),
                            path.join(__dirname, 'dest/js', filename)
                        );
                    });
                });
            });
        });
    } else {
        console.log('LegoFlow 不存在');
        cb();
        inquirer.prompt({
            type : 'input',
            name : 'legoflow',
            message : '请把 LegoFlow 拖入控制台，并输入回车',
        }).then(( answer ) => {
            let filepath = path.join(__dirname, '.legoflow');
            fse.ensureFileSync(filepath);
            fs.writeFileSync(filepath, answer.legoflow, 'utf8');
            console.log('保存成功!');
            shell.exec(`gulp build`);
        });
    }
});

gulp.task('default', ['clean'], () => {
    shell.exec(`gulp move`);
    gulp.watch('src/js/module/**/*.js', ['move']);
    gulp.watch('src/js/module/**/*.ts', ['move']);
});

// const {task, series, watch, dest, src, parallel} = require('gulp');
const gulp = require('gulp');
const clean = require('gulp-clean');
const type = require('gulp-typescript');

//Gulp serve para automatizar tarefas repetitivas, neste caso serão as tarefas para conversão dos arquivos .ts em .js.
//será implementado tambem uma tarefa para olhar se houve modificações no código fonte para conversão dos arquivos .ts automaticamente.

const tsProject = type.createProject('tsconfig.json');//ler as config para o ts

gulp.task('clean', () => {//tarefa para limpar a pasta dist.
    return gulp.src(['dist'], { allowEmpty: true }).pipe(clean());
});

gulp.task('static', gulp.series('clean', () => {//obs: antes de rodar essa tarefa é rodado primeiramente a tarefa clean.
    return gulp.src(['src/**/*.json']).pipe(gulp.dest('dist'));//copiar os arquivos estaticos no diretorio src para o diretorio dist
}));

gulp.task('scripts', gulp.series('static', () => {//obs: antes de rodar essa tarefa é rodado primeiro a tarefa static.
    const tsResult = tsProject.src().pipe(tsProject());//pegando o código ts para compilar
    return tsResult.js.pipe(gulp.dest('dist'));// acessar o javascript gerado e armazenar no diretorio dist
}));

gulp.task('build', gulp.series('scripts'));//criação da tarefa build que ira rodar em serie as tarefas anteriores

gulp.task('watch', gulp.series('build', () => {//obs: antes de rodar watch, é rodado primeiramente a tarefa build.
    return gulp.watch(['src/**/*.ts', 'src/**/*.json'], gulp.series('build'));//tarefa que ira ouvir os arquivos .ts e .json e automaticamente rodar a tarefa build.
}));

gulp.task('default', gulp.series('watch'));//tarefa padrão que ao ser chamada ira chamar a tarefa watch
//para rodar basta digitar no terminal: node_modules/.bin/gulp


/***
 * Paralelamente a execução do gulp terá o nodemon executando para ouvir mudanças no servidor.
 */

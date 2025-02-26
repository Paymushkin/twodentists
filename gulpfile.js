// импорт основного модуля
import gulp from 'gulp'

// имрорт путей
import { path } from "./gulp/config/path.js"

// имрорт плагинов
import { plugins } from "./gulp/config/plugins.js"

// передаем значения в глобальную переменную
global.app = {
    isBuild: process.argv.includes("--build"),
    isDev: !process.argv.includes("--build"),
    path: path,
    gulp: gulp,
    plugins: plugins,
}

// импортируем задачи
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, copyWoff2, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";

// наблюдатель за изменением файлов
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, copyWoff2, fontsStyle)

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images, svgSprive));

// построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks)

// Экспорт сценариев
export { svgSprive }
export { dev }
export { build }

// выполняем сценарии по умолчанию
gulp.task('default', dev);
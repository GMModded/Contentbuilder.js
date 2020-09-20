/**
 * Requiring and making an instance of GulpClass.
 */
const GulpClass = require("./Gulp/Gulp.js");
const GulpInstance = new GulpClass;

/**
 * Configuring the GulpInstance - adding sources.
 */
GulpInstance.addSource("build", "./");
GulpInstance.addSource("input", "./Assets/");
GulpInstance.addSource("output", "./../public/");
GulpInstance.addSource("nodeModules", "./node_modules/");
GulpInstance.addSource("fileName", "contentbuilder.min");
GulpInstance.addSource("packages", "./Packages/");

/**
 * Adding required node_modules.
 */
GulpInstance.addNodeModule("jquery/dist/jquery.min.js");
GulpInstance.addPackage("jquery-ui/jquery-ui.min.js");
GulpInstance.addNodeModule("node-waves/dist/waves.min.js");
GulpInstance.addNodeModule("quill/dist/quill.min.js");


/**
 * Build and Deploy Tasks for CSS / JS.
 */
let gulp = GulpInstance.gulp;

const ScssTaskClass = require("./Gulp/Tasks/ScssTask.js");
const JsTaskClass = require("./Gulp/Tasks/JsTask.js");

const ScssTask = GulpInstance.makeInstance(ScssTaskClass, GulpInstance);
const JsTask = GulpInstance.makeInstance(JsTaskClass, GulpInstance);

gulp.task("css:build", ScssTask.call("build"));
gulp.task("js:build", JsTask.call("build"));

gulp.task("css:deploy", ScssTask.call("deploy"));
gulp.task("js:deploy", JsTask.call("deploy"));


/**
 * Watch-Task Configuration - Build and Deploy.
 */
gulp.task("watch:build:task", () => {
	gulp.watch(GulpInstance.getSource("input", "scss/**/*.scss"), gulp.series("css:build"));
	gulp.watch(GulpInstance.getSource("input", "js/**/*.js"), gulp.series("js:build"));
});

gulp.task("watch:build", gulp.series("css:build", "js:build",
	gulp.parallel("watch:build:task")
));

gulp.task("build", gulp.series("watch:build"));

gulp.task("deploy", gulp.series("css:deploy", "js:deploy"));

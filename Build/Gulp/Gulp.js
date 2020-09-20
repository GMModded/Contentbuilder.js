module.exports = class Gulp
{
    /**
     * This constructor is to hold the gulpfile.js clean and separate everything to have a better overview of everything.
     * 
     * @returns {void}
     */
    constructor()
    {
        this.gulp = require("gulp");
        this.sass = require("gulp-sass");
        this.concat = require("gulp-concat");
        this.terser = require("gulp-terser-js");
        this.minify = require("gulp-minify-css");
        this.rev = require("gulp-rev");
        this.del = require("del");
        this.rename = require("gulp-rename");

        this.sources = [];

        this.fileName = null;

        this.nodeModulesPath = null;
        this.node_modules = [];

        this.packages = [];
    }

    /**
     * Makes an instance of the given classname with optionally params and returns it.
     * 
     * @param {class} classname The classname an instance which will be returned then.
     * @param {object} params Optional. If your classname requires params, it can be provided here to it.
     * 
     * @returns {void}
     */
    makeInstance = (classname, params = null) => new classname(params);

    /**
     * Adds a source-path to an array of sources - retrievable using this.getSource(identifier).
     * Useful for setting a path to e.g. the Build-directory as an input-source path and retrieving
     * it inside a custom e.g. ScssTask.
     * 
     * @param {string} identifier This will be the key used for this.sources.
     * @param {*} source Path of the given identifier's source.
     * 
     * @returns {void}
     */
    addSource = (identifier, source) => this.sources[identifier] = source;

    /**
     * 
     * 
     * @param {string} identifier Identifier which has been used when registered the source itself.
     * @param {*} path Optional. If given, it will simply combined to the source's path + given path.
     * 
     * @returns {void}
     */
    getSource = (identifier, path = "") => (path == "") ? this.sources[identifier] : this.sources[identifier] + path;

    /**
     * Adds a path to this node_modules-array.
     * When compiling, it'll be used inside the JsTask-class and will be additionally compiled into your minified this.fileName.js-file.
     * Note that those node_modules are placed BEFORE your entire .js-code.
     * 
     * @param {string} nodeModule Path to an e.g. node_module .js-file.
     * 
     * @returns {void}
     */
    addNodeModule = (nodeModule) => this.node_modules.push(nodeModule);

    /**
     * Gets all added node_modules which has been registered using this.addNodeModule function.
     * 
     * @returns {array}
     */
    getNodeModules = () => {
        let nodeModulesPath = this.getSource("nodeModules");
        let nodeModules = this.node_modules;

        nodeModules.forEach((nodeModule, i) => {
            if(nodeModules[i].substring(0, nodeModulesPath.length) != nodeModulesPath) {
                nodeModules[i] = nodeModulesPath + nodeModule;
            }
        });

        return nodeModules;
    }

    /**
     * Adds a path to this packages-array.
     * When compiling, it can be used inside the any Task-class and will be additionally compiled into your minified this.fileName.js-file.
     * Note that those packages are placed BEFORE your entire minified-file-code.
     * 
     * @param {string} packageName Path to a package.
     * 
     * @returns {void}
     */
    addPackage = (packageName) => this.packages.push(packageName);

    /**
     * Gets all added packages which has been registered using this.addPackage function.
     * 
     * @returns {array}
     */
    getPackages = () => {
        let packagesPath = this.getSource("packages");
        let packages = this.packages;

        packages.forEach((packageName, i) => {
            if(packages[i].substring(0, packagesPath.length) != packagesPath) {
                packages[i] = packagesPath + packageName;
            }
        });

        return packages;
    }
};

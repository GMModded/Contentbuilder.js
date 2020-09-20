module.exports = class DefaultTask
{
    constructor(Gulp)
    {
        if(Gulp != undefined) {
            this.GulpInstance = Gulp;
            this.Gulp = this.GulpInstance.gulp;
        }
    }

    action = (action, options = {}) => {
        if(this.strContains(action, "-")) {
            let splittedAction = action.split("-");

            let type = splittedAction[0];
                action = splittedAction[1];

            if(type == "sass") {
                type = "css";

                if(action == "minify") {
                    return this.GulpInstance.minify(options);
                }
            }

            if(type == "js") {
                if(action == "terser") {
                    return this.GulpInstance.terser({
                        mangle: {
                            toplevel: true
                        }
                    }).on("error", (error) => this.emit("end"));
                }
            }

            if(action == "concat") {
                return this.GulpInstance.concat(this.GulpInstance.getSource("fileName", "." + type));
            }

            if(action == "dest") {
                return this.Gulp.dest(this.GulpInstance.getSource("output", type));
            }

            if(action == "del") {
                return this.GulpInstance.del([
                    this.GulpInstance.getSource("output", type + "/*." + type)
                ], {
                    force: true
                });
            }
        } else {
            if(action == "sass") {
                return this.GulpInstance.sass(options);
            }
        }
    }

    /**
     * Checks if a string contains a specific (given) char.
     * 
     * @param {string} string
     * @param {string} char
     * 
     * @return {boolean}
     */
    strContains = (string, char) => (!!~string.indexOf(char));
}

const DefaultTask = require("./DefaultTask");

module.exports = class ScssTask extends DefaultTask
{
    constructor(Gulp)
    {
        super(Gulp);

        this.buildSassOpts = {
            errLogToConsole: true,
            processImport: true
        };

        this.deploySassOpts = {
            outputStyle: "compressed",
            errLogToConsole: true,
            processImport: true
        };
    }

    call = (type) => {
        return this[type];
    }

    clean = () => {
        this.action("sass-del");
    }

    build = () => {
        this.clean();

        return this.Gulp.src(
            this.GulpInstance.getSource("input", "scss/main.scss")
        )

        .pipe(this.action("sass", this.buildSassOpts))
        .pipe(this.action("sass-concat"))
        .pipe(this.action("sass-minify"), this.buildSassOpts)
        .pipe(this.action("sass-dest"));
    }

    deploy = () => {
        this.clean();

        return this.Gulp.src(
            this.GulpInstance.getSource("input", "scss/main.scss")
        )

        .pipe(this.action("sass", this.deploySassOpts))
        .pipe(this.action("sass-concat"))
        .pipe(this.action("sass-minify"), this.buildSassOpts)
        .pipe(this.action("sass-dest"));
    }
};

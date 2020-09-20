const DefaultTask = require("./DefaultTask");

module.exports = class JsTask extends DefaultTask
{
    constructor(Gulp)
    {
        super(Gulp);
    }

    call = (type) => {
        return this[type];
    }

    clean = () => {
        this.action("js-del");
    }

    build = () => {
        this.clean();

        return this.Gulp.src(
            Array.prototype.concat(
                this.GulpInstance.getNodeModules(),
                this.GulpInstance.getPackages(),
                this.GulpInstance.getSource("input", "js/**/*.js")
            )
        )

        .pipe(this.action("js-concat"))
        .pipe(this.action("js-dest"));
    }

    deploy = () => {
        this.clean();

        return this.Gulp.src(
            Array.prototype.concat(
                this.GulpInstance.getNodeModules(),
                this.GulpInstance.getPackages(),
                this.GulpInstance.getSource("input", "js/**/*.js")
            )
        )
            .pipe(this.action("js-concat"))
            .pipe(this.action("js-terser"))
            .pipe(this.action("js-dest"));
        ;
    }
};

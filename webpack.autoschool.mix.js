const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
require("laravel-mix-purgecss");

// AUTOSCHOOL
mix
.copy("resources/autoschool/images/*", "public/autoschool/images")
.copy("resources/autoschool/fonts/*", "public/autoschool/fonts")
.js("resources/autoschool/js/app.js", "public/autoschool/js")
.sass("resources/autoschool/sass/app.scss", "public/autoschool/css")
.version()
.options({
            autoprefixer: false,
            processCssUrls: false,
            postCss: [tailwindcss("./tailwind.config.js")],
            autoprefixer: {
                browsers: ["last 9 versions"]
            }
        })
.browserSync({
            proxy: "autoschool.vskidke.local",
            open: false
        });
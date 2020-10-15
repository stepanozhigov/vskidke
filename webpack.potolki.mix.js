const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
require("laravel-mix-purgecss");

// POTOLKI
mix
.copy("resources/potolki/images/*", "public/potolki/images")
.copy("resources/potolki/fonts/*", "public/potolki/fonts")
.js("resources/potolki/js/app.js", "public/potolki/js")
.sass("resources/potolki/sass/app.scss", "public/potolki/css")
.version()
.options({
            //autoprefixer: false,
            processCssUrls: false,
            // postCss: [tailwindcss("./tailwind.config.js")],
            // autoprefixer: {
            //     browsers: ["last 9 versions"]
            // }
        })

.browserSync({
            proxy: "potolki.vskidke.local",
            open: false
        });

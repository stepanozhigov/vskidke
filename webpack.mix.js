const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
require("laravel-mix-purgecss");

// mix.js("resources/js/app.js", "public/js")
//     .sass("resources/sass/app.scss", "public/css")
//     .options({
//         //autoprefixer: false,
//         processCssUrls: false,
//         postCss: [tailwindcss("./tailwind.config.js")],
//         autoprefixer: {
//             browsers: ["last 9 versions"]
//         }
//     })
//     .purgeCss({
//     enabled: true
//     })
//     .version()
//     .copy("resources/images/*", "public/images")
//     .copy("resources/fonts/*", "public/fonts")
//     .browserSync({
//         proxy: "lmr.vskidke.local",
//         open: false
//     });


// AUTOSCHOOL
mix
.js("resources/autoschool/js/app.js", "public/autoschool/js")
.sass("resources/autoschool/sass/app.scss", "public/autoschool/css")
.options({
            autoprefixer: false,
            processCssUrls: false,
            postCss: [tailwindcss("./tailwind.config.js")],
            autoprefixer: {
                browsers: ["last 9 versions"]
            }
        })
.version()
.browserSync({
            proxy: "autoschool.vskidke.local",
            open: false
        });

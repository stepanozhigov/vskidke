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
.copy("resources/autoschool/images/*", "public/autoschool/images")
.copy("resources/autoschool/fonts/*", "public/autoschool/fonts")
.js("resources/autoschool/js/app.js", "public/autoschool/js")
.sass("resources/autoschool/sass/app.scss", "public/autoschool/css")
.options({
            autoprefixer: false,
            processCssUrls: false,
            postCss: [tailwindcss("./tailwind.autoschool.config.js")],
            autoprefixer: {
                browsers: ["last 9 versions"]
            }
        })

.browserSync({
            proxy: "autoschool.vskidke.local",
            open: false
        });

        if (mix.inProduction()) {
            mix.version();
        }

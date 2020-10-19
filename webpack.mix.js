const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
require("laravel-mix-purgecss");


//AUTOSCHOOL
mix
    //.copy("resources/autoschool/images/*", "public/autoschool/images")
    //.copy("resources/autoschool/fonts/*", "public/autoschool/fonts")
    .js("resources/autoschool/js/app.js", "public/autoschool/js")
    .sass("resources/autoschool/sass/app.scss", "public/autoschool/css")
    .options({
        autoprefixer: false,
        processCssUrls: false,
        postCss: [tailwindcss("./tailwind.autoschool.config.js")],
        autoprefixer: {
            browsers: ["last 9 versions"]
        }
    });
    // .browserSync({
    //     proxy: "autoschool.vskidke.local",
    //     open: false
    // });



// POTOLKI
mix
    //.copy("resources/potolki/images/", "public/potolki/images/")
    //.copy("resources/potolki/fonts/", "public/potolki/fonts/")
    .js("resources/potolki/js/potolki.js", "public/potolki/js")
    .sass("resources/potolki/scss/app.scss", "public/potolki/css")
    .options({
        processCssUrls: false
    });

//ROMATTI
mix
    //.copy("resources/potolki/images/", "public/potolki/images/")
    //.copy("resources/potolki/fonts/", "public/potolki/fonts/")
    .js("resources/romatti/js/app.js", "public/romatti/js")
    .sass("resources/romatti/scss/app.scss", "public/romatti/css")
    .options({
        autoprefixer: false,
        processCssUrls: false,
        postCss: [tailwindcss("./tailwind.config.js")],
        autoprefixer: {
            browsers: ["last 9 versions"]
        }
    });

mix.browserSync({
    proxy: "romatti.vskidke.local",
    open: false
});


if (mix.inProduction()) {
    mix.version();
}

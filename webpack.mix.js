const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
require("laravel-mix-purgecss");


//AUTOSCHOOL
mix
    //.copy("resources/autoschool/images/*", "public/autoschool/images")
    //.copy("resources/autoschool/fonts/*", "public/autoschool/fonts")
    //.js("resources/autoschool/js/app.js", "public/autoschool/js")
    //.sass("resources/autoschool/sass/app.scss", "public/autoschool/css",
    //{},[tailwindcss("./tailwind.autoschool.config.js")])
    
// POTOLKI
mix
    //.copy("resources/potolki/images/", "public/potolki/images/")
    //.copy("resources/potolki/fonts/", "public/potolki/fonts/")
    // .js("resources/potolki/js/potolki.js", "public/potolki/js")
    // .sass("resources/potolki/scss/app.scss", "public/potolki/css")

//ROMATTI
mix
    //.copy("resources/romatti/images/", "public/romatti/images/")
    //.copy("resources/romatti/fonts/", "public/romatti/fonts/")
    // .js("resources/romatti/js/app.js", "public/romatti/js",)
    // .sass("resources/romatti/scss/app.scss", "public/romatti/css",
    // {},[tailwindcss("./tailwind.romatti.config.js")])

//ZAMANIA
mix
//.copy("resources/zamania/images/", "public/zamania/images/")
//.copy("resources/zamania/fonts/", "public/zamania/fonts/")
// .js("resources/zamania/js/app.js", "public/zamania/js")
// .sass("resources/zamania/scss/app.scss", "public/zamania/css",
// {},[tailwindcss("./tailwind.zamania.config.js")])

//UPPERLICENSE
mix
//.copy("resources/zamania/images/", "public/zamania/images/")
//.copy("resources/zamania/fonts/", "public/zamania/fonts/")
.js("resources/upperlicense/js/app.js", "public/upperlicense/js")
.sass("resources/upperlicense/scss/app.scss", "public/upperlicense/css",
{},[tailwindcss("./tailwind.config.js")])


.options({
    autoprefixer: false,
    processCssUrls: false,
    autoprefixer: {
        browsers: ["last 9 versions"]
    }
});

mix.browserSync({
    proxy: "upperlicense.vskidke.local",
    open: false
});


if (mix.inProduction()) {
    mix.version();
}

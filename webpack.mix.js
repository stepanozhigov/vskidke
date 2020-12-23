const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
require("laravel-mix-purgecss");


//AUTOSCHOOL

//mix
    //.copy("resources/autoschool/images/*", "public/autoschool/images")
    //.copy("resources/autoschool/fonts/*", "public/autoschool/fonts")
    // .js("resources/autoschool/js/app.js", "public/autoschool/js")
    // .sass("resources/autoschool/sass/app.scss", "public/autoschool/css",
    // {},[tailwindcss("./tailwind.autoschool.config.js")])
    
// POTOLKI
//mix
    //.copy("resources/potolki/images/", "public/potolki/images/")
    //.copy("resources/potolki/fonts/", "public/potolki/fonts/")
    //.js("resources/potolki/js/potolki.js", "public/potolki/js")
    //.sass("resources/potolki/scss/app.scss", "public/potolki/css")

//ROMATTI

mix
    //.copy("resources/romatti/images/", "public/romatti/images/")
    //.copy("resources/romatti/fonts/", "public/romatti/fonts/")
    // .js("resources/romatti/js/app.js", "public/romatti/js");
    //.sass("resources/romatti/scss/app.scss", "public/romatti/css",
    //{},[tailwindcss("./tailwind.romatti.config.js")])

//ZAMANIA

//mix
//.copy("resources/zamania/images/", "public/zamania/images/")
//.copy("resources/zamania/fonts/", "public/zamania/fonts/")
// .js("resources/zamania/js/app.js", "public/zamania/js")
// .sass("resources/zamania/scss/app.scss", "public/zamania/css",
// {},[tailwindcss("./tailwind.zamania.config.js")])

//UPPERLICENSE

// mix
//.copy("resources/zamania/images/", "public/zamania/images/")
//.copy("resources/zamania/fonts/", "public/zamania/fonts/")
// .js("resources/upperlicense/js/app.js", "public/upperlicense/js")
// .sass("resources/upperlicense/scss/app.scss", "public/upperlicense/css",
// {},[tailwindcss("./tailwind.upperlicense.config.js")])

//KORONATEH

//mix
//.copy("resources/koronateh/images/", "public/koronateh/images/")
//.copy("resources/koronateh/fonts/", "public/koronateh/fonts/")
// .js("resources/koronateh/js/app.js", "public/koronateh/js")
// .sass("resources/koronateh/scss/app.scss", "public/koronateh/css",
// {},[tailwindcss("./tailwind.koronateh.config.js")])

//vsya-nedvizhimost (local: vsyanedvizhimost.local)

//mix
//.copy("resources/vsyanedvizhimost/images/", "public/vsyanedvizhimost/images/")
// .js("resources/vsyanedvizhimost/js/app.js", "public/vsyanedvizhimost/js")
// .sass("resources/vsyanedvizhimost/scss/app.scss", "public/vsyanedvizhimost/css",
// {},[tailwindcss("./tailwind.vsyanedvizhimost.config.js")])

//ekonompotolok (local: econom.vskidke.local)
// mix
// .options({
//     processCssUrls: false,
//     autoprefixer: {
//         browsers: ["last 20 versions"]
//     }
// })
// .sourceMaps()
// .webpackConfig({devtool: 'source-map'})
// .copy("resources/ekonompotolok/images/", "public/ekonompotolok/images/")
// .js("resources/ekonompotolok/js/app.js", "public/ekonompotolok/js")
// .sass("resources/ekonompotolok/scss/app.scss", "public/ekonompotolok/css")

// mix.browserSync({
//     proxy: "localhost",
//     open: false
// });

// if (mix.inProduction()) {
//     mix.version();
// }

//beflight (local: beflight.vskidke.local)
// mix
// .options({
//     processCssUrls: false,
//     autoprefixer: {
//         browsers: ["last 20 versions"]
//     }
// })

// .sourceMaps()
// .webpackConfig({devtool: 'source-map'})
// .js("resources/beflight/js/app.js", "public/beflight/js")
// .sass("resources/beflight/scss/app.scss", "public/beflight/css")


//mg (local: mg.vskidke.local)
mix
.options({
    processCssUrls: false,
    autoprefixer: {
        browsers: ["last 20 versions"]
    }
})

.sourceMaps()
.webpackConfig({devtool: 'source-map'})
.js("resources/mg/js/app.js", "public/mg/js")
.sass("resources/mg/scss/app.scss", "public/mg/css")

//redzoloto.vskidke.ru (local: redzoloto.vskidke.local)
// mix
// .options({
//     processCssUrls: false,
//     autoprefixer: {
//         browsers: ["last 20 versions"]
//     }
// })

// .sourceMaps()
// .webpackConfig({devtool: 'source-map'})
// .js("resources/redzoloto/js/app.js", "public/redzoloto/js")
//.sass("resources/redzoloto/scss/app.scss", "public/redzoloto/css")


//romatti2.vskidke.ru (local: romatti2.vskidke.local)
// mix
// .options({
//     processCssUrls: false,
//     autoprefixer: {
//         browsers: ["last 20 versions"]
//     }
// })

// .sourceMaps()
// .webpackConfig({devtool: 'source-map'})
// .js("resources/romatti2/js/app.js", "public/romatti2/js")
// .sass("resources/romatti2/scss/app.scss", "public/romatti2/css")


mix.browserSync({
    proxy: "mg.vskidke.local",
    open: false
});

if (mix.inProduction()) {
    mix.version();
}

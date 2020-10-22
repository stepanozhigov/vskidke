//
//ROMATTI
//
module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: [
        "resources/romatti/js/*.vue",
        "resources/romatti/js/components/*.vue",
        "resources/romatti/sass/*.scss",
        "resources/romatti/views/layouts/*"
    ],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter"],
                suisseIntl: ["SuisseIntl"]
            },
            height: {
                mobilescreen: "calc(var(--vh)*100)"
            },
            colors: {
                
            }
        }
    },
    variants: {},
    plugins: []
};

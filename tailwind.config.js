//
//  ZAMANIA
//
module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: [
        "resources/zamania/js/*.vue",
        "resources/zamania/js/components/*.vue",
        "resources/zamania/sass/*.scss",
        "resources/zamania/views/layouts/*"
    ],
    theme: {
        extend: {
            screens: {
                'phone': '360px',
                'tablet': '480px',
                'laptop': '768px',
                'display': '1024px'
            },
            fontFamily: {
                shadow: ["Shadow"],
                montserrat: ["Montserrat"]
            },
            height: {
                mobilescreen: "calc(var(--vh)*100)"
            },
            colors: {
                cwhite: "#ffffff",
                phone: '#2a2928',
                cyellow: '#fdc035',
                textwhite: '#f8f7f6',
                textmute: '#dbd9d7',
                placeholder: '#a7a5a0',
                inputborder: '#dbd9d7',
            }
        }
    },
    variants: {},
    plugins: []
};

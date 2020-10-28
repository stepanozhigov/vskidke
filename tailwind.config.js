//
//KORONATEH
//
module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: [
        "resources/koronateh/js/*.vue",
        "resources/koronateh/js/components/*.vue",
        "resources/koronateh/sass/*.scss",
        "resources/koronateh/views/layouts/*"
    ],
    theme: {
        screens: {
            'phone': '360px',
            'tablet': '768px',
            'monitor': '1024px'
        },
        extend: {
            fontFamily: {
                roboto: ["Roboto"]
            },
            height: {
                mobilescreen: "calc(var(--vh)*100)"
            },
            colors: {
                'bg': '#ffffff',
                'whitetext': '#f8f7f6',
                'darktext': '#2a2928',
                'cyellow': '#f39c12',
                'placeholder': '#a7a5a0',
                'greytext': '#dbd9d7',
                'bottomborder': '#d7dbd8'
            }
        }
    },
    variants: {},
    plugins: []
};

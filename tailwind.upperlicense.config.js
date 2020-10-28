//
//UPPERLICENSE
//
module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: [
        "resources/upperlicense/js/*.vue",
        "resources/upperlicense/js/components/*.vue",
        "resources/upperlicense/sass/*.scss",
        "resources/upperlicense/views/layouts/*"
    ],
    theme: {
        screens: {
            'phone': '360px',
            'tablet': '768px',
            'monitor': '1024px'
        },
        extend: {
            fontFamily: {
                suisseintl: ["SuisseIntl"]
            },
            height: {
                mobilescreen: "calc(var(--vh)*100)"
            },
            colors: {
                'bg': '#ffffff',
                'whitetext': '#f6f8f6',
                'darktext': '#0e1410',
                'greentext': '#4f7359',
                'placeholder': '#b3adae',
                'greytext': '#a0a7a2',
                'bottomborder': '#d7dbd8'
            }
        }
    },
    variants: {},
    plugins: []
};

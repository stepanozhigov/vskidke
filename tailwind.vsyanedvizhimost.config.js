//
//vsyanedvizhimost (вся-недвижимость.рус)
//
module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: [
        "resources/vsyanedvizhimost/js/*.vue",
        "resources/vsyanedvizhimost/js/components/*.vue",
        "resources/vsyanedvizhimost/sass/*.scss",
        "resources/vsyanedvizhimost/views/layouts/*"
    ],
    theme: {
        screens: {
            'phone': '375px',
            'tablet': '768px',
            'monitor': '1024px'
        },
        extend: {
            fontFamily: {
                raleway: ["Raleway"]
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
                'bottomborder': '#d7dbd8',
                'greytext01': '#66605a'

            }
        }
    },
    variants: {},
    plugins: []
};

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
                raleway: ["Raleway"],
                lato: ["Lato"],
                roboto: ["Roboto"]
            },
            height: {
                mobilescreen: "calc(var(--vh)*100)"
            },
            colors: {
                'bg': '#ffffff',
                'whitetext': '#f8f9f9',
                'bluetext': '#30d0f0',
                'phonetext': '#374043',
                'placeholder': '#a5b5b9',
                'disclaimer': '#eaeeee',
                'close': '#5e6f72'


            }
        }
    },
    variants: {},
    plugins: []
};

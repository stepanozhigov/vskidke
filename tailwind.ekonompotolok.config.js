//
//ekonompotolok ()
//
module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: [
        "resources/ekonompotolok/js/*.vue",
        "resources/ekonompotolok/js/components/*.vue",
        "resources/ekonompotolok/sass/*.scss",
        "resources/ekonompotolok/views/layouts/*"
    ],
    theme: {
        screens: {
            'phone': '375px',
            'tablet': '768px',
            'monitor': '1024px'
        },
        extend: {
            fontFamily: {
                jost: ["Jost"],
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

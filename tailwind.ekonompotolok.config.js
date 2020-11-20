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
                'lightblue': "#cdeeff",
                'orange': '#fe9800',
                
            }
        }
    },
    variants: {},
    plugins: []
};

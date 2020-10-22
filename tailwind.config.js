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
        screens: {
            'smphone': '320px',
            'mdphone': '360px',
            'lgphone' : '410px',
            'tablet': '480px',
            'laptop': '768px',
            'monitor': '1024px'
        },
        extend: {
            fontFamily: {
                montserrat: ["Montserrat"]
            },
            height: {
                mobilescreen: "calc(var(--vh)*100)"
            },
            colors: {
                'bg': '#ffffff',
                'blacktext': '#2a2928',
                'yellowtext': '#ffdd2d',
                'whitetext': '#f8f7f6',
                'placeholder': '#a7a5a0',
                'graytext': '#dbd9d7'

            }
        }
    },
    variants: {},
    plugins: []
};

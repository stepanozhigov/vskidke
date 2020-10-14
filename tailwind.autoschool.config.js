module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: [
        "resources/js/*.vue",
        "resources/js/components/*.vue",
        "resources/sass/*.scss",
        "views/layouts/*"
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
                bg: "#ffffff",
                cred: "#dc1414",
                cgray1: "#babec2",
                cgray2: "#6b6b6b",
                cgray3: "#485058",
                cgray4: "#808890"
            }
        }
    },
    variants: {},
    plugins: []
};

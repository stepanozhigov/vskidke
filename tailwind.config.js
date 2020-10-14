module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: [
        "resources/autoschool/js/*.vue",
        "resources/autoschool/js/components/*.vue",
        "resources/autoschool/sass/*.scss",
        "views/autoschool/layouts/*"
    ],
    theme: {
        fontFamily: {
            manrope: ["Manrope"],
            suisseIntl: ["SuisseIntl"]
        },
        height: theme => ({
            auto: "auto",
            ...theme("spacing"),
            full: "100%",
            screen: "calc(var(--vh)*100)"
        }),
        inset: {
            1: "1rem"
        },
        extend: {
            colors: {
                cwhite: "#f8f7f6",
                cwhite1: "#faf9f8",
                cblack: "#14120e",
                cbrown: "#b39059",
                cgray: "#b3adae",
                cbright: "#ffffff",
                cdark: "#66615a",
                bg: "#ffffff",
                shadow: "#dbdad7",
                clightgray: "#14120e",
                formborder: "#bbb"
            }
        }
    },
    variants: {},
    plugins: [],
    corePlugins: {
        inset: true
    }
};

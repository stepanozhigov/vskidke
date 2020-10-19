module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: [
        "resources/romatti/js/*.vue",
        "resources/romatti/js/components/*.vue",
        "resources/romatti/sass/*.scss",
        "romatti/views/layouts/*"
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
                phonenumber: "#2a2928",
                modalclose: "#66605a",
                inpuborder: "#dbd9d7",
                cblack: "#14120e",
                cwhite: "#f8f7f6",
                cred: "#c10327",
                cgray1: "#b3adae",
                cgray2: "#6b6b6b",
                cgray3: "#485058",
                cgray4: "#808890",
                cfooter: "#a7a5a0"
            }
        }
    },
    variants: {},
    plugins: []
};

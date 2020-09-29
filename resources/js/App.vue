<template>
    <div class="app-template"></div>
</template>
<script>
export default {
    name: "App",
    data: () => ({}),
    mounted: function() {
        this.setViewHeight();
        window.addEventListener("resize", () => {
            this.setViewHeight();
        });
    },
    methods: {
        setViewHeight: function() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
            //console.log(vh);
        }
    }
};
</script>

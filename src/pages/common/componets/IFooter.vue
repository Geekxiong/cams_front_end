<template>
    <Footer class="layout-footer-center">
        {{ text }}
    </Footer>
</template>

<script>
    export default {
        name: "IFooter",
        data() {
            return {
                text: "2020-2020 © 19MITXWB"
            };
        }
    };
</script>

<style scoped>
    .layout-footer-center {
        text-align: center;
    }
</style>

<template>
    <div class="layout">
        <Layout>
            <Header class="layout-header">
                <Nav/>
            </Header>
            <Content :style="{padding: '15px 50px'}">
                <Card style="min-height: 200px;">
                    <router-view/>
                </Card>
            </Content>
            <IFooter/>
        </Layout>
    </div>
</template>

<script>
    import Nav from "@/pages/student/components/Nav";
    import IFooter from "@/pages/common/componets/IFooter";

    export default {
        name: "Index",
        components: {
            IFooter,
            Nav
        }
    };
</script>

<style scoped>

    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-header {
        padding: 0 0px;
        background-color: transparent;
    }
</style>

<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="100" v-model="isCollapsed">
                <Menu active-name="1" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1" to="/teacher/">
                        <Icon type="ios-navigate"></Icon>
                        <span>{{ $t('teacher.menu.announcement') }}</span>
                    </MenuItem>
                    <MenuItem name="2" to="/teacher/courses">
                        <Icon type="ios-book" />
                        <span>{{ $t('teacher.menu.course') }}</span>
                    </MenuItem>
                    <MenuItem name="3" to="/teacher/userinfo">
                        <Icon type="md-person" />
                        <span>{{ $t('teacher.menu.userInfo') }}</span>
                    </MenuItem>
                    <MenuItem name="4" to="/login">
                        <Icon type="md-log-out"></Icon>
                        <span>{{ $t('teacher.menu.logout') }}</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header style="padding: 0;" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"/>
                </Header>
                <Content style="margin: 20px; ">
                    <Card style="min-height: 300px;">
                        <router-view/>
                    </Card>
                </Content>
                <IFooter/>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import IFooter from "@/pages/common/componets/IFooter";
    export default {
        name: "Index.vue",
        components: {IFooter},
        data () {
            return {
                isCollapsed: false
            };
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ];
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            }
        }
    };
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>

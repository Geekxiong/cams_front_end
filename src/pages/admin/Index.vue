<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="100" v-model="isCollapsed">
                <Menu active-name="1" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1" to="/admin/teachers">
                        <Icon type="md-people" />
                        <span>{{$t('admin.menu.teacherList')}}</span>
                    </MenuItem>
                    <MenuItem name="2" to="/admin/students">
                        <Icon type="ios-people" />
                        <span>{{$t('admin.menu.studentList')}}</span>
                    </MenuItem>
                    <MenuItem name="3" @click.native="passwordModalShow = true">
                        <Icon type="md-lock" />
                        <span>{{$t('admin.menu.changePassword')}}</span>
                    </MenuItem>
                    <MenuItem name="4" to="/login">
                        <Icon type="md-log-out"></Icon>
                        <span>{{$t('admin.menu.logout')}}</span>
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

        <Modal
            v-model="passwordModalShow"
            :closable="false"
            :mask-closable="false"
            width="350"
        >
            <Form>
                <FormItem :label="$t('common.userInfo.newPassword')">
                    <Input
                        v-model="newPassword"
                        type="password"
                        password
                        :placeholder="$t('common.userInfo.newPasswordPlaceholder')"
                    />
                </FormItem>
                <FormItem :label="$t('common.userInfo.password')">
                    <Input
                        v-model="password"
                        type="password"
                        password
                        :placeholder="$t('common.userInfo.passwordPlaceholder')"
                    />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button
                    type="text"
                    size="small"
                    @click="passwordModalShow = false"
                >
                    {{ $t('common.userInfo.cancelText') }}
                </Button>
                <Button
                    type="primary"
                    size="small"
                    @click="changePassword()"
                >
                    {{ $t('common.userInfo.okText') }}
                </Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import IFooter from "@/pages/common/componets/IFooter";
    export default {
        name: "Index.vue",
        components: {IFooter},
        data () {
            return {
                isCollapsed: false,
                passwordModalShow: false,
                newPassword: "",
                password: ""
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
            },
            changePassword() {
                if(this.newPassword.length<8){
                    this.$Message.error(this.$t("admin.menu.newPasswordWarn"));
                    this.newPassword="";
                    return;
                }
                if(this.password.length<8){
                    this.$Message.error(this.$t("admin.menu.passwordWarn"));
                    this.password="";
                    return;
                }
                this.$Message.success('Success!');
                this.passwordModalShow = false;
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

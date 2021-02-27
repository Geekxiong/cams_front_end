<template>
    <Menu
        mode="horizontal"
        theme="light"
        active-name="1"
    >
        <div class="layout-logo">
            <Avatar
                shape="square"
                size="large"
            >
                {{ text }}
            </Avatar>

<!--            <Avatar-->
<!--                shape="square"-->
<!--                :style="{background: 'black'}"-->
<!--            >-->
<!--                CAMS-->
<!--            </Avatar>-->
        </div>
        <div class="layout-nav">
<!--            <Button @click="changeLocale('en')">-->
<!--                en-->
<!--            </Button>-->
<!--            <Button @click="changeLocale('zh')">-->
<!--                zh-->
<!--            </Button>-->
            <MenuItem
                name="1"
                to="/"
            >
                <Icon type="ios-navigate"/>
                {{ $t("student.nav.announcementTitle") }}
            </MenuItem>
            <MenuItem
                name="2"
                to="/courses"
            >
                <Icon type="md-book"/>
                {{ $t("student.nav.courseTitle") }}
            </MenuItem>

            <Dropdown style="margin-left: 10px">
                <a href="javascript:void(0)">
                    熊世唯
                    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>
                        <div @click="toUserInfo()">
                            <Icon type="md-person"/>
                            {{ $t("student.nav.userInfo") }}
                        </div>
                    </DropdownItem>
                    <DropdownItem divided>
                        <div @click="logout()">
                            <Icon type="md-log-out"/>
                            {{ $t("student.nav.logout") }}
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </Menu>
</template>

<script>
    export default {
        name: "Nav",
        data() {
            return {
                theme1: 'light',
                text: "CAMS"
            };
        },
        methods: {
            changeLocale(locale) {
                localStorage.setItem("locale", locale);
                this.$i18n.locale = locale;
            },
            toUserInfo() {
                this.$router.push({path: `/userinfo`});
            },
            logout() {
                this.$router.push({path: `/login`});
            }
        }
    };
</script>

<style scoped>
    .layout-logo {
        float: left;
        position: relative;
        left: 50px;
    }

    .layout-nav {
        margin: 0 50px 0 auto;
        float: right
    }

</style>

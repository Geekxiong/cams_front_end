<template>
    <div>
        <h2 style="margin: 0 0 0 10px">
            {{ $t("common.userInfo.title") }}
        </h2>
        <Divider/>

        <Row :gutter="16">
            <i-col span="6">
                <div style="text-align: center">
                    <p>
                        <Avatar
                            shape="square"
                            src="https://i.loli.net/2017/08/21/599a521472424.jpg"
                            size="150"
                        />
                    </p>
                    <br>
                    <p>
                        <Button
                            size="small"
                            @click="imgDrawerShow = true"
                        >
                            {{ $t("common.userInfo.changeAvatar") }}
                        </Button>
                        <Button
                            size="small"
                            @click="passwordModalShow = true"
                        >
                            {{ $t("common.userInfo.changePassword") }}
                        </Button>
                    </p>
                </div>
            </i-col>
            <i-col span="10">
                <List>
                    <ListItem>
                        <Tag color="geekblue">
                            {{ $t("common.userInfo.userName") }}:
                        </Tag>
                        {{ userInfo.name }}
                    </ListItem>
                    <ListItem>
                        <Tag v-if="reuse==='student'" color="geekblue">
                            {{ $t("common.userInfo.studentNumber") }}:
                        </Tag>
                        <Tag v-else-if="reuse==='teacher'" color="geekblue">
                            {{ $t("common.userInfo.teacherNumber") }}:
                        </Tag>
                        {{ userInfo.number }}
                    </ListItem>
                    <ListItem v-if="reuse==='student'">
                        <Tag color="geekblue">
                            {{ $t("common.userInfo.class") }}:
                        </Tag>
                        {{ userInfo.class }}
                    </ListItem>
                    <ListItem>
                        <Tag color="geekblue">
                            {{ $t("common.userInfo.email") }}:
                        </Tag>
                        {{ userInfo.email }}
                        &nbsp;&nbsp;&nbsp;
                        <Button
                            size="small"
                            style="float: right"
                            @click="emailModalShow = true"
                        >
                            {{ $t("common.userInfo.change") }}
                        </Button>
                    </ListItem>
                </List>
            </i-col>
        </Row>

        <Modal
            v-model="emailModalShow"
            :closable="false"
            :mask-closable="false"
            width="350"
        >
            <Form>
                <FormItem :label="$t('common.userInfo.newEmail')">
                    <Input
                        v-model="newEmail"
                        type="email"
                        clearable
                        :placeholder="$t('common.userInfo.newEmailPlaceholder')"
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
                    @click="emailModalShow = false"
                >
                    {{ $t('common.userInfo.cancelText') }}
                </Button>
                <Button
                    type="primary"
                    size="small"
                >
                    {{ $t('common.userInfo.okText') }}
                </Button>
            </div>
        </Modal>

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
                >
                    {{ $t('common.userInfo.okText') }}
                </Button>
            </div>
        </Modal>

        <Drawer
            v-model="imgDrawerShow"
            :title="$t('common.userInfo.selectAvatar')"
            width="100%"
            :mask-closable="false"
        >
            <AvatarCopper></AvatarCopper>
        </Drawer>
    </div>
</template>

<script>
    import AvatarCopper from "@/pages/common/componets/AvatarCopper";

    export default {
        name: "UserInfo",
        components: {
            AvatarCopper,
        },
        data() {
            return {
                reuse: this.$route.meta.reuse,
                userInfo: {
                    name: "熊世唯",
                    number: "1909853mii200019",
                    class: "2019级计算机资讯系统班",
                    email: "geekxiong@foxmail.com"
                },
                emailModalShow: false,
                passwordModalShow: false,
                imgDrawerShow: false,
                newEmail: "",
                password: "",
                newPassword: "",

            };
        },
        methods: {
            submitCheck() {
                console.log(this.newEmail, this.password, this.modalShow, this.modalLoading);
            }
        }
    };
</script>

<style scoped>

</style>

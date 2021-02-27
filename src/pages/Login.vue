<template>
    <div class="panel">
        <Card class="login-panel">
            <Form
                ref="formInline"
                :model="loginForm"
                :rules="loginRule"
            >
                <h2 style="text-align: center;">{{$t('login.welcome')}}</h2>
                <FormItem :label="$t('login.account')" prop="account" style="margin-bottom: 15px">
                    <Input
                        v-model="loginForm.account"
                        type="text"
                        :placeholder="$t('login.accountHit')"
                    />
                </FormItem>
                <FormItem :label="$t('login.password')" prop="password" style="margin-bottom: 15px">
                    <Input
                        v-model="loginForm.password"
                        type="password"
                        :placeholder="$t('login.passwordHit')"
                    />
                </FormItem>
                <FormItem :label="$t('login.accountType')" prop="userType" style="margin-bottom: 25px">
                    <Select v-model="loginForm.userType" :placeholder="$t('login.accountTypeHit')">
                        <Option value="student">{{$t('login.student')}}</Option>
                        <Option value="teacher">{{$t('login.teacher')}}</Option>
                        <Option value="admin">{{$t('login.admin')}}</Option>
                    </Select>
                </FormItem>
                <FormItem style="margin-bottom: 10px">
                    <Button
                        type="primary"
                        style="width: 100%"
                        @click="handleSubmit('formInline')"
                    >
                        {{$t('login.login')}}
                    </Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    import {mAxios, urls} from "@/api/api";

    export default {
        name: "Login",
        data(){
            return{
                loginForm: {
                    account: "",
                    password: "",
                    userType: ""
                },
                loginRule: {
                    account: [
                        { required: true, message: this.$t('login.accountRequestMsg'), trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: this.$t('login.passwordRequestMsg'), trigger: 'blur' },
                        { type: 'string', min: 6, message: this.$t('login.passwordLengthMsg'), trigger: 'blur' }
                    ],
                    userType: [
                        { required: true, message: this.$t('login.accountTypeRequestMsg') }
                    ]
                }
            };
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        mAxios.post(urls.common.login, this.loginForm).then((res) =>{
                            let resData = res.data;
                            if(resData.state==='SUCCESS'){
                                this.$Message.success(this.$t('login.loginSuccess'));
                                window.localStorage.setItem("isAuth", 'yes');
                                window.localStorage.setItem("userId", resData.data.id);
                                window.localStorage.setItem("userName", resData.data.name);
                                window.localStorage.setItem("userType", this.loginForm.userType);
                                if(this.loginForm.userType==='student'){
                                    this.$router.push({path: `/`});
                                }else if(this.loginForm.userType==='teacher'){
                                    this.$router.push({path: `/teacher/`});
                                }else if(this.loginForm.userType==='admin'){
                                    this.$router.push({path: `/admin/`});
                                }
                            }else {
                                this.$Message.error(this.$t(`login.${resData.msg}`));
                            }
                        }).catch( (error)=> {
                            this.$Message.error(this.$t('login.networkError'));
                            console.info(error);
                        });
                    }
                });
            }
        }
    };
</script>

<style scoped>
    html,body{
        height: 100%;
    }
    .panel {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: #505672;
    }
    .login-panel {
        border-radius: 5px;
        margin: 130px auto;
        width: 450px;

        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
</style>

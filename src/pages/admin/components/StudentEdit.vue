<template>
    <div>
        <h2 style="padding-bottom: 10px; margin: 0 0 0 10px">
            <template v-if="reuse==='edit'">
                {{ $t('admin.studentEdit.editTitle') }}
            </template>
            <template v-else>
                {{ $t('admin.studentEdit.addTitle') }}
            </template>

            <Button style="float: right" @click="back()">
                {{ $t('admin.studentEdit.back') }}
            </Button>
        </h2>
        <Form ref="formValidate" :model="form" :rules="formRule">
            <FormItem :label="$t('admin.studentEdit.number')" prop="number">
                <Input v-model="form.number" :placeholder="$t('admin.studentEdit.numberHit')"></Input>
            </FormItem>
            <FormItem :label="$t('admin.studentEdit.name')" prop="name">
                <Input v-model="form.name" :placeholder="$t('admin.studentEdit.nameHit')"></Input>
            </FormItem>
            <FormItem :label="$t('admin.studentEdit.class')" prop="class">
                <Input v-model="form.class" :placeholder="$t('admin.studentEdit.classHit')"></Input>
            </FormItem>
            <FormItem :label="$t('admin.studentEdit.email')" prop="email">
                <Input v-model="form.email" :placeholder="$t('admin.studentEdit.emailHit')"></Input>
            </FormItem>
            <template v-if="reuse==='edit'">
                <FormItem :label="$t('admin.studentEdit.password')">
                    <Button @click="passwordModalShow=true">
                        {{$t('admin.studentEdit.resetPassword')}}
                    </Button>
                </FormItem>
                <FormItem :label="$t('admin.studentEdit.avatar')" >
                    <Button @click="resetAvatar()">
                        {{$t('admin.studentEdit.resetAvatar')}}
                    </Button>
                    <br>
                    <img :src="avatarUrl" width="150" :title="$t('admin.studentEdit.oldAvatar')"/>
                </FormItem>
            </template>

            <template v-else>
                <FormItem :label="$t('admin.studentEdit.password')" prop="password">
                    <Input type="password" password v-model="form.password" :placeholder="$t('admin.studentEdit.passwordHit')"></Input>
                </FormItem>
            </template>

            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">{{$t('admin.studentEdit.submit')}}</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">{{$t('admin.studentEdit.reset')}}</Button>
            </FormItem>
        </Form>

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
                    @click="resetPassword()"
                >
                    {{ $t('common.userInfo.okText') }}
                </Button>
            </div>
        </Modal>

    </div>
</template>

<script>
    export default {
        name: "StudentEdit",
        data() {
            return {
                reuse: this.$route.meta.reuse,
                studentId: this.$route.params.id,
                passwordModalShow: false,
                newPassword: "",
                form: {
                    number: "",
                    name: "",
                    class: "",
                    email: "",
                },
                formRule: {
                    number: [
                        {required: true, message: this.$t('admin.studentEdit.numberHit'), trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: this.$t('admin.studentEdit.nameHit'), trigger: 'blur'}
                    ],
                    class: [
                        {required: true, message: this.$t('admin.studentEdit.classHit'), trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: this.$t('admin.studentEdit.emailHit'), trigger: 'blur'},
                        { type: 'email', message: this.$t('admin.studentEdit.emailFormatHit'), trigger: 'blur' }
                    ],
                },
                avatarUrl: ""
            };
        },
        methods: {
            back(){
                this.$router.push({path: '/admin/students'});
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        console.log(this.form);
                    } else {
                        this.$Message.error('Fail!');
                    }

                });
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            resetPassword(){
                console.log(this.newPassword, this.studentId);
                if(this.newPassword.length<8){
                    this.$Message.error(this.$t('admin.studentEdit.passwordLengthHit'));
                    this.newPassword="";
                    return;
                }
                // 发http请求
                this.$Message.success('Success!');
                this.passwordModalShow = false;
            },

            resetAvatar(){
                console.log("Reset Avatar", this.studentId);
            }

        },
        created(){
            if(this.reuse==='add'){
                this.formRule['password'] = [
                    {required: true, message: this.$t('admin.studentEdit.passwordHit'), trigger: 'blur'},
                    { type: 'string', min: 8, message: this.$t('admin.studentEdit.passwordLengthHit'), trigger: 'blur' }
                ];
            }else {
                let tmpform= {
                    number: "1909853M-II20-0019",
                    name: "熊世唯",
                    class: "19级计算机资讯系统班",
                    email: "1909853mii20001@student.must.edu.mo",
                };
                this.form['number']=tmpform.number;
                this.form['name']=tmpform.name;
                this.form['class']=tmpform.class;
                this.form['email']=tmpform.email;
                this.avatarUrl="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar";
            }
        }
    };
</script>

<style scoped>

</style>

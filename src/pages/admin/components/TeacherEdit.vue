<template>
    <div>
        <h2 style="padding-bottom: 10px; margin: 0 0 0 10px">
            <template v-if="reuse==='edit'">
                {{ $t('admin.teacherEdit.editTitle') }}
            </template>
            <template v-else>
                {{ $t('admin.teacherEdit.addTitle') }}
            </template>

            <Button style="float: right" @click="back()">
                {{ $t('admin.teacherEdit.back') }}
            </Button>
        </h2>
        <Form ref="formValidate" :model="form" :rules="formRule">
            <FormItem :label="$t('admin.teacherEdit.number')" prop="number">
                <Input v-model="form.number" :placeholder="$t('admin.teacherEdit.numberHit')"></Input>
            </FormItem>
            <FormItem :label="$t('admin.teacherEdit.name')" prop="name">
                <Input v-model="form.name" :placeholder="$t('admin.teacherEdit.nameHit')"></Input>
            </FormItem>
            <FormItem :label="$t('admin.teacherEdit.email')" prop="email">
                <Input v-model="form.email" :placeholder="$t('admin.teacherEdit.emailHit')"></Input>
            </FormItem>
            <template v-if="reuse==='edit'">
                <FormItem :label="$t('admin.teacherEdit.password')">
                    <Button @click="passwordModalShow=true">
                        {{$t('admin.teacherEdit.resetPassword')}}
                    </Button>
                </FormItem>
                <FormItem :label="$t('admin.teacherEdit.avatar')" >
                    <Button @click="resetAvatar()">
                        {{$t('admin.teacherEdit.resetAvatar')}}
                    </Button>
                    <br>
                    <img :src="avatarUrl" width="150" :title="$t('admin.teacherEdit.oldAvatar')"/>
                </FormItem>
            </template>
            <template v-else>
                <FormItem :label="$t('admin.teacherEdit.password')" prop="password">
                    <Input type="password" password v-model="form.password" :placeholder="$t('admin.teacherEdit.passwordHit')"></Input>
                </FormItem>
            </template>

            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">{{$t('admin.teacherEdit.submit')}}</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">{{$t('admin.teacherEdit.reset')}}</Button>
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
                    email: "",
                },
                formRule: {
                    number: [
                        {required: true, message: this.$t('admin.teacherEdit.numberHit'), trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: this.$t('admin.teacherEdit.nameHit'), trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: this.$t('admin.teacherEdit.emailHit'), trigger: 'blur'},
                        { type: 'email', message: this.$t('admin.teacherEdit.emailFormatHit'), trigger: 'blur' }
                    ],
                },
                avatarUrl: ""
            };
        },
        methods: {
            back(){
                this.$router.push({path: '/admin/teachers'});
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
                    this.$Message.error(this.$t('admin.teacherEdit.passwordLengthHit'));
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
                    {required: true, message: this.$t('admin.teacherEdit.passwordHit'), trigger: 'blur'},
                    { type: 'string', min: 8, message: this.$t('admin.teacherEdit.passwordLengthHit'), trigger: 'blur' }
                ];
            }else {
                let tmpform= {
                    number: "1909853M-II20-0019",
                    name: "熊世唯",
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

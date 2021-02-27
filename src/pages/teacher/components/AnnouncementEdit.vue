<template>
    <div>
        <h2 style="padding-bottom: 10px; margin: 0 0 0 10px">
            <template v-if="reuse==='edit'">
                {{ $t('teacher.announcementEdit.editTitle') }}
            </template>
            <template v-else>
                {{ $t('teacher.announcementEdit.addTitle') }}
            </template>

            <Button style="float: right" @click="back()">
                {{ $t('teacher.announcementEdit.back') }}
            </Button>
        </h2>
        <Form ref="formValidate" :model="form" :rules="formRule">
            <FormItem :label="$t('teacher.announcementEdit.title')" prop="title">
                <Input v-model="form.title" :placeholder="$t('teacher.announcementEdit.titleHit')"></Input>
            </FormItem>
            <FormItem :label="$t('teacher.announcementEdit.course')" prop="courseId">
                <Select v-model="form.courseId" :placeholder="$t('teacher.announcementEdit.courseHit')" filterable>
                    <Option v-for="course in courseList" :value="course.id">
                        {{ course.name }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem :label="$t('teacher.announcementEdit.description')" prop="description">
                <Input v-model="form.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('teacher.announcementEdit.descriptionHit')"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">{{$t('teacher.announcementEdit.submit')}}</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">{{$t('teacher.announcementEdit.reset')}}</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import {mAxios, urls} from "../../../api/api";

    export default {
        name: "AnnouncementEdit",
        data(){
            return {
                id: this.$route.params.id,
                reuse: this.$route.meta.reuse,
                form: {
                    title: "",
                    courseId: "",
                    description: ""
                },
                formRule: {
                    title: [
                        {required: true, message: this.$t('teacher.announcementEdit.titleHit'), trigger: 'blur'}
                    ],
                    courseId: [
                        {required: true, message: this.$t('teacher.announcementEdit.courseHit'), type:'number', trigger: 'change'}
                    ],
                    description: [
                        {required: true, message: this.$t('teacher.announcementEdit.descriptionHit'), trigger: 'blur'},
                        {max: 500, message: this.$t('teacher.announcementEdit.descriptionLengthWarning'), trigger: 'blur'}
                    ]
                },
                courseList: []
            };
        },
        mounted(){
            this.getCourseList();
            // 如果是 edit 需要先异步请求id 的公告内容
            if(this.reuse==="edit"){
                this.getAnnouncementInfo();
            }
        },
        methods: {
            back(){
                this.$router.push({path: "/teacher/"});
            },
            getCourseList(){
                mAxios.get(urls.teacher.course.myCourse).then(res=>{
                    let resData = res.data;
                    console.log(resData);
                    if(resData.state==='SUCCESS'){
                        this.courseList = resData.data;
                    }else {
                        this.$Message.error(this.$t(`teacher.announcementEdit.${resData.msg}`));
                        this.courseList = [];
                    }
                }).catch(error => {
                    this.$Message.error(this.$t('login.networkError'));
                    console.info(error);
                });
            },
            getAnnouncementInfo(){
                mAxios.get(`${urls.teacher.announcement.get}?id=${this.id}`).then(res=>{
                    let resData = res.data;
                    console.log(resData);
                    if(resData.state==='SUCCESS'){
                        this.form.id = resData.data.id;
                        this.form.title = resData.data.title;
                        this.form.courseId = resData.data.course.id;
                        this.form.description = resData.data.description;
                    }else {
                        this.$Message.error(this.$t(`teacher.announcementEdit.${resData.msg}`));
                    }
                }).catch(error => {
                    this.$Message.error(this.$t('login.networkError'));
                    console.info(error);
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.info(this.form);
                        let url;
                        if(this.reuse==="edit"){
                            url = urls.teacher.announcement.edit;
                        }else {
                            url = urls.teacher.announcement.add;
                        }
                        mAxios.post(url, this.form).then(res=>{
                            let resData = res.data;
                            if(resData.state==='SUCCESS'){
                                if(this.reuse==="edit"){
                                    this.$Message.success(this.$t('teacher.announcementEdit.editSuccess'));
                                }else {
                                    this.$Message.success(this.$t('teacher.announcementEdit.addSuccess'));
                                }
                                this.$router.push({path: "/teacher/"});
                            }else {
                                this.$Message.error(this.$t(`teacher.announcementEdit.${resData.msg}`));
                            }
                        }).catch(error=>{
                            this.$Message.error(this.$t('login.networkError'));
                            console.info(error);
                        });

                    }
                });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },

    };
</script>

<style scoped>

</style>

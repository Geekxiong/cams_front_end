<template>
    <Form ref="formValidate" :model="form" :rules="formRule">
        <FormItem :label="$t('teacher.courseEdit.courseInfo.name')" prop="name">
            <Input v-model="form.name" :placeholder="$t('teacher.courseEdit.courseInfo.nameHit')"></Input>
        </FormItem>
        <FormItem :label="$t('teacher.courseEdit.courseInfo.description')" prop="description">
            <Input v-model="form.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('teacher.courseEdit.courseInfo.descriptionHit')"></Input>
        </FormItem>
        <FormItem :label="$t('teacher.courseEdit.courseInfo.courseTime')" prop="courseTime">
            <DatePicker type="daterange" v-model="form.courseTime" split-panels :placeholder="$t('teacher.courseEdit.courseInfo.courseTimeHit')"></DatePicker>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">{{$t('teacher.courseEdit.courseInfo.submit')}}</Button>
            <Button @click="handleReset()" style="margin-left: 8px">{{$t('teacher.courseEdit.courseInfo.reset')}}</Button>
        </FormItem>
    </Form>
</template>

<script>
    import {mAxios, urls} from "../../../api/api";
    import util from "../../../util";

    export default {
        name: "CourseEdit-CourseInfo",
        props: ['reuse', 'id'],
        data() {
            return {
                form: {
                    name: "",
                    description: "",
                    courseTime: []
                },
                formRule: {
                    name: [
                        {required: true, message: this.$t('teacher.courseEdit.courseInfo.nameHit'), trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: this.$t('teacher.courseEdit.courseInfo.descriptionHit'), trigger: 'blur'},
                        {type: 'string', max: 500, message: this.$t('teacher.courseEdit.courseInfo.descriptionLengthWarning'), trigger: 'blur'}
                    ],
                    courseTime: [{
                        type: "array", required: true, message: this.$t('teacher.courseEdit.courseInfo.courseTimeHit'),
                        fields: {
                            0: {type: 'date', required: true, message: this.$t('teacher.courseEdit.courseInfo.courseTimeHit')},
                            1: {type: 'date', required: true, message: this.$t('teacher.courseEdit.courseInfo.courseTimeHit')}
                        },
                        trigger: 'change'
                    }],
                },
            };
        },
        mounted() {
            // 如果是 edit 需要先异步请求id 的课程内容
            if(this.reuse==="edit"){
                this.getCourseInfo();
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.info(this.form);
                        let form = {
                            name: this.form.name,
                            description: this.form.description,
                            startTime: util.dateFormat(this.form.courseTime[0],"YYYY-MM-DD"),
                            endTime: util.dateFormat(this.form.courseTime[1], "YYYY-MM-DD"),
                        };
                        let url;
                        if(this.reuse==="edit"){
                            url = urls.teacher.course.edit;
                            form.id = this.form.id;
                        }else {
                            url = urls.teacher.course.add;
                        }
                        mAxios.post(url, form).then(res=>{
                            let resData = res.data;
                            if(resData.state==='SUCCESS'){
                                if(this.reuse==="edit"){
                                    this.$Message.success(this.$t('teacher.courseEdit.courseInfo.editSuccess'));
                                }else {
                                    this.$Message.success(this.$t('teacher.courseEdit.courseInfo.addSuccess'));
                                }
                                this.$router.push({path: "/teacher/courses"});
                            }else {
                                this.$Message.error(this.$t(resData.msg));
                            }
                        }).catch(error=>{
                            this.$Message.error(this.$t('login.networkError'));
                            console.info(error);
                        });

                    }
                });
            },
            handleReset () {
                this.form = {
                    id: this.oldForm.id,
                    name: this.oldForm.name,
                    courseTime: this.oldForm.courseTime,
                    description: this.oldForm.description
                };
            },
            getCourseInfo(){
                mAxios.get(`${urls.teacher.course.get}?id=${this.id}`).then(res=>{
                    let resData = res.data;
                    console.log(resData);
                    if(resData.state==='SUCCESS'){
                        this.oldForm = {
                            id: resData.data.id,
                            name: resData.data.name,
                            courseTime: [new Date(resData.data.startTime), new Date(resData.data.endTime)],
                            description: resData.data.description
                        };
                        this.form = {
                            id: resData.data.id,
                            name: resData.data.name,
                            courseTime: [new Date(resData.data.startTime), new Date(resData.data.endTime)],
                            description: resData.data.description
                        };
                    }else {
                        this.$Message.error(this.$t(`${resData.msg}`));
                    }
                }).catch(error => {
                    this.$Message.error(this.$t('login.networkError'));
                    console.info(error);
                });
            }
        },
    };
</script>

<style scoped>

</style>

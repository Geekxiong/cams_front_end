<template>
    <div>
        <h2 style="padding-bottom: 10px; margin: 0 0 0 10px">
            <template v-if="reuse==='edit'">
                {{$t('teacher.assignmentEdit.editTitle')}}
            </template>
            <template v-else>
                {{$t('teacher.assignmentEdit.addTitle')}}
            </template>

            <Button style="float: right" @click="back()">
                {{$t('teacher.assignmentEdit.back')}}
            </Button>
        </h2>
        <Form ref="formValidate" :model="form" :rules="formRule">
            <FormItem :label="$t('teacher.assignmentEdit.name')" prop="name">
                <Input v-model="form.name" :placeholder="$t('teacher.assignmentEdit.nameHit')"></Input>
            </FormItem>
            <FormItem :label="$t('teacher.assignmentEdit.description')" prop="description">
                <Input v-model="form.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('teacher.assignmentEdit.descriptionHit')"></Input>
            </FormItem>
            <FormItem :label="$t('teacher.assignmentEdit.timeRange')" prop="timeRange">
                <DatePicker
                    v-model="form.timeRange"
                    type="datetimerange"
                    format="yyyy-MM-dd HH:mm"
                    :placeholder="$t('teacher.assignmentEdit.timeRangeHit')"
                    style="width: 300px"/>
            </FormItem>
            <FormItem :label="$t('teacher.assignmentEdit.annex')">
                <AnnexUploader :assignmentId="assignmentId" :uploadedList="this.annexList" @on-uploaded="handleUpload" />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">{{$t('teacher.assignmentEdit.submit')}}</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">{{$t('teacher.assignmentEdit.reset')}}</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import util from "@/util";
    import AnnexUploader from "@/pages/teacher/components/AnnexUploader";
    import {mAxios, urls} from "../../../api/api";
    export default {
        name: "AssignmentEdit",
        components: {
            AnnexUploader
        },
        data(){
            return {
                courseId: this.$route.params.cid,
                assignmentId: this.$route.params.id,
                reuse: this.$route.meta.reuse,
                annexList: [],
                form: {
                    name: "",
                    description: "",
                    timeRange: [],
                },
                formRule: {
                    name: [
                        {required: true, message: this.$t('teacher.assignmentEdit.nameHit'), trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: this.$t('teacher.assignmentEdit.descriptionHit'), trigger: 'blur'},
                        {type: 'string', max: 500, message: this.$t('teacher.assignmentEdit.descriptionLengthWarning'), trigger: 'blur'}
                    ],
                    timeRange: [{
                        type: "array", required: true, message: this.$t('teacher.assignmentEdit.timeRangeHit'),
                        fields: {
                            0: {type: 'date', required: true, message: this.$t('teacher.assignmentEdit.timeRangeHit')},
                            1: {type: 'date', required: true, message: this.$t('teacher.assignmentEdit.timeRangeHit')}
                        },
                        trigger: 'change'
                    }],

                },
            };
        },
        mounted() {
            if(this.reuse==="edit"){
                this.getAssignmentInfo();
            }
        },
        methods: {
            back(){
                this.$router.push({path: `/teacher/course/${this.courseId}/assignments`});
            },
            getAssignmentInfo(){
                mAxios.get(`${urls.teacher.assignment.get}?id=${this.assignmentId}`).then(res=>{
                    let resData = res.data;
                    console.log(resData);
                    if(resData.state==='SUCCESS'){
                        this.form.id = resData.data.id;
                        this.form.name = resData.data.name;
                        this.form.description = resData.data.description;
                        this.form.timeRange = [util.dateFormat(resData.data.startTime), util.dateFormat(resData.data.endTime)];
                        this.annexList = resData.data.assignmentAnnexes;
                    }else {
                        this.$Message.error(this.$t(resData.msg));
                    }
                }).catch(error => {
                    this.$Message.error(this.$t('login.networkError'));
                    console.info(error);
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        console.log(this.form);
                        let form = {
                            name: this.form.name,
                            description: this.form.description,
                            startTime: util.dateFormat(this.form.timeRange[0],"YYYY-MM-DD HH:mm:ss"),
                            endTime: util.dateFormat(this.form.timeRange[1],"YYYY-MM-DD HH:mm:ss"),
                        };
                        let url;
                        if(this.reuse==="edit"){
                            url = urls.teacher.assignment.edit;
                            form.id=this.assignmentId;
                        }else {
                            url = urls.teacher.assignment.add;
                            form.courseId=this.courseId;
                            let annexList=[];
                            for (let i = 0; i < this.annexList.length; i++) {
                                annexList.push(this.annexList[i].id);
                            }
                            form.annexList = annexList;
                        }
                        mAxios.post(url, form).then(res=>{
                            let resData = res.data;
                            if(resData.state==='SUCCESS'){
                                if(this.reuse==="edit"){
                                    this.$Message.success(this.$t('teacher.coursewareEdit.editSuccess'));
                                }else {
                                    this.$Message.success(this.$t('teacher.coursewareEdit.addSuccess'));
                                }
                                this.$router.push({path: `/teacher/course/${this.courseId}/assignments`});
                            }else {
                                this.$Message.error(this.$t(resData.msg));
                            }
                        }).catch(error=>{
                            this.$Message.error(this.$t('login.networkError'));
                            console.info(error);
                        });
                    } else {
                        this.$Message.error('Fail!');
                    }
                });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleUpload(data){
                this.annexList = data;
            }
        }
    };
</script>

<style scoped>

</style>

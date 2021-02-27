<template>
    <div>
        <h2 style="padding-bottom: 10px; margin: 0 0 0 10px">
            <template v-if="reuse==='edit'">
                {{$t('teacher.coursewareEdit.editTitle')}}
            </template>
            <template v-else>
                {{$t('teacher.coursewareEdit.addTitle')}}
            </template>

            <Button style="float: right" @click="back()">
                {{$t('teacher.coursewareEdit.back')}}
            </Button>
        </h2>
        <Form ref="formValidate" :model="form" :rules="formRule">
            <FormItem :label="$t('teacher.coursewareEdit.name')" prop="name">
                <Input v-model="form.name" :placeholder="$t('teacher.coursewareEdit.nameHit')"></Input>
            </FormItem>
            <FormItem :label="$t('teacher.coursewareEdit.description')" prop="description">
                <Input v-model="form.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('teacher.coursewareEdit.descriptionHit')"></Input>
            </FormItem>
            <FormItem :label="$t('teacher.coursewareEdit.file')" prop="filePath">
                <Upload
                    accept=".doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.zip,.rar"
                    :before-upload="handleSelectFile" action="">
                    <Button icon="ios-cloud-upload-outline">{{ $t('teacher.coursewareEdit.uploadFile') }}</Button>
                </Upload>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">{{$t('teacher.coursewareEdit.submit')}}</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">{{$t('teacher.coursewareEdit.reset')}}</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import util from "@/util";
    import {mAxios, urls} from "../../../api/api";

    export default {
        name: "CoursewareEdit",
        data() {
            // 自定义验证 判断上传文件
            const validateUpload = (rule, value, callback) => {
                if(this.form.filePath.trim() === "") {
                    callback(new Error());
                } else {
                    callback();
                }
            };
            return {
                courseId: this.$route.params.cid,
                coursewarseId: this.$route.params.id,
                reuse: this.$route.meta.reuse,
                form: {
                    name: "",
                    description: "",
                    filePath: "",
                },
                formRule: {
                    name: [
                        {required: true, message: this.$t('teacher.coursewareEdit.nameHit'), trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: this.$t('teacher.coursewareEdit.descriptionHit'), trigger: 'blur'},
                        {type: 'string', max: 500, message: this.$t('teacher.coursewareEdit.descriptionLengthWarning'), trigger: 'blur'}
                    ],
                    filePath: [
                        { required: true, message:this.$t('teacher.coursewareEdit.fileHit'), validator: validateUpload, trigger: 'change'}
                    ]
                },
            };
        },
        mounted() {
            util.getOSSPUTAuth();
            // 如果是 edit 需要先异步请求id 的公告内容
            if(this.reuse==="edit"){
                this.getCoursewareInfo();
            }
        },
        methods: {
            back(){
                this.$router.push({path: `/teacher/course/${this.courseId}/coursewares`});
            },
            getCoursewareInfo(){
                mAxios.get(`${urls.teacher.courseware.get}?id=${this.coursewarseId}`).then(res=>{
                    let resData = res.data;
                    console.log(resData);
                    if(resData.state==='SUCCESS'){
                        this.form.id = resData.data.id;
                        this.form.name = resData.data.name;
                        this.form.description = resData.data.description;
                        this.form.filePath = resData.data.savePath;
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
                        console.info(this.form);
                        let url;
                        if(this.reuse==="edit"){
                            url = urls.teacher.courseware.edit;
                        }else {
                            url = urls.teacher.courseware.add;
                        }
                        this.form.courseId = this.courseId;
                        mAxios.post(url, this.form).then(res=>{
                            let resData = res.data;
                            if(resData.state==='SUCCESS'){
                                if(this.reuse==="edit"){
                                    this.$Message.success(this.$t('teacher.coursewareEdit.editSuccess'));
                                }else {
                                    this.$Message.success(this.$t('teacher.coursewareEdit.addSuccess'));
                                }
                                this.$router.push({path: `/teacher/course/${this.courseId}/coursewares`});
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
            /**
             * 上传前处理
             * 先检测格式和大小
             * 再上传
             * @param file
             */
            handleSelectFile(file) {
                let fileTypes = ["doc","docx","ppt","pptx","xls","xlsx","pdf","zip","rar"];
                if(!util.checkFileType(file, fileTypes)){
                    this.$Notice.warning({
                        title: this.$t('teacher.coursewareEdit.fileTypeWarning'),
                        desc: this.$t('teacher.coursewareEdit.fileTypeWarningDesc').replace('file.name', file.name)
                    });
                    return false;
                }else if(!util.checkFileSize(file, 100)){
                    this.$Notice.warning({
                        title: this.$t('teacher.coursewareEdit.fileSizeWarning'),
                        desc: this.$t('teacher.coursewareEdit.fileSizeWarningDesc').replace('file.name', file.name)
                    });
                    return false;
                }
                /**
                 * 上传至OSS
                 */
                let teacherId = window.localStorage.getItem("userId");
                let fileSuffix = file.name.substring(file.name.lastIndexOf("."));
                let filePath="/courseware/teacher_"+teacherId+"/"+util.getUUID()+fileSuffix;
                let b = util.ossPut(filePath, file);
                if(b){
                    this.form.filePath = filePath;
                    this.$Message.success(this.$t('teacher.coursewareEdit.fileUploadSuccess'));
                }else {
                    this.form.filePath = "";
                    this.$Message.error(this.$t('login.networkError'));
                }
                return false;
            },
        }
    };
</script>

<style scoped>

</style>

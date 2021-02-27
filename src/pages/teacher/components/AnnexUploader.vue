<template>
    <div>
        <Upload
            ref="uploader"
            :default-file-list="uploadedList"
            :before-upload="handleSelectFile"
            :on-remove="handleRemoveFile"
            multiple
            action="">
            <Button icon="ios-cloud-upload-outline" :loading="loadingStatus">
                {{$t('teacher.assignmentEdit.uploadText')}}
            </Button>
        </Upload>
    </div>
</template>
<script>
    import util from "@/util";
    import {mAxios, urls} from "../../../api/api";

    export default {
        name: "AnnexUploader",
        props: ['assignmentId', "uploadedList"],
        data () {
            return {
                loadingStatus: false,
                annexList: this.uploadedList
            };
        },
        mounted() {
            util.getOSSPUTAuth();
        },
        methods: {
            handleRemoveFile(file, fileList){
                console.log(file, fileList, this.$refs.uploader.fileList);
                mAxios.get(`${urls.teacher.assignmentAnnex.delete}?id=${file.id}`).then(res=>{
                    let resData = res.data;
                    this.loadingStatus = false;
                    if(resData.state==='SUCCESS'){
                        this.annexList.map((item, index) => {
                            if(item.id===file.id){
                                this.annexList.splice(index, 1);
                                // 将已上传列表返回给父组件。
                                this.$emit("on-uploaded", this.annexList);
                                return;
                            }
                        });
                    }else {
                        this.$Message.error(this.$t(resData.msg));
                    }
                }).catch(error=>{
                    this.loadingStatus = false;
                    this.$Message.error(this.$t('login.networkError'));
                    console.info(error);
                });
            },
            handleSelectFile(file) {
                let fileTypes = ["doc","docx","ppt","pptx","xls","xlsx","pdf","zip","rar"];
                if(!util.checkFileType(file, fileTypes)){
                    this.$Notice.warning({
                        title: this.$t('teacher.assignmentEdit.fileTypeWarning'),
                        desc: this.$t('teacher.assignmentEdit.fileTypeWarningDesc').replace('file.name', file.name)
                    });
                    return false;
                }else if(!util.checkFileSize(file, 100)){
                    this.$Notice.warning({
                        title: this.$t('teacher.assignmentEdit.fileSizeWarning'),
                        desc: this.$t('teacher.assignmentEdit.fileSizeWarningDesc').replace('file.name', file.name)
                    });
                    return false;
                }

                // 开始上传
                this.loadingStatus = true;
                /**
                 * 上传至OSS
                 */
                let teacherId = window.localStorage.getItem("userId");
                let fileSuffix = file.name.substring(file.name.lastIndexOf("."));
                let filePath="/assignmentAnnex/teacher_"+teacherId+"/"+util.getUUID()+fileSuffix;
                let b = util.ossPut(filePath, file);
                if(b){
                    this.$Message.success(this.$t('teacher.coursewareEdit.fileUploadSuccess'));
                    // 上传到后台服务器
                    let form = {
                        name: file.name,
                        savePath: filePath,
                    };
                    if(this.assignmentId!==null&&this.assignmentId!==undefined){
                        form.assignmentId = this.assignmentId;
                    }
                    mAxios.post(urls.teacher.assignmentAnnex.add, form).then(res=>{
                        let resData = res.data;
                        this.loadingStatus = false;
                        if(resData.state==='SUCCESS'){
                            // 更新已上传列表
                            this.annexList.push(resData.data);
                            // 将已上传列表返回给父组件。
                            this.$emit("on-uploaded", this.annexList);
                            if(this.reuse==="edit"){
                                this.$Message.success(this.$t('teacher.coursewareEdit.editSuccess'));
                            }else {
                                this.$Message.success(this.$t('teacher.coursewareEdit.addSuccess'));
                            }
                        }else {
                            this.$Message.error(this.$t(resData.msg));
                        }
                    }).catch(error=>{
                        this.loadingStatus = false;
                        this.$Message.error(this.$t('login.networkError'));
                        console.info(error);
                    });
                }else {
                    this.form.filePath = "";
                    this.$Message.error(this.$t('login.networkError'));
                }
                return false;
            }
        }
    };
</script>
<style>

</style>

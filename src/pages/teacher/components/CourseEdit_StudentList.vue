<template>
    <div>
        <Table stripe :columns="columns" :data="studentList" />

        <div style="margin-top: 10px">
            <Input
                search
                v-model="addStudentNumber"
                @on-search="addStudent()"
                :enter-button="$t('teacher.courseEdit.studentList.add')"
                :placeholder="$t('teacher.courseEdit.studentList.addHit')" />
        </div>
        <div style="margin-top: 10px;">
            <Upload
                accept=".xls,.xlsx,.csv"
                :before-upload="handleSelectFile"
                action="">
                <Button icon="ios-cloud-upload-outline" :loading="loadingStatus">{{ $t('teacher.courseEdit.studentList.importStudents') }}</Button>
            </Upload>

            <a :href="templateUrl" target="_blank"> {{$t("teacher.courseEdit.studentList.downloadImportTemplate")}} </a>
        </div>
    </div>
</template>

<script>
    import util from "@/util";
    import {mAxios, urls} from "../../../api/api";

    export default {
        name: "CourseEdit-Student",
        props: ['reuse', 'id'],
        data() {
            return {
                loadingStatus: false,
                columns: [
                    {
                        title: '#',
                        width: 70,
                        key: 'id',
                        sortable: true,
                        sortType: 'asc'
                    },
                    {
                        title: this.$t("teacher.courseEdit.studentList.listCol.number"),
                        key: 'number'
                    },
                    {
                        title: this.$t("teacher.courseEdit.studentList.listCol.name"),
                        key: 'name',
                        width: 120
                    },
                    {
                        title: this.$t("teacher.courseEdit.studentList.listCol.email"),
                        key: 'email'
                    },
                    {
                        title: this.$t("teacher.courseEdit.studentList.listCol.class"),
                        key: 'class_'
                    },
                    {
                        title: this.$t("teacher.courseEdit.studentList.listCol.action"),
                        key: 'action',
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.toRemove(params.row.id);
                                        }
                                    }
                                }, this.$t("teacher.courseEdit.studentList.listCol.remove")),

                            ]);
                        }
                    }
                ],
                studentList: [],
                addStudentNumber: "",
                templateUrl: urls.teacher.course.importStudentsTemplate
            };
        },
        mounted() {
            if(this.reuse==="edit") {
                this.getStudents();
            }
        },
        methods: {
            getStudents() {
                mAxios.get(`${urls.teacher.course.students}?id=${this.id}`).then(res=>{
                    let resData = res.data;
                    console.log(resData);
                    if(resData.state==='SUCCESS'){
                        this.studentList = resData.data;
                    }else {
                        this.$Message.error(this.$t(`${resData.msg}`));
                    }
                }).catch(error => {
                    this.$Message.error(this.$t('login.networkError'));
                    console.info(error);
                });
            },
            toRemove(sid){
                console.log(sid);
                this.$Modal.confirm({
                    title: this.$t('teacher.courseEdit.studentList.deleteConfirm.title'),
                    content: this.$t('teacher.courseEdit.studentList.deleteConfirm.content'),
                    okText: this.$t('teacher.courseEdit.studentList.deleteConfirm.okText'),
                    cancelText: this.$t('teacher.courseEdit.studentList.deleteConfirm.cancelText'),
                    onOk: () => {
                        // 先发请求从数据库中删除，
                        mAxios.get(`${urls.teacher.course.removeStudent}?cid=${this.id}&sid=${sid}`).then(res=>{
                            let resData = res.data;
                            console.log(resData);
                            if(resData.state==='SUCCESS'){
                                // 再从list中删除
                                this.studentList.map((item, index) => {
                                    if(item.id===sid){
                                        this.studentList.splice(index, 1);
                                        return;
                                    }
                                });
                            }else {
                                this.$Message.error(this.$t(`${resData.msg}`));
                            }
                        }).catch(error => {
                            this.$Message.error(this.$t('login.networkError'));
                            console.info(error);
                        });
                    }
                });
            },
            addStudent() {
                let studentNumber = this.addStudentNumber.trim();
                if(studentNumber.length<=0){
                    this.$Message.error(this.$t('teacher.courseEdit.studentList.addHit'));
                    return;
                }
                mAxios.get(`${urls.teacher.course.addStudent}?cid=${this.id}&studentNumber=${studentNumber}`).then(res=>{
                    let resData = res.data;
                    console.log(resData);
                    if(resData.state==='SUCCESS'){
                        this.studentList.push(resData.data);
                    }else {
                        this.$Message.error(this.$t(`${resData.msg}`));
                    }
                }).catch(error => {
                    this.$Message.error(this.$t('login.networkError'));
                    console.info(error);
                });

            },
            /**
             * 上传前处理
             * 先检测格式和大小
             * 再上传
             * @param file
             */
            handleSelectFile(file) {
                let fileTypes = ["xls","xlsx","csv","XLS","XLSX","CSV"];
                if(!util.checkFileType(file, fileTypes)){
                    this.$Notice.warning({
                        title: this.$t('teacher.courseEdit.studentList.fileTypeWarning'),
                        desc: this.$t('teacher.courseEdit.studentList.fileTypeWarningDesc').replace('file.name', file.name)
                    });
                    return false;
                }else if(!util.checkFileSize(file, 2)){
                    this.$Notice.warning({
                        title: this.$t('teacher.courseEdit.studentList.fileSizeWarning'),
                        desc: this.$t('teacher.courseEdit.studentList.fileSizeWarningDesc').replace('file.name', file.name)
                    });
                    return false;
                }

                // 准备好要上传的文件
                let form = new window.FormData();
                form.append('cid', this.id);
                form.append('file', file);
                this.loadingStatus = true;
                // 开始上传
                mAxios.post(`${urls.teacher.course.importStudents}`, form, {
                    headers: { "Content-Type": "multipart/form-data" },
                }).then(res=>{
                    let resData = res.data;
                    if(resData.state==='SUCCESS'){
                        this.$Message.success(
                            this.$t('teacher.courseEdit.studentList.importSuccess')
                                .replace('import.totalNumber', resData.data.totalNumber)
                                .replace('import.successNumber', resData.data.successNumber));
                        this.getStudents();
                    }else {
                        this.$Message.error(this.$t(`${resData.msg}`));
                    }
                    this.file = null;
                    this.loadingStatus = false;
                }).catch(error => {
                    this.$Message.error(this.$t('login.networkError'));
                    console.info(error);
                    this.file = null;
                    this.loadingStatus = false;
                });
                return false;
            },
        },
    };
</script>

<style scoped>

</style>

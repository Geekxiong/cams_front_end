<template>
    <div>
        <h2 style="padding-bottom: 10px; margin: 0 0 0 10px">
            {{ $t("teacher.course.title") }}
            <Button style="float: right" @click="toAdd()">
                {{ $t("teacher.course.add") }}
            </Button>
        </h2>
        <Table
            stripe
            :columns="columns"
            :data="courseList"
        />
    </div>
</template>

<script>
    import {mAxios, urls} from "../../../api/api";
    import util from "../../../util";

    export default {
        name: "Course",
        data() {
            return {
                columns: [
                    {
                        title: '#',
                        key: 'id',
                        width: 70
                    },
                    {
                        title: this.$t("teacher.course.listCol.name"),
                        key: 'name'
                    },
                    {
                        title: this.$t("teacher.course.listCol.startTime"),
                        key: 'startTime',
                        render: (h, params) => {
                            return h('div', util.dateFormat(params.row.startTime,"YYYY-MM-DD"));
                        }
                    },
                    {
                        title: this.$t("teacher.course.listCol.endTime"),
                        key: 'endTime',
                        render: (h, params) => {
                            return h('div', util.dateFormat(params.row.endTime,"YYYY-MM-DD"));
                        }
                    },
                    {
                        title: this.$t("teacher.course.listCol.action"),
                        key: 'action',
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.toEdit(params.row.id);
                                        }
                                    }
                                }, this.$t("teacher.course.listCol.edit")),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.toCourseware(params.row.id);
                                        }
                                    }
                                }, this.$t("teacher.course.listCol.courseware")),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.toAssignment(params.row.id);
                                        }
                                    }
                                }, this.$t("teacher.course.listCol.assignment")),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.toDelete(params.row.id);
                                        }
                                    }
                                }, this.$t("teacher.course.listCol.delete")),
                            ]);
                        }
                    }
                ],
                courseList: [ ]
            };
        },
        mounted(){
            this.getCourseList();
        },
        methods: {
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
            toAdd() {
                this.$router.push({path: `/teacher/courses/add/`});
            },
            toEdit(id) {
                this.$router.push({path: `/teacher/course/${id}`});
            },
            toCourseware(cid){
                this.$router.push({path: `/teacher/course/${cid}/coursewares`});
            },
            toAssignment(cid){
                this.$router.push({path: `/teacher/course/${cid}/assignments`});
            },
            toDelete(id) {
                console.log(id);
                this.$Modal.confirm({
                    title: this.$t('teacher.course.deleteConfirm.title'),
                    content: this.$t('teacher.course.deleteConfirm.content'),
                    okText: this.$t('teacher.course.deleteConfirm.okText'),
                    cancelText: this.$t('teacher.course.deleteConfirm.cancelText'),
                    onOk: () => {
                        // 先发请求从数据库中删除，
                        mAxios.get(`${urls.teacher.course.delete}?id=${id}`).then(res=>{
                            let resData = res.data;
                            if(resData.state==='SUCCESS'){
                                this.$Message.success(this.$t(`teacher.announcement.deleteConfirm.deleteSuccess`));
                                // 再从list中删除
                                this.courseList.map((item, index) => {
                                    if(item.id===id){
                                        this.courseList.splice(index, 1);
                                        return;
                                    }
                                });
                            }else {
                                this.$Message.error(this.$t(resData.msg));
                            }
                        }).catch(error => {
                            this.$Message.error(this.$t('login.networkError'));
                            console.info(error);
                        });
                        // this.$Message.info('Clicked ok');
                    }
                });
            },

        }
    };
</script>

<style scoped>

</style>

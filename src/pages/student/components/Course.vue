<template>
    <div>
        <h2 style="padding-bottom: 10px; margin: 0 0 0 10px">
            {{ $t("student.course.title") }}
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
                        type: 'index',
                        title: '#',
                        key: 'id',
                        width: 70
                    },
                    {
                        title: this.$t("student.course.name"),
                        key: 'name'
                    },
                    {
                        title: this.$t("student.course.teacherName"),
                        key: 'teacherName',
                        render: (h, params) => {
                            return h('div', params.row.teacher?params.row.teacher.name:"");
                        }
                    },
                    {
                        title: this.$t("student.course.startTime"),
                        key: 'startTime',
                        render: (h, params) => {
                            return h('div', util.dateFormat(params.row.startTime,"YYYY-MM-DD"));
                        }
                    },
                    {
                        title: this.$t("student.course.endTime"),
                        key: 'endTime',
                        render: (h, params) => {
                            return h('div', util.dateFormat(params.row.endTime,"YYYY-MM-DD"));
                        }
                    },
                    {
                        title: this.$t("student.course.action"),
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.toDetail(params.row.id);
                                        }
                                    }
                                }, this.$t("student.course.detail"))
                            ]);
                        }
                    }
                ],
                courseList: [ ]
            };
        },
        mounted() {
            this.getCourseList();
        },
        methods: {
            getCourseList(){
                mAxios.get(urls.student.course.myCourse).then(res=>{
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
            toDetail(id) {
                console.log(id);
                this.$router.push({path: `/course/${id}`});
            },
        }
    };
</script>

<style scoped>

</style>

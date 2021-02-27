<template>
    <div>
        <Table
            stripe
            :columns="columns"
            :data="coursewareList"
        />
    </div>
</template>

<script>
    import {mAxios, urls} from "../../../api/api";
    import util from "../../../util";

    export default {
        name: "Courseware",
        props: ['course-id'],
        data() {
            return {
                columns: [
                    {
                        type: 'index',
                        title: '#',
                        key: 'index_',
                        width: 70
                    },
                    {
                        title: this.$t("student.courseware.name"),
                        key: 'name'
                    },
                    {
                        title: this.$t("student.courseware.description"),
                        key: 'description'
                    },
                    {
                        title: this.$t("student.courseware.uploadTime"),
                        key: 'uploadTime',
                        render: (h, params) => {
                            return h('div', util.dateFormat(params.row.uploadTime));
                        }
                    },
                    {
                        title: this.$t("student.courseware.action"),
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
                                            this.downloadCourseware(params.row.savePath);
                                        }
                                    }
                                }, this.$t("student.courseware.download"))
                            ]);
                        }
                    }
                ],
                coursewareList: [
                ]
            };
        },
        mounted() {
            this.getList();
            util.getOSSAuth("GET");
        },
        methods: {
            getList() {
                mAxios.get(`${urls.student.courseware.list}?courseId=${this.courseId}`).then(res=>{
                    let resData = res.data;
                    console.log(resData);
                    if(resData.state==='SUCCESS'){
                        this.coursewareList = resData.data;
                    }else {
                        this.$Message.error(this.$t(resData.msg));
                        this.coursewareList = [];
                    }
                }).catch(error => {
                    this.$Message.error(this.$t('login.networkError'));
                    console.info(error);
                });
            },
            downloadCourseware(savePath) {
                console.log(savePath);
                let b = util.ossGet(savePath);
                if(b){

                }else {

                }
            },

        }
    };
</script>

<style scoped>

</style>

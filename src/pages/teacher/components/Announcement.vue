<template>
    <div>
        <h2 style="padding-bottom: 10px; margin: 0 0 0 10px">
            {{ $t("teacher.announcement.title") }}
            <Button style="float: right" @click="toAdd()">
                {{ $t("teacher.announcement.addNew") }}
            </Button>
        </h2>
        <Table stripe :columns="columns" :data="announcementList"/>
    </div>
</template>

<script>
    import {mAxios, urls} from "../../../api/api";
    import util from "../../../util";

    export default {
        name: "Announcement",
        data() {
            return {
                columns: [
                    {
                        title: '#',
                        key: 'id',
                        width: 50,
                    },
                    {
                        title: this.$t("teacher.announcement.listCol.title"),
                        key: 'title'
                    },
                    {
                        title: this.$t("teacher.announcement.listCol.description"),
                        key: 'description',
                        ellipsis: true
                    },
                    {
                        title: this.$t("teacher.announcement.listCol.courseName"),
                        key: 'course',
                        render: (h, params) => {
                            return h('div', params.row.course.name);
                        }
                    },
                    {
                        title: this.$t("teacher.announcement.listCol.editTime"),
                        key: 'editTime',
                        render: (h, params) => {
                            return h('div', util.dateFormat(params.row.editTime));
                        }
                    },
                    {
                        title: this.$t("teacher.announcement.listCol.action"),
                        key: 'action',
                        fixed: 'right',
                        width: 120,
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
                                }, this.$t("teacher.announcement.listCol.edit")),
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
                                }, this.$t("teacher.announcement.listCol.delete")),
                            ]);
                        }
                    }
                ],
                announcementList: [ ]
            };
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                mAxios.get(urls.teacher.announcement.list).then(res=>{
                    let resData = res.data;
                    console.log(resData);
                    if(resData.state==='SUCCESS'){
                        this.announcementList = resData.data;
                    }else {
                        this.$Message.error(this.$t(`teacher.announcement.${resData.msg}`));
                        this.announcementList = [];
                    }
                }).catch(error => {
                    this.$Message.error(this.$t('login.networkError'));
                    console.info(error);
                });
            },
            toAdd() {
                this.$router.push({path: `/teacher/announcements/add/`});
            },
            toEdit(id) {
                this.$router.push({path: `/teacher/announcement/${id}`});
            },
            toDelete(id) {
                console.log(id);
                this.$Modal.confirm({
                    title: this.$t('teacher.announcement.deleteConfirm.title'),
                    content: this.$t('teacher.announcement.deleteConfirm.content'),
                    okText: this.$t('teacher.announcement.deleteConfirm.okText'),
                    cancelText: this.$t('teacher.announcement.deleteConfirm.cancelText'),
                    onOk: () => {
                        // 先发请求从数据库中删除，
                        mAxios.get(`${urls.teacher.announcement.delete}?id=${id}`).then(res=>{
                            let resData = res.data;
                            if(resData.state==='SUCCESS'){
                                this.$Message.success(this.$t(`teacher.announcement.deleteConfirm.deleteSuccess`));
                                // 再从list中删除
                                this.announcementList.map((item, index) => {
                                    if(item.id===id){
                                        this.announcementList.splice(index, 1);
                                        return;
                                    }
                                });
                            }else {
                                this.$Message.error(this.$t(`teacher.announcementEdit.${resData.msg}`));
                            }
                        }).catch(error => {
                            this.$Message.error(this.$t('login.networkError'));
                            console.info(error);
                        });
                    }
                });
            }
        }
    };
</script>

<style scoped>

</style>

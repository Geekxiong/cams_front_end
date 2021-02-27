<template>
    <div>
        <h2 style="padding-bottom: 10px; margin: 0 0 0 10px">
            {{ $t('teacher.courseware.title') }}
            <div style="float: right">
                <Button @click="toAdd()">
                    {{ $t('teacher.courseware.upload') }}
                </Button>
                <Button @click="back()">
                    {{ $t('teacher.courseware.back') }}
                </Button>
            </div>
        </h2>
        <Table
            stripe
            :columns="columns"
            :data="coursewareList"
            :draggable="true"
            @on-drag-drop="onDragDrop"
        >
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="downloadCourseware(row.savePath)">{{ $t('teacher.courseware.download') }}</Button>
                <Button type="info" size="small" style="margin-right: 5px" @click="toEdit(row.id)">{{ $t('teacher.courseware.edit') }}</Button>
                <Button type="error" size="small" @click="toDelete(row.id)">{{ $t('teacher.courseware.delete') }}</Button>
            </template>
        </Table>

    </div>
</template>

<script>
    import util from "../../../util";
    import {mAxios, urls} from "../../../api/api";

    export default {
        name: "Courseware",
        data() {
            return {
                courseId: this.$route.params.cid,
                modalShow: false,
                columns: [
                    {
                        title: '#',
                        key: 'id',
                        width: 70
                    },
                    {
                        title: this.$t("teacher.courseware.name"),
                        key: 'name'
                    },
                    {
                        title: this.$t("teacher.courseware.description"),
                        key: 'description'
                    },
                    {
                        title: this.$t("teacher.courseware.uploadTime"),
                        key: 'uploadTime',
                        render: (h, params) => {
                            return h('div', util.dateFormat(params.row.uploadTime));
                        }
                    },
                    {
                        title: this.$t("teacher.courseware.action"),
                        slot: 'action',
                        // width: 150,
                        align: 'center'
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
                mAxios.get(`${urls.teacher.courseware.list}?courseId=${this.courseId}`).then(res=>{
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
            back(){
                this.$router.push({path: `/teacher/courses`});
            },
            toAdd() {
                this.$router.push({path: `/teacher/course/${this.courseId}/coursewares/add`});
            },
            toEdit(id) {
                this.$router.push({path: `/teacher/course/${this.courseId}/courseware/${id}`});
            },
            downloadCourseware(savePath) {
                console.log(savePath);
                let b = util.ossGet(savePath);
                if(b){

                }else {

                }
            },
            toDelete(id) {
                console.log(id);
                this.$Modal.confirm({
                    title: this.$t('teacher.courseware.deleteConfirm.title'),
                    content: this.$t('teacher.courseware.deleteConfirm.content'),
                    okText: this.$t('teacher.courseware.deleteConfirm.okText'),
                    cancelText: this.$t('teacher.courseware.deleteConfirm.cancelText'),
                    onOk: () => {
                        // 先发请求从数据库中删除，
                        mAxios.get(`${urls.teacher.courseware.delete}?id=${id}`).then(res=>{
                            let resData = res.data;
                            if(resData.state==='SUCCESS'){
                                this.$Message.success(this.$t(`teacher.courseware.deleteConfirm.deleteSuccess`));
                                // 再从list中删除
                                this.coursewareList.map((item, index) => {
                                    if(item.id===id){
                                        this.coursewareList.splice(index, 1);
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
                    }
                });
            },
            onDragDrop(a,b){
                console.log(a,b);
                this.courseList.splice(b,1,...this.courseList.splice(a, 1 , this.courseList[b]));
                let data = [];
                for(let i=0; i<this.courseList.length; i++){
                    data[i] = {
                        id: this.courseList[i].id,
                        index_: i
                    };
                }
                console.log(data);
            }
        }
    };
</script>

<style scoped>

</style>

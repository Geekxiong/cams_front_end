<template>
    <div>
        <h2 style="padding-bottom: 10px; margin: 0 0 0 10px">
            {{ $t('teacher.assignment.title') }}
            <div style="float: right">
                <Button @click="toAdd()">
                    {{ $t('teacher.assignment.add') }}
                </Button>
                <Button @click="back()">
                    {{ $t('teacher.assignment.back') }}
                </Button>
            </div>
        </h2>
        <Table
            stripe
            :columns="columns"
            :data="assignmentList"
            :draggable="true"
            @on-drag-drop="onDragDrop"
        >
            <template slot-scope="{ row, index }" slot="action">
                <Button type="success" size="small" style="margin-right: 5px" @click="toViewSubmission(row.id)">{{ $t('teacher.assignment.viewSubmission') }}</Button>
                <Button type="info" size="small" style="margin-right: 5px" @click="toEdit(row.id)">{{ $t('teacher.assignment.edit') }}</Button>
                <Button type="error" size="small" @click="toDelete(row.id)">{{ $t('teacher.assignment.delete') }}</Button>
            </template>
        </Table>
    </div>
</template>

<script>
    import {mAxios, urls} from "../../../api/api";
    import util from "../../../util";

    export default {
        name: "Assignment",
        data() {
            return {
                courseId: this.$route.params.cid,
                columns: [
                    {
                        title: '#',
                        key: 'id',
                        width: 70
                    },
                    {
                        title: this.$t('teacher.assignment.name'),
                        key: 'name'
                    },
                    {
                        title: this.$t('teacher.assignment.description'),
                        key: 'description',
                        ellipsis: true
                    },
                    {
                        title: this.$t('teacher.assignment.startTime'),
                        key: 'startTime',
                        render: (h, params) => {
                            return h('div', util.dateFormat(params.row.startTime,));
                        }
                    },
                    {
                        title: this.$t('teacher.assignment.endTime'),
                        key: 'endTime',
                        render: (h, params) => {
                            return h('div', util.dateFormat(params.row.endTime,));
                        }
                    },
                    {
                        title: this.$t("student.assignment.action"),
                        slot: 'action',
                        align: 'center',
                    }
                ],
                assignmentList: [
                    {
                        id: 1,
                        index_: 1,
                        name: '密码学与信息安全',
                        description: "密码学与信息安全密码学与信息安全",
                        startTime: '2020-02-01 12:00:00',
                        endTime: '2020-06-01 12:00:00',
                    },
                ]
            };
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                mAxios.get(`${urls.teacher.assignment.list}?courseId=${this.courseId}`).then(res=>{
                    let resData = res.data;
                    console.log(resData);
                    if(resData.state==='SUCCESS'){
                        this.assignmentList = resData.data;
                    }else {
                        this.$Message.error(this.$t(resData.msg));
                        this.assignmentList = [];
                    }
                }).catch(error => {
                    this.$Message.error(this.$t('login.networkError'));
                    console.info(error);
                });
            },
            back() {
                this.$router.push({path: `/teacher/courses`});
            },
            toAdd() {
                this.$router.push({path: `/teacher/course/${this.courseId}/assignments/add`});
            },
            toViewSubmission(id) {
                this.$router.push({path: `/teacher/course/${this.courseId}/assignment/${id}/submissions`});
            },
            toEdit(id) {
                this.$router.push({path: `/teacher/course/${this.courseId}/assignment/${id}`});
            },
            toDelete(id) {
                console.log(id);
                this.$Modal.confirm({
                    title: this.$t('teacher.assignment.deleteConfirm.title'),
                    content: this.$t('teacher.assignment.deleteConfirm.content'),
                    okText: this.$t('teacher.assignment.deleteConfirm.okText'),
                    cancelText: this.$t('teacher.assignment.deleteConfirm.cancelText'),
                    onOk: () => {
                        // this.$Message.info('Clicked ok');
                        // 先发请求从数据库中删除，
                        // 再从list中删除
                        this.assignmentList.map((item, index) => {
                            if(item.id===id){
                                this.assignmentList.splice(index, 1);
                                return;
                            }
                        });
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            },
            onDragDrop(a,b){
                console.log(a,b);
                this.assignmentList.splice(b,1,...this.assignmentList.splice(a, 1 , this.assignmentList[b]));
                let data = [];
                for(let i=0; i<this.assignmentList.length; i++){
                    data[i] = {
                        id: this.assignmentList[i].id,
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

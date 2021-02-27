<template>
    <div>
        <h2 style="padding-bottom: 10px; margin: 0 0 0 10px">
            {{ $t('teacher.submissionView.title') }}
            <div style="float: right">
                <Button  @click="back()">
                    {{ $t('teacher.submissionView.downloadAll') }}
                </Button>
                <Button  @click="back()">
                    {{ $t('teacher.submissionView.back') }}
                </Button>
            </div>

        </h2>
        <Table stripe :columns="columns" :data="submitList" ref="table">
            <template slot-scope="{ row, index }" slot="score">
                <InputNumber
                    size="small"
                    :max="100" :min="0"
                    :active-change="false"
                    @on-change="scoreChanged($event, index)"
                    v-model="row.score">

                </InputNumber>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small">{{ $t('teacher.submissionView.listCol.download') }}</Button>
            </template>
        </Table>
        <br>
        <Button type="primary" @click="exportData()">
            <Icon type="ios-download-outline"></Icon>
            {{ $t('teacher.submissionView.exportText') }}
        </Button>

    </div>
</template>

<script>


    export default {
        name: "SubmissionView",
        data(){
            return {
                courseId: this.$route.params.cid,
                assignmentId: this.$route.params.id,
                columns: [
                    {
                        type: "index",
                        title: '#',
                        maxWidth: 70,
                        minWidth: 50
                    },
                    {
                        title: this.$t("teacher.submissionView.listCol.number"),
                        key: 'number',
                        minWidth: 200
                    },
                    {
                        title: this.$t("teacher.submissionView.listCol.name"),
                        key: 'name',
                        minWidth: 150
                    },
                    {
                        title: this.$t("teacher.submissionView.listCol.status"),
                        key: 'status',
                        width: 120,
                        filters: [
                            {
                                label: this.$t("teacher.submissionView.listCol.submitted"),
                                value: 1
                            },
                            {
                                label: this.$t("teacher.submissionView.listCol.unSubmitted"),
                                value: 0
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            return row.status === value;
                        },
                        render: (h, params) => {
                            if(params.row.status===1){
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            color: 'success'
                                        }
                                    }, this.$t("teacher.submissionView.listCol.submitted"))
                                ]);
                            }else {
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            color: 'error'
                                        }
                                    }, this.$t("teacher.submissionView.listCol.unSubmitted"))
                                ]);
                            }
                        }
                    },
                    {
                        title: this.$t("teacher.submissionView.listCol.submitTime"),
                        key: 'submitTime',
                        width: 180,
                    },
                    {
                        title: this.$t("teacher.submissionView.listCol.score"),
                        slot: 'score',
                        width: 100,
                        fixed: 'right',
                    },
                    {
                        title: this.$t("teacher.submissionView.listCol.action"),
                        slot: "action",
                        width: 120,
                        fixed: 'right',
                    },
                ],
                submitList: [
                    {
                        id: 1,
                        number: "1909853mii20001",
                        name: "熊世唯",
                        status: 1,
                        submitTime: "2020/03/11 10:55:11",
                        score: 83,

                    },{
                        id: 2,
                        number: "1909853yii20002",
                        name: "王荟斌",
                        status: 1,
                        submitTime: "2020/03/12 11:32:35",
                        score: 85,

                    },{
                        id: 3,
                        number: "19098530ii20001",
                        name: "白宇",
                        status: 0,
                        submitTime: "-",
                        score: '',
                    }
                ],
            };
        },
        methods: {
            back(){
                this.$router.push({path: `/teacher/course/${this.courseId}/assignments`});
            },
            scoreChanged(value, index){
                console.log(value, index);
            },
            statusText(status){
                if(status!==1){
                    return this.$t("teacher.submissionView.listCol.submitted");
                }else {
                    return this.$t("teacher.submissionView.listCol.unSubmitted");
                }
            },
            exportData () {
                let newColumns = [
                    {
                        title: "#",
                        key: "index"
                    },
                    {
                        title: this.$t("teacher.submissionView.listCol.number"),
                        key: 'number'
                    },
                    {
                        title: this.$t("teacher.submissionView.listCol.name"),
                        key: 'name'
                    },
                    {
                        title: this.$t("teacher.submissionView.listCol.status"),
                        key: 'status'
                    },
                    {
                        title: this.$t("teacher.submissionView.listCol.submitTime"),
                        key: 'submitTime',
                    },
                    {
                        title: this.$t("teacher.submissionView.listCol.score"),
                        key: 'score',
                    }
                ];
                let newData = [];
                for(let i=0;i<this.submitList.length;i++){
                    let item = this.submitList[i];
                    newData.push({
                        index: String(i+1),
                        number: item.number,
                        name: item.name,
                        status: this.statusText(item.status),
                        submitTime: item.submitTime,
                        score: String(item.score)
                    });
                }
                this.$refs.table.exportCsv({
                    filename: `course[${this.courseId}]_assignment[${this.assignmentId}]_submission`,
                    columns: newColumns,
                    data: newData
                });
            }
        }
    };
</script>

<style scoped>

</style>

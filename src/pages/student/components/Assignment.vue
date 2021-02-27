<template>
    <div>
        <Table
            stripe
            :columns="columns"
            :data="courseList"
        ></Table>
    </div>
</template>

<script>
    export default {
        name: "Assignment",
        props: ['courseId'],
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
                        title: this.$t("student.assignment.name"),
                        key: 'name'
                    },
                    {
                        title: this.$t("student.assignment.description"),
                        key: 'description',
                        ellipsis: true
                    },
                    {
                        title: this.$t("student.assignment.startTime"),
                        key: 'startTime'
                    },
                    {
                        title: this.$t("student.assignment.endTime"),
                        key: 'endTime'
                    },
                    {
                        title: this.$t("student.assignment.score"),
                        key: 'score',
                        width: 80
                    },
                    {
                        title: this.$t("student.assignment.action"),
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
                                }, this.$t("student.assignment.detail"))
                            ]);
                        }
                    }
                ],
                courseList: [
                    {
                        id: 1,
                        index_: 1,
                        name: '密码学与信息安全',
                        description: "密码学与信息安全密码学与信息安全",
                        startTime: '2020-02-01 12:00:00',
                        endTime: '2020-06-01 12:00:00',
                        score: 80
                    },
                ]
            };
        },
        methods: {
            toDetail(id) {
                console.log(id);
                this.$router.push({path: `/course/${this.courseId}/assignment/${id}`});
            }
        }
    };
</script>

<style scoped>

</style>

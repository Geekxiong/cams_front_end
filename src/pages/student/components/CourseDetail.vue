<template>
    <div style="padding-left: 10px">
        <h2 style="padding-bottom: 10px;">
            {{courseInfo.name}}
            <Button
                style="float: right"
                @click="toCourseList()"
            >
                {{ $t("student.courseDetail.courseList") }}
            </Button>
        </h2>
        <p>
            <span
                style="margin-right: 30px"
                title="teacher"
            >
                <Icon type="md-person"/>
                {{courseInfo.teacherName}}
            </span>
            <span title="授课时间">
                <Icon type="md-time"/>
                {{courseInfo.startTime}} - {{courseInfo.endTime}}
            </span>
        </p>
        <div class="content">
            {{courseInfo.description}}
        </div>
        <Tabs v-model="currentTab">
            <TabPane
                :label="$t('student.courseDetail.coursewareTab')"
                name="coursewareTab"
            >
                <Courseware :courseId="id"/>
            </TabPane>
            <TabPane
                :label="$t('student.courseDetail.assignmentTab')"
                name="assignmentTab"
            >
                <Assignment :courseId="id"/>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import Courseware from "./Courseware";
    import Assignment from "./Assignment";
    import {mAxios, urls} from "../../../api/api";
    import util from "../../../util";

    export default {
        name: "CourseDetail",
        components: {
            Courseware,
            Assignment
        },
        data() {
            return {
                id: this.$route.params.id,
                url_hash: this.$route.hash,
                currentTab: "coursewareTab",
                courseInfo: {},
            };
        },
        mounted() {
            this.getCourseInfo();
        },
        methods: {
            toCourseList() {
                this.$router.push({path: '/courses'});
            },
            getCourseInfo(){
                mAxios.get(`${urls.student.course.get}?id=${this.id}`).then(res=>{
                    let resData = res.data;
                    console.log(resData);
                    if(resData.state==='SUCCESS'){
                        this.courseInfo = {
                            id: resData.data.id,
                            name: resData.data.name,
                            startTime: util.dateFormat(resData.data.startTime,"YYYY/MM/DD"),
                            endTime: util.dateFormat(resData.data.endTime, "YYYY/MM/DD"),
                            description: resData.data.description,
                            teacherName: resData.data.teacher.name
                        };
                    }else {
                        this.$Message.error(this.$t(`${resData.msg}`));
                    }
                }).catch(error => {
                    this.$Message.error(this.$t('login.networkError'));
                    console.info(error);
                });
            }
        }
    };
</script>

<style scoped>
    .content {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid rgba(34, 36, 38, .15);
    }
</style>

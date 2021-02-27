<template>
    <div>
        <h2 style="padding-bottom: 10px; margin: 0 0 0 10px">
            <template v-if="reuse==='edit'">
                {{ $t('teacher.courseEdit.editTitle') }}
            </template>
            <template v-else>
                {{ $t('teacher.courseEdit.addTitle') }}
            </template>

            <Button style="float: right" @click="back()">
                {{ $t('teacher.courseEdit.back') }}
            </Button>
        </h2>
        <Tabs value="tab1" style="height: 650px">
            <TabPane :label="$t('teacher.courseEdit.courseInfoTitle')" name="tab1">
                <CourseInfo :reuse="reuse" :id="id"/>
            </TabPane>
            <TabPane :label="$t('teacher.courseEdit.studentListTitle')" name="tab2">
                <StudentList :reuse="reuse" :id="id"/>
            </TabPane>
        </Tabs>

    </div>
</template>

<script>
    import CourseEdit_CourseInfo from "@/pages/teacher/components/CourseEdit_CourseInfo";
    import CourseEdit_StudentList from "@/pages/teacher/components/CourseEdit_StudentList";
    export default {
        name: "CourseEdit",
        components: {
            StudentList: CourseEdit_StudentList,
            CourseInfo: CourseEdit_CourseInfo
        },
        data(){
            return{
                id: this.$route.params.id,
                reuse: this.$route.meta.reuse,

            };
        },
        methods: {
            back(){
                this.$router.push({path: "/teacher/courses"});
            }
        },

    };
</script>

<style scoped>

</style>

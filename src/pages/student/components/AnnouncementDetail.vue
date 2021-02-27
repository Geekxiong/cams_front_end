<template>
    <div style="padding-left: 10px">
        <h2 style="padding-bottom: 10px;">
            {{ announcement.title }}
            <small>
                {{ announcement.courseName }}
            </small>
            <Button
                style="float: right"
                @click="goback()"
            >
                {{ $t("student.announcementDetail.back") }}
            </Button>
        </h2>
        <p>
            <span style="margin-right: 30px">
                <Icon type="md-person"/>
                {{ announcement.teacherName}}
            </span>
            <span>
                <Icon type="ios-create"/>
                {{ announcement.editTime }}
            </span>
        </p>
        <div class="content">
            {{ announcement.content }}
        </div>
    </div>
</template>

<script>
    import {mAxios, urls} from "../../../api/api";
    import util from "../../../util";

    export default {
        name: "AnnouncementDetail",
        data() {
            return {
                id: this.$route.params.id,
                announcement: {
                    title: "",
                    content: "",
                    editTime: "",
                    teacherName: "",
                    courseName: "",
                }
            };
        },
        mounted(){
            this.getAnnouncementInfo();
        },
        methods: {
            goback() {
                if (window.history.length <= 1) {
                    this.$router.push({path: '/'});
                } else {
                    this.$router.go(-1);
                }
            },
            getAnnouncementInfo(){
                mAxios.get(`${urls.teacher.announcement.get}?id=${this.id}`).then(res=>{
                    let resData = res.data;
                    console.log(resData);
                    if(resData.state==='SUCCESS'){
                        this.announcement.title = resData.data.title;
                        this.announcement.content = resData.data.description;
                        this.announcement.editTime = util.dateFormat(resData.data.editTime);
                        this.announcement.teacherName = resData.data.course.teacher.name;
                        this.announcement.courseName = resData.data.course.name;
                    }else {
                        this.$Message.error(this.$t(`teacher.announcementEdit.${resData.msg}`));
                    }
                }).catch(error => {
                    this.$Message.error(this.$t('login.networkError'));
                    console.info(error);
                });
            },
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

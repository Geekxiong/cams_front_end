<template>
    <div style="padding-left: 10px">
        <h2 style="padding-bottom: 10px;">
            计算机网络第一次作业
            <small>计算机网络</small>
            <Button
                style="float: right"
                @click="toCourse()"
            >
                {{ $t("student.assignmentDetail.toCourseDetail") }}
            </Button>
        </h2>
        <p>
            <span>
                {{ $t("student.assignmentDetail.startTime") }}: 2020/02/01 12:00:00
            </span>
            <br>
            <span>
                {{ $t("student.assignmentDetail.endTime") }}: 2020/02/10 12:00:00
            </span>
            <br>
            <span>
                {{ $t("student.assignmentDetail.score") }}: 未评分
            </span>
        </p>

        <div class="content">
            《信息安全与密码学》是2007年清华大学出版社出版的图书，作者是徐茂智。本书可作为数学、计算机科学、通信、电子工程等相关专业的本科高年级学生或研究生一个学期课程的教材或参考书。
        </div>


        <Divider orientation="left">
            {{ $t("student.assignmentDetail.annexList") }}
        </Divider>
        <div style="margin-bottom: 20px">
            <Card
                v-for="(annex, index) in annexList"
                :key="index"
                class="annex-card"
            >
                <div
                    style="text-align:center"
                    :title="$t('student.assignmentDetail.clickToDownload')"
                    @click="downloadAnnex(annex.id)"
                >
                    <Avatar
                        style="color: #ffffff;background-color: #54a9f5"
                        shape="square"
                        size="large"
                    >
                        {{ getSuffix(annex.name) }}
                    </Avatar>
                    <p style="word-wrap:break-word; margin-top: 5px">
                        {{ annex.name }}
                    </p>
                </div>
            </Card>
        </div>

        <Divider orientation="left">
            {{ $t("student.assignmentDetail.uploadedFile") }}
        </Divider>
        <div style="margin-bottom: 20px">
            <List>
                <ListItem>
                    <ListItemMeta
                        title="1909853mii200019_熊世唯.zip"
                        description="2020/03/03 15:57:00"
                    />
                    <template slot="extra">
                        <Button>{{ $t("student.assignmentDetail.download") }}</Button>
                    </template>
                </ListItem>
            </List>
        </div>


        <Upload
            type="drag"
            accept="application/zip,.rar,.7z,application/x-tar,application/gzip"
            action="/api/assignment/uploadAssignment"
        >
            <div style="padding: 20px 0">
                <Icon
                    type="ios-cloud-upload"
                    size="52"
                    style="color: #3399ff"
                />
                <p>{{ $t("student.assignmentDetail.uploadText") }}</p>
            </div>
        </Upload>
    </div>
</template>

<script>
    export default {
        name: "AssignmentDetail",
        data() {
            return {
                cid: this.$route.params.cid,
                aid: this.$route.params.aid,
                annexList: [{
                    "id": 1,
                    "name": "作业01.pdf"
                }, {
                    "id": 2,
                    "name": "数据.xlxs"
                }, {
                    "id": 3,
                    "name": "数据2.doc"
                }, {
                    "id": 4,
                    "name": "数据3.xlx"
                }, {
                    "id": 5,
                    "name": "演示.ppt"
                }]
            };
        },
        methods: {
            toCourse() {
                this.$router.push({path: `/course/${this.aid}`});
            },
            getSuffix(name) {
                return name.substring(name.lastIndexOf('.') + 1).toUpperCase();
            },
            downloadAnnex(id) {
                console.log(id);
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

    .annex-card {
        width: 150px;
        display: inline-block;
        margin: 0 10px 10px 0;
    }
</style>

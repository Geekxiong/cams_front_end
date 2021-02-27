<template>
    <div>
        <h2 style="padding-bottom: 10px; margin: 0 0 0 10px">
            {{ $t('admin.studentList.title') }}
            <Button style="float: right" @click="toAdd()">
                {{ $t('admin.studentList.add') }}
            </Button>

        </h2>
        <Row :gutter="10">
            <Col span="6" >
            <Select size="small" v-model="searchType">
                <Option value="name">{{ $t('admin.studentList.name') }}</Option>
                <Option value="number">{{ $t('admin.studentList.number') }}</Option>
                <Option value="class">{{ $t('admin.studentList.class') }}</Option>
            </Select>
            </Col>
            <Col span="18">
            <Input
                search enter-button
                size="small"
                v-model="searchWord"
                @on-search="search"
                :placeholder="$t('admin.studentList.searchHit')" />
            </Col>
        </Row>

        <Table stripe :columns="columns" :data="studentList">

            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small" style="margin-right: 5px" @click="toEdit(row.id)">{{ $t('admin.studentList.edit') }}</Button>
                <Button type="error" size="small" @click="toDelete(row.id)">{{ $t('admin.studentList.delete') }}</Button>
            </template>
        </Table>
        <div style="margin-top: 10px">
            <Upload
                accept=".xls,.xlsx,.csv"
                :before-upload="handleSelectFile"
                action="">
                <Button icon="ios-cloud-upload-outline" :loading="loadingStatus">{{ $t('admin.studentList.importStudents') }}</Button>
            </Upload>
        </div>
    </div>
</template>

<script>
    import util from "@/util";

    export default {
        name: "StudentList",
        data() {
            return {
                searchType: "name",
                searchWord: "",
                loadingStatus: false,
                columns: [
                    {
                        type: "index",
                        title: '#',
                        width: 70
                    },
                    {
                        title: this.$t("admin.studentList.number"),
                        key: 'number',
                        width: '150'
                    },
                    {
                        title: this.$t("admin.studentList.name"),
                        key: 'name',
                        width: '120'
                    },
                    {
                        title: this.$t("admin.studentList.email"),
                        key: 'email',
                        width: '300'
                    },
                    {
                        title: this.$t("admin.studentList.class"),
                        key: 'class'
                    },
                    {
                        title: this.$t("admin.studentList.action"),
                        slot: 'action',
                        align: 'center'
                    }
                ],
                studentList: [{
                    id: 1,
                    number: "1909853mii20001",
                    name: "熊世唯",
                    email: "1909853mii20001@student.must.edu.mo",
                    class: "2019级资讯系统班"
                },{
                    id: 2,
                    number: "1909853yii20002",
                    name: "王荟斌",
                    email: "1909853yii20002@student.must.edu.mo",
                    class: "2019级资讯系统班"
                },{
                    id: 3,
                    number: "19098530ii20001",
                    name: "白宇",
                    email: "19098530ii20001@student.must.edu.mo",
                    class: "2019级资讯系统班"
                }]
            };
        },
        methods: {
            toAdd() {
                this.$router.push({path: `/admin/students/add`});
            },
            toEdit(id) {
                this.$router.push({path: `/admin/student/${id}`});
            },
            search(){
                console.log(this.searchType, this.searchWord);
            },
            toDelete(id) {
                console.log(id);
                this.$Modal.confirm({
                    title: this.$t('admin.studentList.deleteConfirm.title'),
                    content: this.$t('admin.studentList.deleteConfirm.content'),
                    okText: this.$t('admin.studentList.deleteConfirm.okText'),
                    cancelText: this.$t('admin.studentList.deleteConfirm.cancelText'),
                    onOk: () => {
                        // this.$Message.info('Clicked ok');
                        // 先发请求从数据库中删除，
                        // 再从list中删除
                        this.studentList.map((item, index) => {
                            if (item.id === id) {
                                this.studentList.splice(index, 1);
                                return;
                            }
                        });
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            },
            /**
             * 上传前处理
             * 先检测格式和大小
             * 再上传
             * @param file
             */
            handleSelectFile(file) {
                let fileTypes = ["xls","xlsx","csv","XLS","XLSX","CSV"];
                if(!util.checkFileType(file, fileTypes)){
                    this.$Notice.warning({
                        title: this.$t('admin.studentList.fileTypeWarning'),
                        desc: this.$t('admin.studentList.fileTypeWarningDesc').replace('file.name', file.name)
                    });
                    return false;
                }else if(!util.checkFileSize(file, 2)){
                    this.$Notice.warning({
                        title: this.$t('admin.studentList.fileSizeWarning'),
                        desc: this.$t('admin.studentList.fileSizeWarningDesc').replace('file.name', file.name)
                    });
                    return false;
                }

                // 准备好要上传的文件
                let form = new window.FormData();
                form.append('file', file);
                this.loadingStatus = true;
                // 开始上传
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success');
                }, 2000);
                // 上传成功后刷新列表

                return false;
            },
        },

    };
</script>

<style scoped>

</style>

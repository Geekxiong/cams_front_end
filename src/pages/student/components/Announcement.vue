<template>
    <div>
        <h2 style="padding-bottom: 10px; margin: 0 0 0 10px">
            {{ $t("student.announcement.title") }}
            <Button style="float: right">
                {{ $t("student.announcement.refresh") }}
            </Button>
        </h2>
        <List>
            <ListItem v-for="(item, index) in announcementList" :key="index">
                <ListItemMeta
                    :title="item.title"
                    :description="item.description"
                >
                    <Avatar slot="avatar" style="font-size:14px">
                        {{item.course.teacher.name.charAt(0)}}
                    </Avatar>
                </ListItemMeta>
                <template slot="action">
                    <li>
                        <Button
                            type="text"
                            @click="toDetail(item.id)"
                        >
                            {{ $t("student.announcement.detail") }}
                        </Button>
                    </li>
                </template>
            </ListItem>
        </List>
    </div>
</template>

<script>
    import {mAxios, urls} from "../../../api/api";

    export default {
        name: "Announcement",
        data() {
            return {
                announcementList: []
            };
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                mAxios.get(urls.student.announcement.list).then(res=>{
                    let resData = res.data;
                    console.log(resData);
                    if(resData.state==='SUCCESS'){
                        this.announcementList = resData.data;
                    }else {
                        this.$Message.error(this.$t(`${resData.msg}`));
                        this.announcementList = [];
                    }
                }).catch(error => {
                    this.$Message.error(this.$t('login.networkError'));
                    console.info(error);
                });
            },
            toDetail(id) {
                console.log(id);
                this.$router.push({path: `/announcement/${id}`});
            }
        }
    };
</script>

<style scoped>

</style>

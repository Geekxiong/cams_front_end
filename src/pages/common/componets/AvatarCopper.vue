<template>
    <div class="setting-main">
        <!-- 当avatarOption.imgSrc中没有数据时，显示上传框 -->
        <template v-if="!avatarOption.imgSrc">
            <Upload
                type="drag"
                class="mini-container"
                accept=".jpg,.jpeg,.png,.bmp,.gif"
                action=""
                :before-upload="handleSelectFile"
            >
                <div style="padding: 30px 0">
                    <Icon
                        type="ios-cloud-upload"
                        size="52"
                        style="color: #3399ff"
                    />
                    <p>{{ $t('common.avatarCopper.uploadText') }}</p>
                </div>
            </Upload>
        </template>
        <!-- 当avatarOption.imgSrc中有数据时，显示图片编辑组件 -->
        <template v-else>
            <div class="flex-container">
                <div class="cropper-main inline">
                    <vueCropper
                        ref="cropper"
                        auto-crop
                        fixed
                        :auto-crop-width="200"
                        :auto-crop-height="200"
                        :img="avatarOption.imgSrc"
                        :output-size="avatarOption.size"
                        :output-type="avatarOption.outputType"
                        :info="true"
                        @realTime="realTime"
                    >
                    </vueCropper>
                </div>
                <ButtonGroup
                    vertical
                    class="cropper-btn"
                >
                    <Button @click="rotate('left')">
                        {{ $t('common.avatarCopper.rotateLeft') }}
                    </Button>
                    <Button @click="rotate('right')">
                        {{ $t('common.avatarCopper.rotateRight') }}
                    </Button>
                    <Button @click="reselect">
                        {{ $t('common.avatarCopper.reselect') }}
                    </Button>
                    <Button @click="finishCrop">
                        {{ $t('common.avatarCopper.done') }}
                    </Button>
                </ButtonGroup>
                <div
                    class="cropper-preview inline"
                    :style="previewStyle"
                >
                    <div :style=" preview.div">
                        <img
                            :src="avatarOption.imgSrc"
                            :style="preview.img"
                            alt=""/>
                    </div>
                </div>
            </div>
        </template>


        <Modal
            v-model="uploadModalVisible"
            :title="this.$t('common.avatarCopper.uploadModalTitle')"
        >
            <div class="upload-modal">
                <p class="notice">
                    {{ $t('common.avatarCopper.uploadTips') }}:
                </p>
                <img :src="uploadImgSrc" alt=""/>
            </div>
            <div slot="footer">
                <Button
                    :loading="loadingUploadBtn"
                    @click="uploadAvatar"
                >
                    {{ $t('common.avatarCopper.upload') }}
                </Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {VueCropper} from 'vue-cropper';
    import util from "@/util";

    export default {
        components: {
            VueCropper
        },
        data() {
            return {
                loadingSaveBtn: false,
                loadingUploadBtn: false,
                uploadModalVisible: false,
                preview: {},
                uploadImgSrc: '',
                avatarOption: {
                    imgSrc: '',
                    size: 0.8,
                    outputType: 'png'
                },

            };
        },
        computed: {
            previewStyle() {
                return {
                    'width': this.preview.w + 'px',
                    'height': this.preview.h + 'px',
                    'overflow': 'hidden'
                };
            }
        },
        mounted() {
            // let profile = this.$store.state.student.profile
            // Object.keys(this.formProfile).forEach(element => {
            //     if (profile[element] !== undefined) {
            //         this.formProfile[element] = profile[element]
            //     }
            // })
        },
        methods: {
            /**
             * 上传前处理
             * 先检测图片格式和大小
             * 然后将图片读入 avatarOption.imgSrc
             * @param file
             */
            handleSelectFile(file) {
                let fileTypes = ["gif","jpg","jpeg","png","bmp","GIF","JPG","PNG"];
                if(!util.checkFileType(file, fileTypes)){
                    this.$Notice.warning({
                        title: this.$t('common.avatarCopper.fileTypeWarning'),
                        desc: this.$t('common.avatarCopper.fileTypeWarningDesc').replace('file.name', file.name)
                    });
                    return false;
                }else if(!util.checkFileSize(file, 2)){
                    this.$Notice.warning({
                        title: this.$t('common.avatarCopper.fileSizeWarning'),
                        desc: this.$t('common.avatarCopper.fileSizeWarningDesc').replace('file.name', file.name)
                    });
                    return false;
                }

                let reader = new window.FileReader();
                reader.onload = (e) => {
                    this.avatarOption.imgSrc = e.target.result;
                };
                reader.readAsDataURL(file);
                return false;
            },
            realTime(data) {
                // prwview 是图片预览数据
                this.preview = data;
            },
            /**
             * 旋转，左转90° 右转90°
             * @param direction
             */
            rotate(direction) {
                if (direction === 'left') {
                    this.$refs.cropper.rotateLeft();
                } else {
                    this.$refs.cropper.rotateRight();
                }
            },
            /**
             * 重新选择图片，清空avatarOption.imgSrc
             */
            reselect() {
                this.$Modal.confirm({
                    okText: this.$t('common.avatarCopper.okText'),
                    cancelText: this.$t('common.avatarCopper.okCancel'),
                    content: this.$t('common.avatarCopper.discardWarning'),
                    onOk: () => {
                        this.avatarOption.imgSrc = '';
                    }
                });
            },
            /**
             * 结束编辑选择准备上传
             */
            finishCrop() {
                this.$refs.cropper.getCropData(data => {
                    this.uploadImgSrc = data;
                    this.uploadModalVisible = true;
                });
            },
            /**
             * 上传编辑完的头像
             */
            uploadAvatar() {
                this.$refs.cropper.getCropBlob(blob => {
                    let form = new window.FormData();
                    let file = new window.File([blob], 'avatar.' + this.avatarOption.outputType);
                    form.append('image', file);
                    this.loadingUploadBtn = true;
                    this.$http({
                        method: 'post',
                        url: 'upload_avatar',
                        data: form,
                        headers: {'content-type': 'multipart/form-data'}
                    }).then(() => {
                        this.loadingUploadBtn = false;
                        this.$success('Successfully set new avatar');
                        this.uploadModalVisible = false;
                        this.avatarOption.imgSrc = '';
                        this.$store.dispatch('getProfile');
                    }, () => {
                        this.loadingUploadBtn = false;
                    });
                });
            },
        }
    };
</script>

<style lang="less" scoped>
    .inline {
        display: inline-block;
    }

    .copper-img {
        width: 400px;
        height: 300px;
    }

    .flex-container {
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-bottom: 10px;

        .cropper-main {
            flex: none;
            .copper-img;
        }

        .cropper-btn {
            flex: none;
            vertical-align: top;
        }

        .cropper-preview {
            flex: none;
            /*margin: 10px;*/
            margin-left: 20px;
            box-shadow: 0 0 1px 0;
            .copper-img;
        }
    }

    .upload-modal {
        .notice {
            font-size: 16px;
            display: inline-block;
            vertical-align: top;
            padding: 10px;
            padding-right: 15px;
        }

        img {
            box-shadow: 0 0 1px 0;
            border-radius: 50%;
        }
    }
</style>

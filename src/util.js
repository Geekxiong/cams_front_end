import moment from 'moment';
import {mAxios, urls} from "./api/api";
import OSS from 'ali-oss';
import { v4 as uuidv4 } from 'uuid';

const util = {
    title(title){
        title = title ? title + ' - Home' : 'iView project';
        window.document.title = title;
    },
    /**
     * 检测上传文件大小是否超标
     * @param file 文件
     * @param size 文件大小 单位MB
     */
    checkFileSize(file, size){
        if (file.size > size * 1024 * 1024) {
            return false;
        }
        return true;
    },
    /**
     * 检查文件后缀名是否正确
     * @param file 文件
     * @param types 后缀名类型是 array
     * @returns {boolean}
     */
    checkFileType(file, types){
        let regExp = new RegExp('\\.('+types.join('|')+')$');
        // console.log(regExp);
        if (!regExp.test(file.name)) {
            return false;
        }
        return true;
    },
    /**
     * 时间格式化
     * @param dataStr
     * @param pattern
     * @returns {string}
     */
    dateFormat(dataStr, pattern = 'YYYY-MM-DD HH:mm') {
        return moment(dataStr).format(pattern);
    },
    /**
     * 获取UUID
     * @returns {*}
     */
    getUUID(){
        return uuidv4();
    },
    /**
     * 检查OSSAUTH是否有效
     * @param type
     * @returns {boolean}
     */
    checkOSSAuthAlive(type){
        type = type.toUpperCase();
        let ossAuth = window.localStorage.getItem("OSS."+type+".AUTH");
        if(ossAuth==null||ossAuth==undefined){
            return false;
        }
        ossAuth = JSON.parse(ossAuth);
        let expiration = new Date(this.dateFormat(ossAuth.expiration, 'YYYY-MM-DD HH:mm:ss'));
        let now = new Date();
        if(expiration.getTime() < now.getTime()){
            return false;
        }
        return true;
    },
    /**
     * 按照操作类型获取OSSAuth
     * @param type
     */
    getOSSAuth(type){
        mAxios.get(`${urls.common.oss.auth}?type=${type}`).then(res=>{
            let resData = res.data;
            console.log(resData);
            if(resData.state==='SUCCESS'){
                window.localStorage.setItem("OSS."+type+".AUTH", JSON.stringify(resData.data));
            }else {
                this.$Message.error(this.$t(`${resData.msg}`));
            }
        }).catch(error => {
            this.$Message.error(this.$t('login.networkError'));
            console.info(error);
        });
    },
    /**
     * 获取GET类型的OSSAUTH
     */
    getOSSGETAuth(){
        if(!this.checkOSSAuthAlive("PUT")){
            this.getOSSAuth("GET");
        }
    },
    /**
     * 获取PUT类型的OSSAUTH
     */
    getOSSPUTAuth(){
        if(!this.checkOSSAuthAlive("PUT")){
            this.getOSSAuth("PUT");
        }
    },
    /**
     * 进行OSS上传
     * @param filePath
     * @param file
     * @returns {Promise<boolean>}
     */
    ossPut: async function(filePath, file) {
        const putAuth = JSON.parse(window.localStorage.getItem("OSS.PUT.AUTH"));
        console.info(putAuth);
        const client = new OSS({
            region: putAuth.region.replace(".aliyuncs.com",""),
            //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
            accessKeyId: putAuth.accessKeyId,
            accessKeySecret: putAuth.accessKeySecret,
            stsToken: putAuth.securityToken,
            bucket: putAuth.bucket
        });
        try {
            let r1 = await client.put(filePath, file);
            console.log('put success: %j', r1);
        } catch (e) {
            console.error('error: %j', e);
            return false;
        }
        return true;
    },
    /**
     * 从OSS上下载文件
     * @param filePath
     * @returns {boolean}
     */
    ossGet(filePath){
        const auth = JSON.parse(window.localStorage.getItem("OSS.GET.AUTH"));
        console.info(auth);
        const client = new OSS({
            region: auth.region.replace(".aliyuncs.com",""),
            //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
            accessKeyId: auth.accessKeyId,
            accessKeySecret: auth.accessKeySecret,
            stsToken: auth.securityToken,
            bucket: auth.bucket
        });
        let url = client.signatureUrl(filePath, {expires: 3600});
        console.log(url);
        let link = document.createElement('a');
        // link.download = "";
        link.style.display = 'none';
        link.href = url;
        link.target="_blank";
        link.click();
    }

};

export default util;

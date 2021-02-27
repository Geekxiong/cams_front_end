const zh = {
    common: {
        userInfo: {
            title: "个人信息",
            changeAvatar: "更改头像",
            changePassword: "更改密码",
            userName: "姓名",
            studentNumber: "学号",
            teacherNumber: "工号",
            class: "班级",
            email: "邮箱",
            change: "更改",
            newEmail: "新邮箱",
            newEmailPlaceholder: "请输入新的邮箱地址",
            password: "密码",
            passwordPlaceholder: "请输入密码",
            newPassword: "新密码",
            newPasswordPlaceholder: "请输入新密码",
            cancelText: "取消",
            okText: "确定",
            selectAvatar: "选择头像"
        },
        avatarCopper: {
            uploadText: "拖拽或点击上传图片",
            rotateLeft: "左旋",
            rotateRight: "右旋",
            reselect: "重选",
            done: "完成",
            uploadModalTitle: "上传该头像",
            uploadTips: "您的头像将设置为",
            upload: "上传",
            fileTypeWarning: "文件类型不支持",
            fileTypeWarningDesc: "不支持 file.name 的文件格式，请选择图片文件。",
            fileSizeWarning: "超过最大大小限制",
            fileSizeWarningDesc: "文件 file.name 太大，您可以上传最大2MB的图像",
            discardWarning: "您确定要放弃更改吗？",
            okText: "确定",
            okCancel: "取消"
        }
    },
    login: {
        welcome: "欢迎登录",
        account: "账号",
        password: "密码",
        accountType: "账号类型",
        accountHit: "请输入账号",
        passwordHit: "请输入密码",
        accountTypeHit: "请选择账号类型",
        student: "学生",
        teacher: "老师",
        admin: "管理员",
        login: "登录",
        accountRequestMsg: "请填写您的用户名",
        passwordRequestMsg: "请填写您的密码",
        passwordLengthMsg: "密码长度不能少于6位",
        accountTypeRequestMsg: "请选择账号类型",
        loginSuccess: "登录成功",
        networkError: "网络错误请稍后再试",
        AccountOrPasswordWrong: "账号或密码错误",

    },
    student: {
        nav: {
            announcementTitle: "公告",
            courseTitle: "课程",
            userInfo: "个人信息",
            logout: "退出登录"
        },
        announcement: {
            title: "公告",
            refresh: "刷新",
            detail: "详情"
        },
        announcementDetail: {
            back: "返回"
        },
        course: {
            title: "课程列表",
            name: "课程名",
            teacherName: "任课老师",
            startTime: "开始时间",
            endTime: "结束时间",
            action: "操作",
            detail: "详情"
        },
        courseDetail: {
            courseList: "课程列表",
            coursewareTab: "课件",
            assignmentTab: "作业"
        },
        courseware: {
            name: "课件名",
            description: "描述",
            uploadTime: "上传时间",
            action: "操作",
            download: "下载"
        },
        assignment: {
            name: "课件名",
            description: "描述",
            startTime: "开始时间",
            endTime: "结束时间",
            action: "操作",
            detail: "详情",
            score: "评分"
        },
        assignmentDetail: {
            toCourseDetail: "课程详情",
            startTime: "开始时间",
            endTime: "截止时间",
            score: "评分",
            annexList: "附件列表",
            clickToDownload: "点击下载附件",
            uploadedFile: "已上传作业",
            download: "下载",
            uploadText: "点击或拖拽上传作业"
        }
    },
    teacher: {
        menu: {
            announcement: "公告",
            course: "课程",
            userInfo: "个人信息",
            logout: "注销"
        },
        announcement: {
            title: "公告",
            addNew: "新增",
            edit: "编辑",
            listCol: {
                title: "标题",
                description: "描述",
                courseName: "课程名",
                editTime: "编辑时间",
                action: "操作",
                edit: "编辑",
                delete: "删除",
            },
            deleteConfirm: {
                title: "确认删除",
                content: "您确定删除该公告吗？",
                okText: "确定",
                cancelText: "取消",
                deleteSuccess: "删除成功",
            }
        },
        announcementEdit: {
            editTitle: "编辑公告",
            addTitle: "新增公告",
            back: "返回",
            title: "标题",
            titleHit: "请输入公告标题",
            course: "课程",
            courseHit: "请选择公告所属课程",
            description: "内容",
            descriptionHit: "请输入公告内容",
            submit: "提交",
            reset: "重置",
            descriptionLengthWarning: "内容的长度不能超过500",
            addSuccess: "新增成功",
            editSuccess: "编辑成功",
            CourseNotFound: "课程不存在",
            CourseNotBelongToYou: "这不是你的课程",
            AnnouncementNotFound: "公告不存在",
        },
        course: {
            title: "课程列表",
            add: "新增",
            listCol: {
                name: "课程名",
                startTime: "开始时间",
                endTime: "结束时间",
                action: "操作",
                edit: "编辑",
                courseware: "课件",
                assignment: "作业",
                delete: "删除",
            },
            deleteConfirm: {
                title: "确认删除",
                content: "您确定删除该课程吗？",
                okText: "确定",
                cancelText: "取消",
                deleteSuccess: "成功删除"
            }
        },
        courseEdit: {
            editTitle: "编辑课程",
            addTitle: "新增课程",
            back: "返回",
            courseInfoTitle: "课程信息",
            studentListTitle: "学生列表",
            courseInfo: {
                name: "课程名称",
                nameHit: "请输入课程名称",
                description: "课程描述",
                descriptionHit: "请输入课程描述",
                courseTime: "开课时间",
                courseTimeHit: "请选择课程开课时间",
                submit: "提交",
                reset: "重置",
                descriptionLengthWarning: "描述的长度不能超过500",
                editSuccess: "编辑成功",
                addSuccess: "新增成功",
            },
            studentList: {
                listCol: {
                    number: "学号",
                    name: "姓名",
                    class: "班级",
                    email: "邮箱",
                    action: "操作",
                    remove: "移除"
                },
                deleteConfirm: {
                    title: "确认移除",
                    content: "您确定从课程中移除该学生吗？",
                    okText: "确定",
                    cancelText: "取消",
                },
                importStudents: "导入学生",
                fileTypeWarning: "文件类型不支持",
                fileTypeWarningDesc: "不支持 file.name 的文件格式，请选择Office Excel文件。",
                fileSizeWarning: "超过最大大小限制",
                fileSizeWarningDesc: "文件 file.name 太大，您可以上传最大100MB的文件",
                add: "添加",
                addHit: "输入学号进行添加",
                importSuccess: "你上传了import.totalNumber个学生信息，其中import.successNumber个导入成功。",
                downloadImportTemplate: "下载导入模板"
            }
        },
        courseware: {
            title: "课件",
            upload: "上传",
            back: "返回",
            name: "课件名称",
            description: "课件描述",
            uploadTime: "上传时间",
            action: "操作",
            edit: "编辑",
            download: "下载",
            delete: "删除",
            deleteConfirm: {
                title: "确认删除",
                content: "您确定删除该课件吗？",
                okText: "确定",
                cancelText: "取消",
                deleteSuccess: "删除成功"
            }

        },
        coursewareEdit: {
            editTitle: "编辑课件",
            addTitle: "新增课件",
            back: "返回",
            name: "课件名称",
            nameHit: "请输入课件名称",
            description: "课件描述",
            descriptionHit: "请输入课件描述",
            descriptionLengthWarning: "描述的长度不能超过500",
            file: "课件",
            fileHit: "请先上传课件",
            uploadFile: "上传课件",
            submit: "提交",
            reset: "重置",
            fileTypeWarning: "文件类型不支持",
            fileTypeWarningDesc: "不支持 file.name 的文件格式，课件暂时只支持.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.zip,.rar格式的文件。",
            fileSizeWarning: "超过最大大小限制",
            fileSizeWarningDesc: "文件 file.name 太大，您可以上传最大100MB的课件",
            fileUploadSuccess: "文件上传成功",
            editSuccess: "编辑成功",
            addSuccess: "新增成功",

        },
        assignment: {
            title: "作业",
            add: "新增",
            back: "返回",
            name: "课件名",
            description: "描述",
            startTime: "开始时间",
            endTime: "截止时间",
            action: "操作",
            edit: "编辑",
            viewSubmission: "查看提交",
            delete: "删除",
            deleteConfirm: {
                title: "确认删除",
                content: "您确定删除该作业吗？",
                okText: "确定",
                cancelText: "取消",
            }
        },
        assignmentEdit: {
            editTitle: "编辑作业",
            addTitle: "新增作业",
            back: "返回",
            name: "作业名称",
            nameHit: "请输入作业名称",
            description: "作业描述",
            descriptionHit: "请输入作业描述",
            descriptionLengthWarning: "内容的长度不能超过500",
            timeRange: "提交时间",
            timeRangeHit: "请选择作业提交时间",
            annex: "作业附件",
            uploadText: "上传附件",
            fileTypeWarning: "文件类型不支持",
            fileTypeWarningDesc: "不支持 file.name 的文件格式，课件暂时只支持.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.zip,.rar格式的文件。",
            fileSizeWarning: "超过最大大小限制",
            fileSizeWarningDesc: "文件 file.name 太大，您可以上传最大100MB的附件",
            submit: "提交",
            reset: "重置",
        },
        submissionView: {
            title: "作业提交",
            back: "返回",
            downloadAll: "下载全部作业",
            exportText: "导出提交记录",
            listCol: {
                number: "学号",
                name: "姓名",
                status: "提交状态",
                submitTime: "提交时间",
                score: "得分",
                action: "操作",
                download: "下载",
                submitted: "已提交",
                unSubmitted: "未提交",
            }
        }

    },
    admin: {
        menu: {
            teacherList: "老师列表",
            studentList: "学生列表",
            changePassword: "修改密码",
            logout: "注销",
            passwordWarn: "原密码错误",
            newPasswordWarn: "新密码长度不能低于8位",
        },
        studentList: {
            title: "学生列表",
            add: "新增",
            name: "姓名",
            number: "学号",
            class: "班级",
            email: "邮件",
            searchHit:"请输入关键词进行搜索",
            action: "操作",
            edit: "编辑",
            delete: "删除",
            deleteConfirm: {
                title: "确认移除",
                content: "您确定移除该学生账号吗？",
                okText: "确定",
                cancelText: "取消",
            },
            importStudents: "导入学生账号",
            fileTypeWarning: "文件类型不支持",
            fileTypeWarningDesc: "不支持 file.name 的文件格式，请选择Office Excel文件。",
            fileSizeWarning: "超过最大大小限制",
            fileSizeWarningDesc: "文件 file.name 太大，您可以上传最大100MB的图像",
        },
        teacherList: {
            title: "教师列表",
            add: "新增",
            name: "姓名",
            number: "工号",
            email: "邮件",
            searchHit:"请输入关键词进行搜索",
            action: "操作",
            edit: "编辑",
            delete: "删除",
            deleteConfirm: {
                title: "确认移除",
                content: "您确定移除该教师账号吗？",
                okText: "确定",
                cancelText: "取消",
            },
            importStudents: "导入教师账号",
            fileTypeWarning: "文件类型不支持",
            fileTypeWarningDesc: "不支持 file.name 的文件格式，请选择Office Excel文件。",
            fileSizeWarning: "超过最大大小限制",
            fileSizeWarningDesc: "文件 file.name 太大，您可以上传最大100MB的图像",
        },
        studentEdit: {
            editTitle: "编辑学生账号",
            addTitle: "新增学生账号",
            back: "返回",
            number: "学号",
            numberHit: "请输入学号",
            name: "姓名",
            nameHit: "请输入姓名",
            class: "班级",
            classHit: "请输入班级",
            email: "邮件",
            emailHit: "请输入邮箱",
            emailFormatHit: "请输入格式正确的电子邮箱",
            password: "密码",
            passwordHit: "请输入密码",
            passwordLengthHit: "密码长度不能低于8位",
            resetPassword: "重置密码",
            avatar: "头像",
            resetAvatar: "重置头像",
            oldAvatar: "原头像",
            submit: "提交",
            reset: "重置",
        },
        teacherEdit: {
            editTitle: "编辑教师账号",
            addTitle: "新增教师账号",
            back: "返回",
            number: "工号",
            numberHit: "请输入工号",
            name: "姓名",
            nameHit: "请输入姓名",
            email: "邮件",
            emailHit: "请输入邮箱",
            emailFormatHit: "请输入格式正确的电子邮箱",
            password: "密码",
            passwordHit: "请输入密码",
            passwordLengthHit: "密码长度不能低于8位",
            resetPassword: "重置密码",
            avatar: "头像",
            resetAvatar: "重置头像",
            oldAvatar: "原头像",
            submit: "提交",
            reset: "重置",
        }
    },
    BACK:{
        COURSE:{
            NOTFOUND: "该课程不存在",
            NOTBELONGTOYOU: "这不是你的课程",
        },
        COURSEWARE: {
            NOTFOUND: "该课件不存在",
        },
        ASSIGNMENT: {
            NOTFOUND: "该作业不存在",
        },
        STUDENT: {
            NOTFOUND: "该学生不存在",
        },
        UPLOAD: {
            FILETYPEERROR: "不支持上传该类型文件，请检查文件格式是否正确",
        }
    }
};

export default zh;

const urls = {
    common: {
        login: '/api/login',
        oss: {
            auth: '/api/oss/auth'
        }
    },
    teacher: {
        announcement: {
            list: '/api/announcement/list/teacher',
            get: '/api/announcement/get',
            add: '/api/announcement/add',
            edit: '/api/announcement/edit',
            delete: '/api/announcement/delete'
        },
        course: {
            myCourse: '/api/course/list/teacher',
            get: '/api/course/get',
            add: '/api/course/add',
            edit: '/api/course/edit',
            delete: '/api/course/delete',
            students: '/api/course/students',
            removeStudent: '/api/course/student/remove',
            addStudent: '/api/course/student/add',
            importStudents: '/api/course/student/import',
            importStudentsTemplate: '/api/static/ElectiveCourseStudentImportTemplate.xlsx',
        },
        courseware: {
            list: '/api/courseware/list',
            get: '/api/courseware/get',
            add: '/api/courseware/add',
            edit: '/api/courseware/edit',
            delete: '/api/courseware/delete',
        },
        assignment: {
            list: '/api/assignment/list',
            get: '/api/assignment/get',
            add: '/api/assignment/add',
            edit: '/api/assignment/edit',
            delete: '/api/assignment/delete',
        },
        assignmentAnnex: {
            add: '/api/assignmentAnnex/add',
            delete: '/api/assignmentAnnex/delete',
        }

    },
    student: {
        announcement: {
            list: '/api/announcement/list/student',
            get: '/api/announcement/get',
        },
        course: {
            myCourse: '/api/course/list/student',
            get: '/api/course/get',
        },
        courseware: {
            list: '/api/courseware/list',
        }
    }
};

export default urls;

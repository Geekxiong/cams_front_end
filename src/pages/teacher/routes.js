import UserInfo from "@/pages/common/componets/UserInfo";
import Course from "@/pages/teacher/components/Course";
import CourseEdit from "@/pages/teacher/components/CourseEdit";
import Announcement from "@/pages/teacher/components/Announcement";
import AnnouncementEdit from "@/pages/teacher/components/AnnouncementEdit";
import Courseware from "@/pages/teacher/components/Courseware";
import CoursewareEdit from "@/pages/teacher/components/CoursewareEdit";
import Assignment from "@/pages/teacher/components/Assignment";
import AssignmentEdit from "@/pages/teacher/components/AssignmentEdit";
import SubmissionView from "@/pages/teacher/components/SubmissionView";

const routes = [
    {
        path: '',
        component: Announcement,
        meta: {
            title: "Announcement"
        }
    },
    {
        path: 'announcements/add',
        component: AnnouncementEdit,
        meta: {
            title: "AnnouncementAdd",
            reuse: "add"
        }
    },
    {
        path: 'announcement/:id',
        component: AnnouncementEdit,
        meta: {
            title: "AnnouncementEdit",
            reuse: "edit"
        }
    },
    {
        path: 'courses',
        component: Course,
        meta: {
            title: "Course"
        }
    },
    {
        path: 'course/:id',
        component: CourseEdit,
        meta: {
            title: "CourseEdit",
            reuse: "edit"
        }
    },
    {
        path: 'courses/add',
        component: CourseEdit,
        meta: {
            title: "CourseAdd",
            reuse: "add"
        }
    },
    {
        path: 'course/:cid/coursewares/',
        component: Courseware,
        meta: {
            title: "Courseware"
        }
    },
    {
        path: 'course/:cid/coursewares/add',
        component: CoursewareEdit,
        meta: {
            title: "CoursewareAdd",
            reuse: "add"
        }
    },
    {
        path: 'course/:cid/courseware/:id',
        component: CoursewareEdit,
        meta: {
            title: "CoursewareEdit",
            reuse: "edit"
        }
    },
    {
        path: 'course/:cid/assignments/',
        component: Assignment,
        meta: {
            title: "Assignment"
        }
    },
    {
        path: 'course/:cid/assignments/add',
        component: AssignmentEdit,
        meta: {
            title: "AssignmentAdd",
            reuse: "add"
        }
    },
    {
        path: 'course/:cid/assignment/:id',
        component: AssignmentEdit,
        meta: {
            title: "AssignmentEdit",
            reuse: "edit"
        }
    },
    {
        path: 'course/:cid/assignment/:id/submissions',
        component: SubmissionView,
        meta: {
            title: "SubmissionView"
        }
    },
    {
        path: 'userinfo',
        component: UserInfo,
        meta: {
            title: "UserInfo",
            reuse: "teacher"
        }
    }
];

export default routes;

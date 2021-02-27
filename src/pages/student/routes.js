import Announcement from "@/pages/student/components/Announcement";
import AnnouncementDetail from "@/pages/student/components/AnnouncementDetail";
import Course from "@/pages/student/components/Course";
import CourseDetail from "@/pages/student/components/CourseDetail";
import AssignmentDetail from "@/pages/student/components/AssignmentDetail";
import UserInfo from "@/pages/common/componets/UserInfo";

const routes = [
    {
        path: '/',
        component: Announcement,
        meta: {
            title: "Announcement"
        }
    },
    {
        path: 'announcement/:id',
        component: AnnouncementDetail,
        meta: {
            title: "AnnouncementDetail"
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
        component: CourseDetail,
        meta: {
            title: "CourseDetail"
        }
    },
    {
        path: 'course/:cid/assignment/:aid',
        component: AssignmentDetail,
        meta: {
            title: "AssignmentDetail"
        }
    },
    {
        path: 'userinfo',
        component: UserInfo,
        meta: {
            title: "UserInfo",
            reuse: "student"
        }
    }
];

export default routes;

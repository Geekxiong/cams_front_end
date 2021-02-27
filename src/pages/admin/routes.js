import StudentList from "@/pages/admin/components/StudentList";
import TeacherList from "@/pages/admin/components/TeacherList";
import StudentEdit from "@/pages/admin/components/StudentEdit";
import TeacherEdit from "@/pages/admin/components/TeacherEdit";

const routes = [
    {
        path: 'students',
        component: StudentList,
        meta: {
            title: "students"
        }
    },
    {
        path: '/',
        redirect: "teachers"
    },
    {
        path: 'teachers',
        component: TeacherList,
        meta: {
            title: "teachers"
        }
    },
    {
        path: 'students/add',
        component: StudentEdit,
        meta: {
            title: "StudentAdd",
            reuse: "add"
        }
    },
    {
        path: 'student/:id',
        component: StudentEdit,
        meta: {
            title: "StudentEdit",
            reuse: "edit"
        }
    },
    {
        path: 'teachers/add',
        component: TeacherEdit,
        meta: {
            title: "TeacherAdd",
            reuse: "add"
        }
    },
    {
        path: 'teacher/:id',
        component: TeacherEdit,
        meta: {
            title: "TeacherEdit",
            reuse: "edit"
        }
    }
];

export default routes;

import Vue from "vue";
import VueRouter from "vue-router";
import ViewUI from 'view-design';
import Util from "@/util";

import Login from "@/pages/Login";
import StudentIndex from "@/pages/student/Index";
import TeacherIndex from "@/pages/teacher/Index";
import AdminIndex from "@/pages/admin/Index";

import StudentRoutes from "@/pages/student/routes";
import TeacherRoutes from "@/pages/teacher/routes";
import AdminRoutes from "@/pages/admin/routes";


Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        component: Login,
        meta: {
            title: "login"
        }
    },
    {
        path: '/',
        component: StudentIndex,
        meta: {
            title: "home"
        },
        children: StudentRoutes
    },
    {
        path: '/teacher',
        component: TeacherIndex,
        meta: {
            title: "teacher home"
        },
        children: TeacherRoutes
    },
    {
        path: '/admin/',
        component: AdminIndex,
        meta: {
            title: "admin"
        },
        children: AdminRoutes
    }
];


const routerConfig = {
    mode: 'history',
    routes: routes
};

const router = new VueRouter(routerConfig);

/**
 * 可在此处鉴权
 */
router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    Util.title(to.meta.title);

    // 下面的代码可以强制跳到指定的路径
    // next({
    //     path: '/home'
    // });
    // next() 则是正常跳转
    next();
});


router.afterEach(() => {
    ViewUI.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;

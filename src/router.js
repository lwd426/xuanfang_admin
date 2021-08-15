const routers = [
    {
        path: '/',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/wine/list.vue'], resolve)
    },
    {
        path: '/wine',
        name: 'wine',
        meta: {
            title: '酒品管理'
        },
        component: (resolve) => require(['./views/wine/list.vue'], resolve),
        children: [
            {
                path: 'list',
                name: 'winelist',
                meta: {
                    title: '列表页'
                },
                component: (resolve) => require(['./views/wine/list.vue'], resolve)
            }
        ]
    }, 
    {
        path: '/dashboard',
        meta: {
            title: '数据大盘'
        },
        component: (resolve) => require(['./views/dashboard.vue'], resolve)
    },
    {
        path: '/service',
        name: 'service',
        meta: {
            title: '客服维护'
        },
        component: (resolve) => require(['./views/service/index.vue'], resolve),
        children: [
            {
                path: 'list',
                name: 'consumersList',
                meta: {
                    title: '信息页'
                },
                component: (resolve) => require(['./views/service/index.vue'], resolve)
            },
            {
                path: 'editConsumers',
                meta: {
                    title: '编辑信息'
                },
                component: (resolve) => require(['./views/service/edit.vue'], resolve)
            }
        ]
    },
    {
        path: '/consumersList',
        name: 'consumersList',
        meta: {
            title: '客户维护'
        },
        component: (resolve) => require(['./views/consumers/list.vue'], resolve),
        children: [
            {
                path: 'list',
                name: 'consumersList',
                meta: {
                    title: '列表页'
                },
                component: (resolve) => require(['./views/consumers/list.vue'], resolve)
            }
        ]
    },
    {
        path: '/admin',
        name: 'admin',
        meta: {
            title: '管理员'
        },
        component: (resolve) => require(['./views/admin/index.vue'], resolve),
        children: [
            {
                path: 'list',
                name: 'adminList',
                meta: {
                    title: '列表'
                },
                component: (resolve) => require(['./views/admin/index.vue'], resolve)
            },
            {
                path: 'addAdmin',
                meta: {
                    title: '添加管理员'
                },
                component: (resolve) => require(['./views/admin/add.vue'], resolve)
            },
            {
                path: 'editAdmin',
                meta: {
                    title: '编辑管理员信息'
                },
                component: (resolve) => require(['./views/admin/edit.vue'], resolve)
            }
        ]
    }
];
export default routers;
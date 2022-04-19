import { createRouter, createWebHashHistory,createWebHistory, RouteRecordRaw } from 'vue-router';

export const staticRoutes: Array<RouteRecordRaw> = [
	
	{
		path: '/',
		name: 'HelloWorld',
		component: () => import('@/views/helloWorld/index.vue'),
		meta: {
			title: '你好',
		}
	},

    {
		path: '/logicflowBpmn',
		name: 'logicflowBpmn',
		component: () => import('@/views/logicflow/logicflowBpmn.vue'),
		meta: {
			title: 'BPMN流程图',
		}
	},

	{
		path: '/logicflowCustom',
		name: 'logicflowCustom',
		component: () => import('@/views/logicflow/logicflowCustom.vue'),
		meta: {
			title: '自定义流程图',
		}
	}
	
];

const router = createRouter({
	//history: createWebHashHistory(),
	history: createWebHistory(),
	routes: staticRoutes,
});

// 导出路由
export default router;
export default {
  path: "/demos",
  redirect: "/demo/search",
  meta: {
    icon: "informationLine",
    title: "组件demo",
    // showLink: false,
    rank: 9,
  },
  children: [
    {
      path: "/demo/search",
      name: "search",
      component: () => import("@/views/demos/search.vue"),
      meta: {
        title: "搜索组件",
      },
    },
    {
      path: "/demo/table",
      name: "table",
      component: () => import("@/views/demos/table.vue"),
      meta: {
        title: "列表页",
      },
    },
  ],
} as RouteConfigsTable

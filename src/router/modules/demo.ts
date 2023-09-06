export default {
  path: "/demos",
  redirect: "/demo/search",
  meta: {
    icon: "informationLine",
    title: "测试页面",
    // showLink: false,
    rank: 9,
  },
  children: [
    {
      path: "/demo/search",
      name: "search",
      component: () => import("@/views/demos/search.vue"),
      meta: {
        title: "search",
      },
    },
  ],
} as RouteConfigsTable

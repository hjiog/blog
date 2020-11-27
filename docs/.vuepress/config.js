module.exports = {
  title: "hjiog的小小窝",
  description: "hjiog的个人博客，记录学习生活的点点滴滴",
  head: [["link", { rel: "icon", href: "/logo.ico" }]],
  themeConfig: {
    // 博客配置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "分类", // 默认文案 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: "标签", // 默认文案 “标签”
      },
    },
  },
};

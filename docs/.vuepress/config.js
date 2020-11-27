module.exports = {
  title: "hjiog的小小窝",
  description: "hjiog的个人博客，记录学习生活的点点滴滴",
  head: [["link", { rel: "icon", href: "/logo.ico" }]],
  themeConfig: {
    logo: "/logo.ico",
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
    // // 最后更新时间
    lastUpdated: "Last Updated",
    // // 作者
    // author: "会飞的小弋",
    // // 作者头像
    // authorAvatar: "/logo.ico",
    // // 如果你的文档不在仓库的根部
    // //docsDir: 'docs',
    // // 备案号
    // //record: 'xxxx',
    // // 项目开始时间
    // startYear: "2019",
    // // 简体中文
    // locales: {
    //   "/": {
    //     lang: "zh-CN",
    //   },
    // },

    nav: [
      {
        text: "Languages",
        ariaLabel: "Language Menu",
        items: [
          {
            text: "Chinese",
            items: [
              { text: "test", link: "language / chinese" },
              { text: "test2", link: "language / chinese" },
            ],
          },
          { text: "Japanese", link: "/language/japanese/" },
        ],
      },
      { text: "TimeLine", link: "/timeline/", icon: "reco-date" },
    ],
    sidebar: "auto",
    sidebarDepth: 2,
    displayAllHeaders: true, // 默认值：false
    smoothScroll: true,
    // vssueConfig: {
    //   platform: "gitee",
    //   owner: "hjiog",
    //   repo: "jiog",
    //   clientId:
    //     "3a4aa8123ef595e89e931f597d886a3b6392e53accd59a25b0b6ddc5b3fc176c",
    //   clientSecret:
    //     "e259ab80a5a690aa4c8c2b9dd8dc5cb3afa3390697b20cc128ed18204bc046b6",
    // },
    valineConfig: {
      appId: "Oyqhe2S5wF1eqXwaAWhtN1N7-gzGzoHsz", // your appId
      appKey: "FNiKgxUKRWs4rt8VTpPHbubj", // your appKey
    },
  },
};

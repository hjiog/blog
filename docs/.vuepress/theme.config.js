module.exports = {
  type: "blog",
  logo: "/favicon.ico",
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
  lastUpdated: "Last Updated",
  author: "hjiog",
  authorAvatar: "/head.jpeg",

  nav: [
    { text: "总览", link: "/timeline/", icon: "reco-date" },
    {
      text: "工具·游戏",
      items: [
        { text: "制作属于你的一首曲子吧", link: "/pages/DrumKit.md" },
        { text: "图片处理", link: "/pages/PictureTool.md" },
        { text: "中国象棋", link: "/vue-chess" },
      ],
    },
  ],
  sidebar: "auto",
  sidebarDepth: 2,
  displayAllHeaders: true, // 默认值：false
  smoothScroll: true,
  // gitee 评论插件
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
  /**
   * support for
   * 'default'
   * 'funky'
   * 'okaidia'
   * 'solarizedlight'
   * 'tomorrow'
   */
  codeTheme: "tomorrow", // default 'tomorrow'
};

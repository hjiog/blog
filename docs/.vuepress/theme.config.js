module.exports = {
  type: 'blog',
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
  lastUpdated: "Last Updated",
  author: "hjiog",
  authorAvatar: "/head.jpeg",

  nav: [
    {
      text: "Languages",
      ariaLabel: "Language Menu",
      items: [
        {
          text: "Chinese",
          items: [
            { text: "test", link: "language" },
            { text: "test2", link: "chinese" },
          ],
        },
        { text: "Japanese", link: "japanese" },
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
}
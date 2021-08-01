module.exports = [
  [
    //鼠标点击特效 先安装在配置， npm install vuepress-plugin-cursor-effects --save
    "vuepress-plugin-cursor-effects",
    {
      size: 2, // size of the particle, default: 2
      shape: ["circle"], // shape of the particle, default: 'star' ,"star" | "circle"
      zIndex: 999999999, // z-index property of the canvas, default: 999999999
    },
  ],
  [
    //动态标题 先安装在配置， npm install vuepress-plugin-dynamic-title --save
    "dynamic-title",
    {
      showIcon: "/favicon.ico",
      showText: "(/≧▽≦/)咦！又好了！",
      hideIcon: "/failure.ico",
      hideText: "(●—●)喔哟，崩溃啦！",
      recoverTime: 2000,
    },
  ],
  [
    require("./plugins/vuepress-plugin-nuggets-style-copy"),
    {
      copyText: "复制代码", //vuepress复制粘贴提示插件P 先安装在配置 npm install vuepress-plugin-nuggets-style-copy --save
      tip: {
        content: "复制成功!",
        time: 3000,
        title: "提示",
      },
    },
  ],

  [
    "meting",
    {
      // metingApi: 'https://api.i-meto.com/meting/api',
      // metingApi: 'https://api.injahow.cn/meting',
      // 不配置该项的话不会出现全局播放器
      meting: {
        server: "netease",
        type: "playlist",
        // 自己的歌单不知为啥使用默认api,数据返回是空的
        // mid: "4935340236",
        mid: "6838211960",
      },
      aplayer: {
        lrcType: 3,
        autoplay: false,
      },
    },
  ],
  [
    "@vuepress/pwa",
    {
      serviceWorker: true,
      updatePopup: {
        message: "发现新内容可用",
        buttonText: "刷新",
      },
    },
  ],
  [
    "@vuepress/medium-zoom",
    {
      selector: ".page img",
    },
  ],
  [
    require("./plugins/vuepress-plugin-kan-ban-niang"),
    {
      messageStyle: { right: "20px", bottom: "150px" },
      modelStyle: { right: "0", bottom: "-20px", opacity: "0.9" },
      btnStyle: { right: "165px", bottom: "27px" },
      width: 160,
      height: 230,
    },
  ],
  ["go-top"],
  ["@vuepress/nprogress"],
];

// ["@vuepress-yard/vuepress-plugin-window",{
//   title: "远方有你伴余生の公告",  //vuepress公告插件 先安装在配置 npm install @vuepress-yard/vuepress-plugin-window --save
//   contentInfo: {
//     title: "欢迎进来的小耳朵 🎉🎉🎉",
//     needImg: true,
//     imgUrl: "https://reinness.com/avatar.png",
//     content: "喜欢博皮可以到博客园关注教程",
//     contentStyle: ""
//   },
//   bottomInfo: {
//     btnText: '关于',
//     linkTo: 'https://cnblogs.com/glassysky'
//   },
//   closeOnce: false
// }]

// [
//   "vuepress-plugin-sponsor",
//   {
//     theme: "simple", // drinks | simple
//     alipay: "/head.jpeg",
//     wechat: "/head.jpeg",
//     duration: 2000,
//   },
// ],

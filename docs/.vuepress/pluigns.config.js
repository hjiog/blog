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
    "vuepress-plugin-helper-live2d",
    {
      // 是否开启控制台日志打印(default: false)
      log: false,
      live2d: {
        // 是否启用(关闭请设置为false)(default: true)
        enable: true,
        // 模型名称(default: hibiki)
        model: "koharu",
        display: {
          position: "right", // 显示位置：left/right(default: 'right')
          width: 135, // 模型的长度(default: 135)
          height: 300, // 模型的高度(default: 300)
          hOffset: 65, //  水平偏移(default: 65)
          vOffset: 0, //  垂直偏移(default: 0)
        },
        mobile: {
          show: false, // 是否在移动设备上显示(default: false)
        },
        react: {
          opacity: 0.8, // 模型透明度(default: 0.8)
        },
      },
    },
  ],

  [
    "meting",
    {
      auto: "https://music.163.com/#/playlist?id=4935340236",
      // 不配置该项的话不会出现全局播放器
      meting: {
        server: "netease",
        type: "playlist",
        mid: "4935340236",
      },
      aplayer: {
        lrcType: 3,
        autoplay: true,
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
//   "@vuepress-reco/vuepress-plugin-kan-ban-niang",
//   {
//     theme: [
//       "koharu",
//       "blackCat",
//       "whiteCat",
//       "haru1",
//       "haru2",
//       "haruto",
//       "izumi",
//       "shizuku",
//       "wanko",
//       "miku",
//       "z16",
//     ],
//     messages: {
//       welcome: "欢迎来到hjiog的小小窝",
//       home: "心里的花，我想要带你回家。",
//       theme: "好吧，希望你能喜欢我的其他小伙伴。",
//       close: "你知道我喜欢吃什么吗？痴痴地望着你。",
//     },
//     messageStyle: { right: "68px", bottom: "190px" },
//     modelStyle: { right: "90px", bottom: "-20px", opacity: "0.9" },
//     btnStyle: { right: "90px", bottom: "40px" },
//     width: 150,
//     height: 220,
//   },
// ],

// [
//   "vuepress-plugin-sponsor",
//   {
//     theme: "simple", // drinks | simple
//     alipay: "/head.jpeg",
//     wechat: "/head.jpeg",
//     duration: 2000,
//   },
// ],

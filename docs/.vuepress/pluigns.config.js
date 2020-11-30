module.exports = [
  // [
  //   //先安装在配置， npm install @vuepress-plugin-meting --save
  //   'meting', {
  //     metingApi: "https://api.i-meto.com/meting/api",
  //     meting: {
  //       server: "netease",
  //       type: "playlist",
  //       mid: "621465725"
  //     },          // 不配置该项的话不会出现全局播放器
  //     aplayer: {
  //       lrcType: 3
  //     }
  //   }
  // ],
  [
    "ribbon",
    {
      size: 90, // 彩带的宽度，默认为 90
      opacity: 0.8, // 彩带的不透明度，默认为 0.3
      zIndex: -1 // 彩带的 z-index 属性，默认值为 -1
    }
  ]
  [
  //鼠标点击特效 先安装在配置， npm install vuepress-plugin-cursor-effects --save
  "cursor-effects",
  {
    size: 2,                    // size of the particle, default: 2
    shape: ['star' | 'circle'],  // shape of the particle, default: 'star'
    zIndex: 999999999           // z-index property of the canvas, default: 999999999
  }
  ],
  [
    //动态标题 先安装在配置， npm install vuepress-plugin-dynamic-title --save
    "dynamic-title",
    {
      showIcon: "/favicon.ico",
      showText: "(/≧▽≦/)咦！又好了！",
      hideIcon: "/failure.ico",
      hideText: "(●—●)喔哟，崩溃啦！",
      recoverTime: 2000
    }
  ],
  // [
  //   //图片放大插件 先安装在配置， npm install @vuepress\plugin-medium-zoom --save
  //   '@vuepress\plugin-medium-zoom', {
  //     selector: '.page img',
  //     delay: 1000,
  //     options: {
  //       margin: 24,
  //       background: 'rgba(25,18,25,0.9)',
  //       scrollOffset: 40
  //     }
  //   }
  // ],
  // [
  //  //插件广场的流程图插件 先安装在配置 npm install vuepress-plugin-flowchart --save
  //   'flowchart'
  // ],
  // [
  //   //插件广场的sitemap插件 先安装在配置 npm install vuepress-plugin-sitemap --save
  //   'sitemap', {
  //     hostname: 'https://www.glassysky.site'
  //   }
  // ],
  // ['@vuepress/pwa', {
  //   serviceWorker: true,  //vuepress插件PWA 先安装在配置 npm install @vuepress/pwa --save
  //   updatePopup: {
  //     message: "发现新内容可用",
  //     buttonText: "刷新"
  //   }
  //  }
  // ],
  ["vuepress-plugin-nuggets-style-copy", {
    copyText: "复制代码",  //vuepress复制粘贴提示插件P 先安装在配置 npm install vuepress-plugin-nuggets-style-copy --save
    tip: {
      content: "复制成功!"
    }
  }],
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
  [
    'vuepress-plugin-helper-live2d', {
      // 是否开启控制台日志打印(default: false)
      log: false,
      live2d: {
        // 是否启用(关闭请设置为false)(default: true)
        enable: true,
        // 模型名称(default: hibiki)
        model: 'koharu',
        display: {
          position: "right", // 显示位置：left/right(default: 'right')
          width: 135, // 模型的长度(default: 135)
          height: 300, // 模型的高度(default: 300)
          hOffset: 65, //  水平偏移(default: 65)
          vOffset: 0, //  垂直偏移(default: 0)
        },
        mobile: {
          show: false // 是否在移动设备上显示(default: false)
        },
        react: {
          opacity: 0.8 // 模型透明度(default: 0.8)
        }
      }
    }
  ],
  ['meting', {
    auto: "https://xxxxxxxxxxxx", //你的歌单的链接，网页歌单链接
    meting: {
      server: "tencent",  //歌单的平台、我这里是QQ音乐的平台
      type: "playlist",
      mid: "7653249637", //链接后面的id
    },          // 不配置该项的话不会出现全局播放器
    aplayer: {
      lrcType: 3,
      autoplay: true
    }
  }]
]

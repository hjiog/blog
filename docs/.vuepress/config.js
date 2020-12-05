var themeConfig = require("./theme.config");
var plugins = require("./pluigns.config");

module.exports = {
  title: "hjiog的小小窝",
  description: "记录学习生活的点点滴滴",
  head: [
    ["link", { rel: "icon", href: "/logo.ico" }],
    //增加manifest.json
    ["link", { rel: "manifest", href: "/manifest.json" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  markdown: {
    lineNumbers: true,
  },
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  themeConfig,
  plugins,
};

var themeConfig = require('./theme.config')
var plugins = require('./pluigns.config')

module.exports = {
  title: "hjiog的小小窝",
  description: "记录学习生活的点点滴滴",
  head: [
    ["link", { rel: "icon", href: "/logo.ico" }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig,
  plugins,
};

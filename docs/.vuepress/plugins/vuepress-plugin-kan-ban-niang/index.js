const { resolve } = require('path')
const glob = require('glob')

module.exports = (options, context) => ({
  define () {
    const model = {
      themeName: [],
      config: {}
    }
    const ModelFolder = './docs/.vuepress/public/live2d/**/*model*.json';
    const themeNameSet = new Set()
    glob.sync(ModelFolder).forEach(function (path) {
      const pathArray = path.split('/')
      themeNameSet.add(pathArray[5])
      if (model.config[pathArray[5]]) {
        model.config[pathArray[5]].push(pathArray.slice(4).join('/'))
      } else {
        model.config[pathArray[5]] = [pathArray.slice(4).join('/')]
      }
    })
    model.themeName = Array.from(themeNameSet)
    const { clean, messages, theme, modelStyle, btnStyle, width, height, messageStyle } = options
    return {
      MODEL: model,
      CLEAN: clean || false,
      THEME: theme || model.themeName,
      MESSAGES: messages || {
        welcome: '欢迎来到hjiog的小小窝',
        home: '回到主页逛逛吧~',
        theme: '想看看我的其他小伙伴吗?',
        close: '呜呜呜,你要赶我走吗?',
        dress: '我们来玩个换装的游戏吧~'
      },
      MESSAGE_STYLE: messageStyle || {
        right: '68px',
        bottom: '190px'
      },
      MODEL_STYLE: modelStyle || {
        right: '90px',
        bottom: '-20px',
        opacity: '0.9'
      },
      BTN_STYLE: btnStyle || {
        right: '90px',
        bottom: '40px'
      },
      WIDTH: width || 150,
      HEIGHT: height || 220
    }
  },
  name: '@vuepress-reco/vuepress-plugin-kan-ban-niang',
  enhanceAppFiles: resolve(__dirname, './bin/enhanceAppFile.js'),
  globalUIComponents: 'KanBanNiang'
})

<template>
  <div class="kanbanniang">
    <div class="banniang-container" v-show="isLoaded">
      <div class="messageBox" :style="messageStyle" v-show="isShowMessageBox">
        {{ messages.message || '欢迎来到 ' + $site.title }}
      </div>
      <div
        v-show="!isShowBtns"
        :style="btnStyle"
        class="operation"
        @mouseenter="isShowMessageBox = true"
        @mouseleave="isShowMessageBox = false"
      >
        <i class="kbnfont kbn-ban-message message"></i>
        <i
          class="kbnfont kbn-ban-home ban-home"
          @click="goHome"
          @mouseenter="hoverGoHome"
          @mouseleave="resetMessage"
        ></i>
        <!-- <a
          target="_blank"
          href="https://vuepress-theme-reco.recoluan.com/views/plugins/kanbanniang.html"
        >
          <i
            class="kbnfont kbn-ban-info info"
            @mouseenter="hoverMoreInfo"
            @mouseleave="resetMessage"
          ></i>
        </a> -->
        <div
          @click="onShowSnow"
          @mouseenter="hoverShowSnow"
          @mouseleave="resetMessage"
        >
          <SnowFalling :canShowSnow="canShowSnow" />
        </div>

        <i
          v-show="canChangeDress"
          class="kbnfont kbn-ban-theme skin"
          @click="changeDress"
          @mouseenter="hoverChangeDress"
          @mouseleave="resetMessage"
        ></i>

        <div
          v-show="myTheme.length > 1"
          class="next-icon"
          @click="changeTheme"
          @mouseenter="hoverChangeTheme"
          @mouseleave="resetMessage"
        >
          <svg
            t="1609685789090"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3200"
            width="20"
            height="20"
          >
            <path
              d="M106.666667 512A405.333333 405.333333 0 1 0 512 106.666667 405.333333 405.333333 0 0 0 106.666667 512z m358.186666-168.533333l170.666667 149.333333a25.450667 25.450667 0 0 1 0 38.4l-170.666667 149.333333a25.557333 25.557333 0 1 1-33.706666-38.4l148.693333-130.133333-148.693333-130.133333a25.557333 25.557333 0 1 1 33.706666-38.4z"
              fill="currentColor"
              p-id="3201"
            ></path>
          </svg>
        </div>

        <i
          class="kbnfont kbn-ban-close close"
          @click="closeBanNiang"
          @mouseenter="hoverCloseBanNiang"
          @mouseleave="resetMessage"
        ></i>
      </div>
      <canvas
        id="banniang"
        :style="modelStyle"
        :width="style.width"
        :height="style.height"
        class="live2d"
      ></canvas>
    </div>
    <div class="showBanNiang" v-show="displayBanNiang" @click="showBanNiang">
      看板娘
    </div>
  </div>
</template>

<script>
import live2dJSString from './assets/js/live2d'
import SnowFalling from './snow'

const USER_MODEL_DATA = 'USER_MODEL_DATA'

const getRealUrl = conf => {
  const host = window.location.host
  const protocol = window.location.protocol
  Object.keys(conf).forEach(key => {
    conf[key] = conf[key].map(path => {
      return `${protocol}//${host}/${path}`
    })
  })
  return conf
}

export default {
  name: 'KanBanNiang',
  components: {
    SnowFalling
  },
  data() {
    return {
      isLoaded: true,
      displayBanNiang: false,
      isShowMessageBox: false,
      isShowBtns: CLEAN,
      messages: {
        message: MESSAGES.welcome,
        welcome: MESSAGES.welcome,
        home: MESSAGES.home,
        theme: MESSAGES.theme,
        dress: MESSAGES.dress,
        close: MESSAGES.close
      },
      currentTheme: THEME[0],
      myTheme: THEME,
      themeName: MODEL.themeName, // ['koharu', 'wanko', 'test']
      currentDress: 0,
      // 模型地址
      model: getRealUrl(MODEL.config), //{ koharu: ['/live2d/koharu/koharu.model.json']}
      // model的高宽
      style: {
        width: WIDTH,
        height: HEIGHT
      },
      // model的样式
      modelStyle: MODEL_STYLE,
      // messageBox的样式
      messageStyle: MESSAGE_STYLE,
      // 按钮的样式
      btnStyle: BTN_STYLE,
      canShowSnow: false
    }
  },
  computed: {
    canChangeDress() {
      return this.model[this.currentTheme].length > 1
    }
  },
  mounted() {
    this.btnStyle = {
      ...this.btnStyle,
      height: this.myTheme.length > 1 ? '120px' : '100px'
    }
    this.getUserData()
    // 初始化live2d模型
    this.initBanNiang()
    // console.log(MODEL, '==========')
  },
  methods: {
    hoverGoHome() {
      this.messages.message = this.messages.home
    },
    hoverChangeTheme() {
      this.messages.message = this.messages.theme
    },
    hoverChangeDress() {
      this.messages.message = this.messages.dress
    },
    hoverMoreInfo() {
      this.messages.message = '想知道关于我的更多信息吗？'
    },
    hoverCloseBanNiang() {
      this.messages.message = this.messages.close
    },
    resetMessage() {
      this.messages.message = this.messages.welocme
    },
    goHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    },
    saveUserData() {
      const data = {
        theme: this.currentTheme,
        dress: this.currentDress
      }
      localStorage.setItem(USER_MODEL_DATA, JSON.stringify(data))
    },
    getUserData() {
      if (localStorage) {
        const data = localStorage.getItem(USER_MODEL_DATA)
        if (data) {
          const { theme, dress } = JSON.parse(data)
          this.currentDress = dress
          this.currentTheme = theme
        }
      }
    },
    changeTheme() {
      for (let i = 0; i < this.myTheme.length; i++) {
        if (this.myTheme[i] === this.currentTheme) {
          if (i === this.myTheme.length - 1) {
            this.currentTheme = this.myTheme[0]
          } else {
            this.currentTheme = this.myTheme[i + 1]
          }
          break
        }
      }
      this.currentDress = 0
      this.saveUserData()
      this.initBanNiang()
    },
    changeDress() {
      this.currentDress++
      if (this.currentDress > this.model[this.currentTheme].length - 1) {
        this.currentDress = 0
      }
      this.saveUserData()
      this.initBanNiang()
    },
    closeBanNiang() {
      this.isLoaded = false
      this.displayBanNiang = true
    },
    showBanNiang() {
      this.isLoaded = true
      this.displayBanNiang = false
      this.initBanNiang()
    },
    initBanNiang() {
      if (this.themeName.indexOf(this.currentTheme) === -1) {
        console.log(
          '@vuepress-reco/vuepress-plugin-kan-ban-niang不支持主题' +
            this.currentTheme +
            ', 请检查主题名, 或前往https://vuepress-theme-reco.recoluan.com/views/plugins/kanbanniang.html 查看支持的主题'
        )
        document.querySelector('.kanbanniang').style.display = 'none'
        return
      }
      const isMobile = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
      if (isMobile) {
        this.isLoaded = false
        return console.log('mobile do not load model')
      }
      if (!window.loadlive2d) {
        const script = document.createElement('script')
        script.innerHTML = live2dJSString
        document.body.appendChild(script)
      }
      var ajax = new XMLHttpRequest()
      ajax.open('get', this.model[this.currentTheme][this.currentDress])
      ajax.send()
      ajax.onreadystatechange = function() {
        if (ajax.status !== 200) {
          console.log('看板娘的CDN资源加载失败了，请稍后刷新页面重试！')
          document.querySelector('.kanbanniang').style.display = 'none'
        }
      }
      window.loadlive2d(
        'banniang',
        this.model[this.currentTheme][this.currentDress]
      )
    },
    onShowSnow() {
      this.canShowSnow = !this.canShowSnow
    },
    hoverShowSnow() {
      if (this.canShowSnow) {
        this.messages.message = '我的魔力耗尽了,让我歇会...'
      } else {
        this.messages.message = '想看漫天雪舞吗?让我施展一下魔法吧~'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@require './assets/iconfont/iconfont.css';

.showBanNiang {
  position: fixed;
  right: 70px;
  bottom: 6rem;
  color: $accentColor;
  width: 48px;
  height: 20px;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  // 其他主题识别不到变量时使用
  background-color: rgba(231, 234, 241, 0.5);
  // reco主题
  box-shadow: var(--box-shadow);
  background-color: var(--background-color);
}

.banniang-container {
  position: fixed;
  right: 50px;
  bottom: 100px;
  color: #00adb5;

  .messageBox {
    position: fixed;
    padding: 10px;
    height: 60px;
    width: 160px;
    border-radius: 8px;
    background-color: lighten($accentColor, 50%);
    color: $textColor;
    opacity: 0.8;
  }

  .operation {
    width: 20px;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    i {
      font-size: 20px;
      cursor: pointer;
      color: lighten($textColor, 50%);

      &:hover {
        color: lighten($accentColor, 50%);
      }
    }
  }

  #banniang {
    z-index: 99999;
    pointer-events: none;
    position: fixed;
  }

  .next-icon{
    cursor pointer
    color #829ebb
    &:hover{
      color #9adbbe
    }
  }
}
</style>

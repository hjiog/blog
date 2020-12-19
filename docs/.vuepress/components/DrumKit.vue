<template>
  <div class="container" @keydown="playSound" tabindex="0" ref="container">
    <div class="keys">
      <div data-key="65" class="key">
        <kbd>A</kbd>
        <span class="sound">clap</span>
      </div>
      <div data-key="83" class="key">
        <kbd>S</kbd>
        <span class="sound">hihat</span>
      </div>
      <div data-key="68" class="key">
        <kbd>D</kbd>
        <span class="sound">kick</span>
      </div>
      <div data-key="70" class="key">
        <kbd>F</kbd>
        <span class="sound">openhat</span>
      </div>
      <div data-key="71" class="key">
        <kbd>G</kbd>
        <span class="sound">boom</span>
      </div>
      <div data-key="72" class="key">
        <kbd>H</kbd>
        <span class="sound">ride</span>
      </div>
      <div data-key="74" class="key">
        <kbd>J</kbd>
        <span class="sound">snare</span>
      </div>
      <div data-key="75" class="key">
        <kbd>K</kbd>
        <span class="sound">tom</span>
      </div>
      <div data-key="76" class="key">
        <kbd>L</kbd>
        <span class="sound">tink</span>
      </div>

      <div class="footer">
        <div class="input-area">
          <span class="delay-tip">
            <div>乐谱播放延迟时间</div>
            <div>（1000表示1秒）:</div>
          </span>
          <Input v-model="delayTime" />
        </div>
        <div class="input-area">
          <Input
            v-model="input"
            placeholder="请输入乐谱，仅（asdfghjkl）有效"
          />
          <Button @click="autoPlay">开始奏乐</Button>
        </div>
      </div>
    </div>

    <audio data-key="65" src="/customTool/sounds/clap.wav"></audio>
    <audio data-key="83" src="/customTool/sounds/hihat.wav"></audio>
    <audio data-key="68" src="/customTool/sounds/kick.wav"></audio>
    <audio data-key="70" src="/customTool/sounds/openhat.wav"></audio>
    <audio data-key="71" src="/customTool/sounds/boom.wav"></audio>
    <audio data-key="72" src="/customTool/sounds/ride.wav"></audio>
    <audio data-key="74" src="/customTool/sounds/snare.wav"></audio>
    <audio data-key="75" src="/customTool/sounds/tom.wav"></audio>
    <audio data-key="76" src="/customTool/sounds/tink.wav"></audio>
  </div>
</template>

<script>
import Input from "element-ui/lib/input";
import "element-ui/lib/theme-chalk/input.css";

import Button from "element-ui/lib/button";
import "element-ui/lib/theme-chalk/button.css";

const characterMap = {
  a: 65,
  s: 83,
  d: 68,
  f: 70,
  g: 71,
  h: 72,
  j: 74,
  k: 75,
  l: 76,
  65: "a",
  83: "s",
  68: "d",
  70: "f",
  71: "g",
  72: "h",
  74: "j",
  75: "k",
  76: "l",
};

export default {
  components: {
    Input,
    Button,
  },
  data: () => {
    return {
      lastPlay: null,
      input: "",
      delayTime: 200,
    };
  },
  mounted() {
    this.$refs.container.focus();
  },

  methods: {
    playSound(e) {
      const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
      const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
      if (!audio) return;
      if (this.lastPlay) {
        this.lastPlay.classList.remove("playing");
      }
      this.input += characterMap[e.keyCode];
      this.lastPlay = key;
      key.classList.add("playing");
      audio.currentTime = 0;
      audio.play();
    },
    autoPlay() {
      const arr = this.input.split("");
      let index = 0;
      const recur = () =>
        setTimeout(() => {
          if (index >= arr.length) return;
          const keyCode = characterMap[arr[index]];
          if (keyCode) {
            const audios = document.querySelector(
              `audio[data-key="${keyCode}"]`
            );
            audios.currentTime = 0;
            audios.play();
          }
          index++;
          recur();
        }, this.delayTime);
      recur();
    },
  },
};
</script>

<style lang="stylus" scoped>
.container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: sans-serif;
  font-size: 10px;
  background: url('/customTool/drumbKit.jpg') bottom center;
  background-size: cover;
}

.keys {
  display: flex;
  flex: 1;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.key {
  border: 0.4rem solid black;
  border-radius: 0.5rem;
  margin: 1rem;
  font-size: 1.5rem;
  padding: 1rem 0.5rem;
  transition: all 0.07s ease;
  width: 10rem;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  text-shadow: 0 0 0.5rem black;
}

.playing {
  transform: scale(1.1);
  border-color: #ffc600;
  box-shadow: 0 0 1rem #ffc600;
}

kbd {
  display: block;
  font-size: 4rem;
}

.sound {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: #ffc600;
}

.input-area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: 14px auto;
}

.footer {
  width: 100%;
}

.delay-tip {
  color: white;
  flex-basis: 130px;
  flex-shrink: 0;
}
</style>

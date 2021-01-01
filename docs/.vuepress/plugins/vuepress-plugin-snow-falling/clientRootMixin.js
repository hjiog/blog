/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import Snow from './snow.vue';
import Snow2 from './snow2.vue';

export default {
  updated() {
    // 等待dom加载完成之后执行
    setTimeout(() => {
      this.$showSnows();
    }, 0);
  },
  methods: {
    $showSnows() {
      const el = document.querySelector('.home-blog .hero');
      if(el){
        // const snowConstruct = Vue.extend(Snow);
        const snowConstruct = Vue.extend(Snow2);
        const snow = new snowConstruct();
        snow.$mount();
        el.appendChild(snow.$el);
      }
    },
  },
};

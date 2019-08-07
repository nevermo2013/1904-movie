<template>
  <div class="city-main">
    <div class="nav">
      <span class="close" @click="$router.go(-1)">关闭</span>
      <p class="title">选择城市</p>
    </div>
    <h2>这是city.vue页面</h2>
    <ul class="city-nav" v-touch>
      <li class="cha-item" v-for="cha in cityChars" :key="cha">{{cha}}</li>
    </ul>
    <div class="fixed-char" v-if="currentChar">{{currentChar}}</div>
  </div>
</template>

<script>
import { constants } from "crypto";
import func from "../../../../vue-temp/vue-editor-bridge";
export default {
  name: "City",

  data() {
    return {
      cityChars: [], //城市首字母数组
      currentChar: "" //选中的字符
    };
  },
  created() {
    this.initCityChars();
  },
  methods: {
    //初始化字母
    initCityChars() {
      for (var i = 65; i <= 90; i++) {
        //把ascii ==>  字母
        var cha = String.fromCharCode(i);
        this.cityChars.push(cha);
      }
    }
  },
  directives: {
    touch(el, binding, vnode) {
       // 通过vnode获取  当前页的vue 的实例对象
    //   var vm = vnode.context;
    //   el.ontouchstart = function(e) {
    //     var tou = e.touches[0];
    //     // 元素距离顶部距离
    //     var baseTop = this.offsetTop;
    //     // 元素高度
    //     var baseHeight = this.offsetHeight;
    //     //   console.log('baseHeight',baseHeight);
    //     //初始位置
    //     var startY = tou.clientY;
    //     // 默认初始位置不变
    //     var endY = startY;

    //     el.ontouchmove = function(e) {
    //       var tou = e.touches[0];
    //       //更新endY
    //       endY = tou.clientY;
    //       //需要计算当前位置的比例
    //       var bl = (endY - baseTop) / baseHeight;
    //       //元素下标
    //       var index = Math.floor(bl * vm.cityChars.length);
    //       //修正
    //       if (index > 25) {
    //         index = 25;
    //       }
    //       if (index < 0) {
    //         index = 0;
    //       }
    //       //设置 vm的 当前字符
    //       vm.currentChar = vm.cityChars[index];
    //     };
    //     el.ontouchend = function() {
    //       el.ontouchmove = null;
    //       vm.currentChar = "";
    //     };
    //   };
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/style/common/common.scss";
.city-main {
  color: #fff;
  .nav {
    position: relative;
    width: 100%;
    height: $baseNavHeight;
    .close {
      position: absolute;
      left: $basePadding;
      top: 0;
      width: 40px;
      height: 40px;
      font-size: 12px;
      text-align: center;
      line-height: 40px;
    }
    .title {
      font-size: 14px;
      text-align: center;
      line-height: 40px;
    }
  }
  .fixed-char {
    position: fixed;
    width: 100px;
    height: 100px;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid #f5f5f5;
    border-radius: 8px;
    font-size: 20px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }
  .city-nav {
    position: fixed;
    right: $basePadding;
    top: 120px;
    color: orange;
    border: 1px solid red;
    .cha-item {
      padding: 2px 4px;
    }
  }
}
</style>

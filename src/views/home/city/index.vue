<template>
  <div class="city-main">
    <!-- 百度地图容器 -->
    <div id="allmap"></div>
    <BaseLayer ref="baselayer">
      <template v-slot:header>
        <div class="nav">
          <span class="close" @click="$router.go(-1)">关闭</span>
          <p class="title">选择城市</p>
        </div>
      </template>
      <template v-slot:default>
        <div class="container">
          <!-- 生成基于首字母的块 -->
          <div v-for="(citys,key) in cityData" :key="key" class="citys-block">
            <p class="title" :class="'title-'+key">{{key}}</p>
            <ul class="city-list">
              <li v-for="item in citys" :key="item.id">{{item.name}}</li>
            </ul>
          </div>
        </div>
      </template>
    </BaseLayer>
    <ul class="city-nav" v-touch>
      <li class="cha-item" v-for="cha in cityChars" :key="cha">{{cha}}</li>
    </ul>
    <div class="fixed-char" v-if="currentChar">{{currentChar}}</div>
  </div>
</template>

<script>
//城市列表数据
import cityData from "@/assets/cityData.json";
import BaseLayer from "@/components/BaseLayer";
export default {
  name: "City",
  components: {
    BaseLayer
  },
  data() {
    return {
      cityChars: [], //城市首字母数组
      currentChar: "", //选中的字符
      cityData
    };
  },
  created() {
    this.initCityChars();
    console.log(cityData);
  },
  mounted() {
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);

    var geolocation = new BMap.Geolocation();
    var geoc = new BMap.Geocoder();
    geolocation.getCurrentPosition(
      function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          // map.addOverlay(mk);
          // map.panTo(r.point);
          // 获取坐标
          // alert("您的位置：" + r.point.lng + "," + r.point.lat);

          // var pt = e.point;
          geoc.getLocation(r.point, function(rs) {
            var addComp = rs.addressComponents;
            alert(
              addComp.province +
                ", " +
                addComp.city +
                ", " +
                addComp.district +
                ", " +
                addComp.street +
                ", " +
                addComp.streetNumber
            );
          });
        } else {
          alert("failed" + this.getStatus());
        }
      },
      { enableHighAccuracy: true }
    );
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
      var vm = vnode.context;
      function updateVm(endY, baseTop, baseHeight, vm) {
        //需要计算当前位置的比例
        var bl = (endY - baseTop) / baseHeight;
        //元素下标
        var index = Math.floor(bl * vm.cityChars.length);
        //修正
        if (index > 25) {
          index = 25;
        }
        if (index < 0) {
          index = 0;
        }
        //设置 vm的 当前字符
        vm.currentChar = vm.cityChars[index];
        // 根据dom的选择器 滚动到特定位置:
        var dom = document.querySelector(
          ".citys-block .title.title-" + vm.currentChar
        );
        if (dom) {
          vm.$refs.baselayer.$BScroll.scrollToElement(
            dom,
            400,
            0,
            -100,
            "easing"
          );
        }
      }
      el.ontouchstart = function(e) {
        e.preventDefault();
        var tou = e.touches[0];
        // 元素距离顶部距离
        var baseTop = this.offsetTop;
        // 元素高度
        var baseHeight = this.offsetHeight;
        //   console.log('baseHeight',baseHeight);
        //初始位置
        var startY = tou.clientY;
        // 默认初始位置不变
        var endY = startY;

        updateVm(endY, baseTop, baseHeight, vm);

        el.ontouchmove = function(e) {
          var tou = e.touches[0];
          //更新endY
          endY = tou.clientY;
          updateVm(endY, baseTop, baseHeight, vm);
        };
        el.ontouchend = function() {
          el.ontouchmove = null;
          vm.currentChar = "";
        };
      };
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/style/common/common.scss";
.city-main {
  height: 100%;
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
  .container {
    width: 100%;
    padding: $basePadding;
    box-sizing: border-box;
    .citys-block {
      width: 100%;
      font-size: 14px;
      color: #f7f7f7;
      line-height: 40px;
      text-align: left;
    }
  }
}
</style>

<template>
    <div class="home-main">
        <!-- 头部 -->
        <div class="nav">
            <router-link class="city-selector" :to="{name:'city'}">郑州</router-link>
            <input class="search-input" type="text">
            <span class="date-text">签到</span>
        </div>
        <div class="banner">
            <swiper class="banner-swiper" :options="bannerOptions" ref="bannerSwiper">
                <!-- slides -->
                <swiper-slide v-for="imgObj in bannerImgs" :key="imgObj.id">
                    <img class="img" :src="imgObj.img" alt="">
                </swiper-slide>
                
            </swiper>
            <div class="banner-pagination"  slot="pagination"></div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
//引入组件 注册组件
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'Home',
    components:{
        swiper,
        swiperSlide
    },
    data(){
        return {
            bannerImgs:[
                {
                    id: 1,
                    img: require('@/assets/imgs/home/banner1.png')
                },
                {
                    id: 2,
                    img: require('@/assets/imgs/home/banner2.png')
                },
                {
                    id: 3,
                    img: require('@/assets/imgs/home/banner3.png')
                }
            ],
            bannerOptions:{
                slidesPerView: 1.2,
                spaceBetween: 20,
                centeredSlides: true,
                loop: true,
                pagination: {
                    el: '.banner-pagination',
                },
            }
        }
    }
}
</script>
<style scoped lang="scss">
    @import "@/assets/style/common/common.scss";
    .home-main{
        .nav{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 40px;
            background-color: #33363D;
            display: flex;
            justify-content: space-between;
            padding: 0 $basePadding;
            box-sizing: border-box;
            .city-selector{
                width: 40px;
                height: 40px;
                background-color: red;
            }
            .search-input{
                flex: 1;
            }
            .date-text{
                width: 40px;
                height: 40px;
                background-color: green;
            }
        }
        .banner{
            width: 100%;
            height: 156px;
            margin-top: 52px;
            .banner-swiper{
                width: 100%;
                height: 145px;
                .img{
                    width: 335px;
                    height: 145px;
                }
                // 不包含 激活样式的
                .swiper-slide:not(.swiper-slide-active) {
                    transform: scale(.9);
                }
                                
            }
            // 通过组件 修改组件内部的样式 需要 穿透   >>>  
            // 参考: https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8
            .banner-pagination{
                ::v-deep.swiper-pagination-bullet{
                    width: 4px;
                    height: 4px;
                    border-radius: 2px;
                    margin: 0 7px;
                    background-color: #fff;
                    transition: all ease .4s;
                    &.swiper-pagination-bullet-active{
                        width: 14px;
                        height: 3px;
                    }
                }
            }

        }
    }   


</style>



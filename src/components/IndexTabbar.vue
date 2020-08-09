<template>
  <div class="tab-bar flex j-between">
    <div
      v-for="(item, index) in tabList"
      :key="index"
      class="home-tab tab-com flex_1 flex column a-center j-center"
      :class="{isIpx: isIpx}"
      @click="isActive(index)"
    >
      <img
        class="tab-com-img"
        :src="indexAction == index? item.activeimgSrc : item.imgSrc"
      >
      <div :class="indexAction == index ? 'activeColor' : ''">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: "IndexTabbar",
    props:{
      isIpx: {
        type: Boolean,
        default() {
          return false
        }
      },
      isAction: {
          type: Number,
          default() {
            return 0
          }   
      },
      indexAction: {
          type: Number,
          default() {
            return 0
          }   
      }
    },
    data() {
      return {
        tabList: [{imgSrc: '/static/png/index.png', activeimgSrc: '/static/png/index-action.png', text: '榜单'},{imgSrc: '/static/png/mine.png',activeimgSrc: '/static/png/my-action.png', text: '我的'}],
      }
    },
    watch: {
      isAction(val) {
        // this.indexAction = val
      }
    },
    methods: {
      isActive(i) {
        // console.log(i)
        // this.indexAction = i
        this.$emit('parentsIsActive', i)
      }
    },
    onShow() {
      // this.tabList = [{imgSrc: '/static/png/index.png', activeimgSrc: '/static/png/index-action.png', text: '榜单'},{imgSrc: '/static/png/mine.png',activeimgSrc: '/static/png/my-action.png', text: '我的'}]
    }
}
</script>
<style lang="less" scoped>
.tab-bar{
    // height: 98rpx;
    width: 750rpx;
    background: #fff;
    padding: 20rpx 0;
    .tab-com{
      color: #D2DEEF;
      font-size: 22rpx;
      .tab-com-img{
        height: 44rpx;
        width: 44rpx;
      }
    }
    .isIpx{
      padding-bottom: 30rpx !important;

    }
    .activeColor{
      color: #FE306B;
    }
}
</style>
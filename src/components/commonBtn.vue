<template>
  <div
    class="common-btn flex a-center j-center"
    :style="btnStyle"
  >
    {{ title }}
  </div>
</template>
<script>
export default {
    name: "CommonBtn",
    props: {
        title: {
            type: String,
            default() {
                return '打榜'
            }
        },
        btnStyle: {
            type: Object,
            default() {
                return {}
            }
        },
  },
  watch: {
      btnTitle(val) {
          console.log('val', val)
      },
      btnStyle(val) {
          console.log('val', val)
      }
  },
}
</script>
<style lang="less" scoped>
.common-btn{
    width: 126rpx;
    height: 56rpx;
    border-radius: 29rpx;
    background: #FE9730;
    color: #fff;
    font-size: 28rpx;
    font-weight: bold;
    text-align: center;
    line-height: 56rpx;
    margin: 0 auto;
    box-shadow:0px 3px 10px rgba(254,151,48,0.5);
}
</style>
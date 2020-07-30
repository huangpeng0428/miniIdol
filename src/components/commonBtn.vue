<template>
  <div class="common-btn flex a-center j-center">
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
}
</style>
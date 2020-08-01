<template>
  <div>
    <div class="go-back flex a-center j-center">
      <image
        v-if="imgcolor == 'white'"
        class="back-icon"
        src="/static/png/left-arrow.png"
      />
    </div>
  </div>
</template>
<script>
export default {
    name: "GoBack",
    props: {
    imgcolor: {
      type: String,
      default: "white"
    },
  },
}
</script>
<style lang="less" scoped>
  .go-back{
      width: 76rpx;
      height: 76rpx;
      box-shadow:0px 3px 10px rgba(254,151,48,0.5);
      .back-icon{
         width: 26rpx;
         height: 44rpx; 
      }
  }
</style>
<template>
  <div class="common-item flex a-center j-between">
    <div class="flex a-center">
      <div class="item-numer">
        04
      </div>
      <image
        class="item-img"
        src="/static/png/people.png"
      />
      <div>
        <div class="item-name">
          陈冠希
        </div>
        <div class="flex">
          <image
            class="item-icon"
            src="/static/png/hot.png"
            alt=""
          />
          <div class="item-fens">
            4325万
          </div>
        </div>
      </div>
    </div>
    <div>
      <common-Btn />
    </div>
  </div>
</template>
<script>
import CommonBtn from "@/components/commonBtn";
export default {
    name: "CommonItem",
    components: {
        CommonBtn
    },
    data() {
        return {

        }
    }
}
</script>
<style lang="less" scope>
.common-item {
    background: #fff;
    height: 150rpx;
    padding: 0 30rpx;
    border-bottom: 1rpx #E6E6E6 solid;
    width: 690rpx;
    box-sizing: border-box;
    margin: 0 auto;

    .item-numer{
    color: #B3B3B3;
    font-size: 32rpx;
    font-weight:bold;
    }
    .item-img{
    width: 90rpx;
    height: 90rpx;
    padding: 0 20rpx;
    }
    .item-name{
    color: #000000;
    font-size: 28rpx;
    font-weight: bold;
    padding-bottom: 10rpx;
    }
    .item-icon {
    width: 30rpx;
    height: 30rpx;
    }
    .item-fens{
    color: #999999;
    font-size: 24rpx;
    font-weight: bold;
    }
}
</style>

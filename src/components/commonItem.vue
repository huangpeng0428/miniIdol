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
        <div :class="[dataType === 'idol' ? 'flex' : '']">
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
        <div
          v-if="dataType === 'idol'"
          class="item-tic"
        >
          我已支持<span class="bold">50</span>票
        </div>
      </div>
    </div>
    <div>
      <common-Btn
        v-bind="$attrs"
        v-on="$listeners"
      />
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
    props: {
      dataType: {
        type: String,
        default() {
          return ''
        }
      }
    },
    data() {
        return {

        }
    },
    mounted() {
      console.log('val')
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
      padding: 0 10rpx 10rpx 0;
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
    .item-tic{
      color: #FE306B;
      font-size: 24rpx;
      .bold{
        font-weight: bold;
      }
    }
}
</style>

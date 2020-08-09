<template>
  <div
    class="page flex column"
  >
    <!-- 我的 -->
    <div
      class="my-info"
      :style="{'padding-top': statusBarHeight + 'rpx'}"
    >
      <div class="my-info__flex flex a-center">
        <image
          class="info-img"
          :src="userInfo ? userInfo.avatar : '/static/png/people.png'"
        />
        <div v-if="userInfo">
          <div class="info-name">
            {{ userInfo.name }}<span class="info-name__id">(ID:{{ userInfo.uid }})</span>
          </div>
          <div class="flex info-title">
            <div class="flex a-center j-between info-peg">
              <image src="/static/png/id.png" />
              <div class="level">
                平民
              </div>
            </div>
            <div class="flex a-center j-between info-peg">
              <image src="/static/png/hot.png" />
              <div class="number">
                0票
              </div>
            </div>
          </div>
        </div>
        <button
          v-else
          class="info-btn"
          open-type="getUserInfo"
          lang="zh_CN"
          @getuserinfo="getUserData"
        >
          登录
        </button>
      </div>
    </div>

    <div
      class="info-idol"
    >
      <div class="flex a-center info-idol__heig">
        <image src="/static/png/idolt.png" />
        <div class="my-idol">
          我的偶像
        </div>
      </div>
    </div>

    <div
      v-if="noIdol"
      class="comBtn"
      @click="doBillboard"
    >
      <div class="no-idol">
        暂时还未帮过偶像打榜
      </div>
      <common-Btn
        :title="btnTitle"
        :btn-style="btnStyle"
      />
    </div>
    <scroll-view v-else>
      <div
        class="idol-list"
        :class="[isIpx ? 'isIpx' : 'mrg_bottom']"
      >
        <common-Item
          :data-type="dataType"
          :btn-style="btnStyleItem"
          :title="btnTitleItem"
        />
        <common-Item
          :data-type="dataType"
          :btn-style="btnStyleItem"
          :title="btnTitleItem"
        />
        <common-Item
          :data-type="dataType"
          :btn-style="btnStyleItem"
          :title="btnTitleItem"
        />
        <common-Item
          :data-type="dataType"
          :btn-style="btnStyleItem"
          :title="btnTitleItem"
        />
        <common-Item
          :data-type="dataType"
          :btn-style="btnStyleItem"
          :title="btnTitleItem"
        />
      </div>
    </scroll-view>
  </div>
</template>
<script>
import commonBtn from "@/components/commonBtn";
import commonItem from "@/components/commonItem";
import shareMix from "@/mixins/mixin";
export default {
  name: 'InfoCont',
  components: {
    commonBtn,
    // eslint-disable-next-line vue/no-unused-components
    commonItem
  },
  mixins: [shareMix],
  data() {
    return {
      noIdol: true,
      btnTitle: '去打榜',
      btnTitleItem: '继续支持',
      btnStyle: {width: '200rpx;', height: '80rpx;', 'border-radius': '40rpx;' },
      btnStyleItem: {width: '138rpx;', height: '56rpx;', 'border-radius': '40rpx;', 'font-size': '24rpx;', 'font-weight': '400' },
      dataType: 'idol',
      statusBarHeight: this.$globalData.statusBarHeight,
      isIos: this.$globalData.isIos,
      isIpx: this.$globalData.isIpx,
      userInfo: null
    };
  },
  onLoad(opt) {
  },
  onShow() {
  },
  mounted() {
    if( wx.getStorageSync('userInfo' )) {
      this.userInfo = wx.getStorageSync('userInfo')
      console.log(this.userInfo)
    }
    this.statusBarHeight = this.$globalData.statusBarHeight
    console.log(this.statusBarHeight)
  },
  methods: {
    doBillboard() {
      this.$emit('doBillboard', 0)
    },

    getUserData(res) {
      if (res.detail.errMsg == 'getUserInfo:ok') {
        wx.login({
          success: e => {       
            let code = e.code;  //调用wx.login，获取登录凭证（code），并调用接口，将code发送到第三方客户端
            wx.getUserInfo({
              success: result => {
                this.$request.post("/app/wechat/p_authorize", {
                  encryptedData: result.encryptedData,
                  iv: result.iv,
                  code
                })
                .then(data => {
                  this.userInfo = data.data
                  wx.setStorage({
                    key: 'userInfo',
                    data: this.userInfo
                  })
                })
              }
            });
            
            
            
            // server.sendRequest({
            //   url: 'http://39.108.15.107',       //小程序端将code传给第三方服务器端，第三方服务器端调用接口，用code换取session_key和openid
            //   data: {
            //     encryptedData: res.detail.encryptedData,
            //     iv: res.detail.iv,
            //     code: code
            //   },
            //   method: 'POST',
            //   success: res => {
            //     if (res.data.code == 200) {
            //       userInfo = {
            //         ...userInfo,
            //         ...res.data.result
            //       }
            //       console.log(userInfo);
            //       console.log(res.data.result)
            //       wx.setStorageSync('userInfo', userInfo);
            //       //授权成功
            //       this.triggerEvent('login', {
            //         status: 1
            //       })
            //       this.$Message({
            //         content: '登录成功',
            //         type: "success"
            //       })
            //       this.handleHide();
            //     } else {
            //       this.triggerEvent('login', {
            //         status: 0
            //       })
            //       this.$Message({
            //         content: '登录失败',
            //         type: 'error'
            //       });
            //       this.handleHide();
            //     }
            //   }
            // })
          }
        })
      } else {
        this.triggerEvent('login', {
          status: 0
        })
        this.$Message({
          content: '登录失败',
          type: 'error'
        });
        this.handleHide();
      }
    },


    // getUserData(res) {
    //   const that = this;
    //   console.log(res)
    //   wx.getSetting({
    //     success: function(res) {
    //       if (res.authSetting["scope.userInfo"]) {
    //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //         wx.getUserInfo({
    //           success: function(res) {
    //             console.log(res)
    //           }
    //         });
    //       }
    //     }.bind(this)
    //   });
    // },  
  }
};
</script>
<style lang="less" scoped>
.page {
  background: #F4F4F8;
  height: 100vh;
  position: relative;
  .my-info{
    background: #FE306B;
    height: 260rpx;
    padding: 0 30rpx;
    position: absolute;
    left: 0;
    top: 0;
    width: 690rpx;
    z-index: 1000;
    &__flex{
      height: 200rpx;
      margin-top: 60rpx;
    }
    .info-img{
      height: 110rpx;
      width: 110rpx;
      margin-right: 30rpx;
      border-radius: 60rpx;
    }
    .info-name{
      font-size: 40rpx;
      font-weight:bold;
      color: #FFFFFF;
      padding: 10rpx;
      &__id{
        font-size: 28rpx;
        font-weight: 400;
        padding: 0 0 8rpx 8rpx;
      }
    }
    .info-btn{
      background-color: #FE306B !important;
      margin: 0;
      color: #fff;
      font-size: 36rpx;
      padding: 0;
    }
    .info-title{
      .info-peg{
        height: 36rpx;
        width: 80rpx;
        background: #ffffff;
        border-radius: 18rpx;
        padding: 0 15rpx;
        margin-right: 20rpx;
      }
      image {
        width: 32rpx;
        height: 32rpx;
      }
      .level{
        font-size:22rpx;
        color:rgba(95,127,223,1);
      }
      .number{
        font-size:22rpx;
        color: #FE9730;
      }
    }
  }

  .info-idol{
    height: 100rpx;
    background: #fff;
    padding: 0 30rpx;
    margin-top: 300rpx;
    &__heig{
      height: 100rpx;
      width: 690rpx;
      border-bottom: 1rpx #E6E6E6 solid;
    }
    image{
      height: 40rpx;
      width: 40rpx;
    }
    .my-idol{
      font-weight:bold;
      color: #333333;
      font-size: 32rpx;
      padding-left: 20rpx;
    }
  }
  // .mar_top{
  //   margin-top: 300rpx;
  // }

  .comBtn{
    .no-idol{
      text-align: center;
      color: #999999;
      font-size:28rpx;
      font-weight:400;
      margin: 220rpx 0 30rpx 0;
    }
  }
  .idol-list{
    background: #fff;
    width: 750rpx;
    margin-top: 1rpx;
  }
  .isIpx {
    margin-bottom: 140rpx;
  }
  .mrg_bottom{
    margin-bottom: 110rpx;
  }
}

</style>


<template>
  <button
    class="common-btn flex a-center j-center"
    :style="btnStyle"
    open-type="getUserInfo"
    lang="zh_CN"
    @getuserinfo="getUserData"
  >
    {{ title }}
  </button>
</template>
<script>
export default {
    name: "CommonBtn",
    inheritAttrs: false,
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
      title(val) {
        //   console.log('val', val)
      },
      btnStyle(val) {
          console.log('val', val)
      }
  },
  mounted() {
    
    //   console.log(this.$attrs['title'])
  },
  methods: {
      getUserData(res) {
        if( wx.getStorageSync('userInfo' )) {
          this.$emit('doBoard')
        } else {
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
        }
      }
  }
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
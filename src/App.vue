<script>
export default {
  mpType: "app",
  data() {
    return {
      websocket: null,
      number: 0
    }
  },
  onLaunch(opts) {
    this.globalData.options = opts;
  },
  onShow() {
    if (!wx.createSelectorQuery) {
      // 首页Tabbar组件依赖此API
      wx.showModal({
        title: "提示",
        content:
          "当前微信版本过低，可能影响使用体验，请升级到最新微信版本后重试。"
      });
    }
    wx.setStorage({
      key: 'noTip',
      data: true
    })
    // this.initWebsocket()
  },
  methods: {
  },
  onPageNotFound(res) {},
  onError(error) {},
  globalData() {
    return {
      options: {}, // 启动参数
      user: {}, // 用户信息
      statusBarHeight: Megalo.getSystemInfoSync()['statusBarHeight'],
      isIos: Megalo.getSystemInfoSync()['system'].search(/iOS/g) !== -1,
      isIpx: Megalo.getSystemInfoSync()['model'].search(/iPhone X/g) !== -1,
      envType: Megalo.getEnv()
    };
  }
};
</script>

<style lang="less">
@import url(./styles/common.less);
</style>

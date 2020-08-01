<template>
  <div class="page">
    <div>
      <Home-cont
        v-if="isSelected === 0"
        ref="home"
        :is-ipx="isIpx"
      />
      <Info-cont
        v-if="isSelected === 1"
        ref="info"
      />
    </div>
    <div class="tab-position">
      <Index-tabbar
        :is-ipx="isIpx"
        @parentsIsActive="parentsIsActive"
      />
    </div>
  </div>
</template>

<script>
import IndexTabbar from "@/components/IndexTabbar";
import HomeCont from "@/components/HomeCont";
import ExamineCont from "@/components/ExamineCont";
import InfoCont from "@/components/InfoCont";
// import Home from "@/pages/Home";
export default {
  components: {
    IndexTabbar,
    HomeCont,
    InfoCont,
  },
  data() {
    return {
      isSelected: 0,
      userTitle: '',
      isIpx: false
    }
  },
  onLoad(opt) {
  },
  onShow() {
  },
  mounted() {
    this.getSystemInfo()
  },
  methods: {
    getSystemInfo() {
      const phone = wx.getSystemInfoSync()
      this.isIpx = phone.model.search(/iPhone X/g) !== -1
    },
    parentsIsActive(i) {
        this.isSelected = i
        this.$nextTick(() => {
          console.log(i)
            switch(i) {
            case 0:
              // if(this.userTitle === 0) {
              //     // this.$refs.home.getHomeData()
              // } else {
              //     this.$refs.watchs.getvideoList()
              // }
              break
            case 1:
              // if(this.userTitle === 0) {
              //     this.$refs.examine.getData();
              // } else {
              //     this.$refs.info.getUserData();
              // }
              break;
          }
        })
    }
  },
};
</script>
<style lang="less" scoped>
.page {
  height: 100%;
  .tab-position{
      position: fixed;
      bottom: 0;
      width: 750rpx;
      border-top: 1px solid #D3DFEF;
  }
}

</style>

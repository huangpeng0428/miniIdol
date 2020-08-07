<template>
  <div class="page">
    <div>
      <Home-cont
        v-if="isSelected === 0"
        ref="home"
      />
      <Info-cont
        v-if="isSelected === 1"
        ref="info"
        @doBillboard="parentsIsActive"
      />
    </div>
    <div class="tab-position">
      <Index-tabbar
        :is-action="isAction"
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
      isSelected: 1,
      userTitle: '',
      isIpx: this.$globalData.isIpx,
      isAction: 0
    }
  },
  onLoad(opt) {
  },
  onShow() {
  },
  mounted() {
    console.log(this.isIpx)
  },
  methods: {
    parentsIsActive(i) {
        this.isAction = i
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
  .tab-position{
      position: fixed;
      bottom: 0;
      width: 750rpx;
      border-top: 1px solid #D3DFEF;
  }
}

</style>

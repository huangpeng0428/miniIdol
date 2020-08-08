<template>
  <div class="page">
    <div
      class="flex page-content"
      :style="pageStyle"
    >
      <div class="flex_1 page-item">
        <Home-cont
          ref="home"
        />
      </div>
      <div class="flex_1 page-item">
        <Info-cont
          ref="info"
          @doBillboard="parentsIsActive"
        />
      </div>
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
      isAction: 0,
      pageStyle: {}
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
            switch(i) {
            case 0:
              this.pageStyle = {'transform': `translateX(${ - i * 750  }rpx)`}
              break
            case 1:
              this.pageStyle = {'transform': `translateX(${ - i * 750  }rpx)`}
              break;
          }
        })
    }
  },
};
</script>
<style lang="less" scoped>
.page {
  .page-content{
    width: 1500rpx;
    // transform: translateX(-750rpx);
    .page-item{
      width: 750rpx;
    }
  }
  .tab-position{
      position: fixed;
      bottom: 0;
      width: 750rpx;
      border-top: 1px solid #D3DFEF;
  }
}

</style>

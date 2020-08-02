<template>
  <scroll-view>
    <!-- :style="{'padding-top': isIos ? statusBarHeight + 'rpx' : ''}" -->
    <div
      class="page flex column"
      :class="[isIpx && envType === 'wechat' ? 'isIpx' : 'mrg_bottom']"
      :style="{'padding-top': statusBarHeight + 'rpx'}"
    >
      <div class="page-content flex column">
        <div
          class="page-title"
          :class="[isIpx && envType === 'wechat' ? 'page-title' : 'page-title-noIpx']"
        >
          榜单
        </div>
        <div
          class="input grow"
          @click="toDetail"
        >
          搜索你想找的明星
        </div>
        <div class="time-over">
          离打榜结束还剩于：4天2小时32分59秒
        </div>
        <div class="ranking-content">
          <div class="ranking-block flex j-center">
            <div
              v-for=" (item, index) in rankingList"
              :key="index"
              class="flex_1 text-center rank-item"
              :class="[index === 1 ? 'rank-item-two' : '']"
            >
              <div class="ranking-cont">
                <image
                  class="ranking-cont__icon"
                  :src="index === 0 ? '/static/png/two.png' : index === 1 ? '/static/png/one.png' : '/static/png/three.png'"
                />
              </div>
              <image
                class="ranking-img"
                src="/static/png/people.png"
              />
              <div class="ranking-name">
                陈冠希
              </div>
              <div class="flex j-center a-center hot-cont">
                <image
                  class="hot-icon"
                  src="/static/png/hot.png"
                  alt=""
                />
                <div
                  class="hot-number"
                  :style="{'color': (index === 1 ? '#FE306B' : '')}"
                >
                  2145万
                </div>
              </div>
              <div @click="openModal">
                <common-Btn />
              </div>
            </div>
            <div class="bg-block">
              <image src="/static/png/block.png" />
            </div>
          </div>
        </div>
      
        <div class="data-list">
          <common-Item />
          <common-Item />
          <common-Item />
          <common-Item />
          <common-Item />
          <common-Item />
          <common-Item />
          <common-Item />
        </div>
      </div>
    </div>
    <maskBox />
  </scroll-view>
</template>
<script>
import CommonBtn from "@/components/commonBtn";
import commonItem from "@/components/commonItem";
import maskBox from "@/components/common-mask/mask-box";
import shareMix from "@/mixins/mixin";
import {
  getParams
} from "@/utils/index";
// import myEvent from "@/utils/event";
export default {
  name: "HomeCont",
  components: {
    CommonBtn,
    commonItem,
    maskBox
  },
  mixins: [shareMix],
  data() {
    return {
      childUserAddress: null,
      userId:"", //userId,
      Userlist: [],
      showUserlist: false,
      examObj:[],
      smokeCountFid:"",
      electronCountFid:"",
      coCountFid:"",
      hydraulicCountFid: "",
      params: "",//参数
      fireHydrantCountFid:"",
      videoCountFid: "",
      netCountFid: "",
      smokeType: '',
      electronType: '',
      coType: '',
      hydraulicType: '',
      fireHydrantType: '',
      videoType: '',
      netType: '',
      rankingList: ['', '', ''],
      statusBarHeight: this.$globalData.statusBarHeight,
      isIos: this.$globalData.isIos,
      isIpx: this.$globalData.isIpx,
      envType: this.$globalData.envType
    };
  },
  onLoad(opt) {
    const value2 = wx.getStorageSync("userId");
    if(!value2){
      wx.reLaunch({
        url: `/pages/login/index`
      });
    } else {
      this.params = wx.getStorageSync('userAddress')
      // this.getHomeData()
    }
  },
  watch: {
    isIpx(val) {
      console.log('val', val)
    }
  },
  mounted() {
  },
  onShow() {
    
  },

  methods: {
    toDetail(){
        wx.navigateTo({
          url: `/pages/home/detail`
        });
    },
    clickProvince({fID, fType}){
      let params = getParams(this.params)
      params['facilityinfoId'] = fID
      params['type'] = fType

    this.$request
      .post("/facilityInfo/queryFacilityInfo.do",params)
      .then(res => {
       const data = res
       console.log('data: ', data);
        wx.navigateTo({
          url: `/pages/dataDetail/index?fType=${fType}&facilityinfoId=${fID}&isOnline=${data[0].isOnline}`
        });
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
      });
    },
    filterdata(data){
        data.forEach(val=>{
             switch (val.ftype) {
              case "0":
                 this.smokeCountFid = val.countFid
                 this.smokeType = val.ftype
                 break
              case "3":
                 this.electronCountFid = val.countFid
                 this.electronType = val.ftype
                 break
              case "1":
                 this.coCountFid = val.countFid
                 this.coType = val.ftype
                 break
              case "2":
                 this.hydraulicCountFid = val.countFid
                 this.hydraulicType = val.ftype
                 break
              case "7":
                 this.fireHydrantCountFid = val.countFid
                 this.fireHydrantType = val.ftype
                 break
              case "4":
                 this.videoCountFid = val.countFid;
                 this.videoType= val.ftype;
                 break
              case "8":
              this.netCountFid = val.countFid;
              this.netType= val.ftype;
              default :
                return ;
             }
        })
    },
    getHomeData(){
      this.$refs.adress.initData()
      this.params = wx.getStorageSync('userAddress')
      if(this.params) {
        this.childUserAddress = this.params.province + this.params.city + this.params.prefecture + this.params.areaName + this.params.placeName
      }
      let params = getParams(this.params);
      params['userId'] = wx.getStorageSync('userId') || 2002131059424992;
      this.$request
      .post("/facilityInfo/countFacility.do",params)
      .then(res => {
       const data = res
        this.filterdata(data)
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
      });
    },
    jumpUrl(type) {
      if(type != 8) {
        wx.navigateTo({
          url: `/pages/equipmentlist/index?type=${type}`
        });
      }
    },
    openModal() {
      console.log(111)
      Megalo.showModal({
      title: "请求获得定位权限",
      content: "获得你的地理位置能够更好的为你推荐本地信息",
      success(res) {
        if (res.confirm) {
          console.log("confirm, continued");
        } else if (res.cancel) {
          console.log("cancel, cold");
        } else {
          // what happend?
        }
      },
      fail(res) {
        console.log(`showModal调用失败`);
      },
    })
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  height: 100%;
  background-color: #FE306B;
  .page-content{
    .page-title{
      height: 180rpx;
      line-height: 180rpx;
      text-align: center;
      font-size:36rpx;
      font-weight:bold;
      color: #ffffff;
    }
    .page-title-noIpx{
      height: 160rpx;
      line-height: 160rpx;
    }
    .input{
      margin:0rpx 44rpx 24rpx;
      background-color:#FE97B5;
      color: #fff;
      width: 690rpx;
      height: 70rpx;
      border-radius: 50rpx;
      text-align: center;
      line-height: 70rpx;
    }
    .time-over{
      color: rgba(255,255,255,0.80);
      text-align: center;
      font-size: 24rpx;
    }
    .ranking-content{
      width: 750rpx;
      height: 514rpx;
      .ranking-block{
        box-sizing: border-box;
        padding-top: 10rpx;
        width: 690rpx;
        height: 384rpx;
        margin: 100rpx auto 30rpx;
        background: #fff;
        border-radius: 20rpx;
        position: relative;
        .rank-item{
          height: 384rpx;
          .ranking-cont{
            height: 60rpx;
            width: 100%;
            &__icon{
              padding-top: 18rpx;
              height: 52rpx;
              width: 60rpx;
            }
          }
          
          .ranking-img{
            width: 100rpx;
            height: 100rpx;
            margin-bottom: 10rpx;
          }
          .ranking-name{
            color: #000000;
            font-weight:bold;
            font-size:24rpx;
          }
          .hot-cont{
            margin: 5rpx auto 20rpx;
            .hot-icon{
              width: 30rpx;
              height: 30rpx;
            }
            .hot-number{
              font-size:32rpx;
              font-weight:bold;
              padding-left: 8rpx;
            }
          }
        }
        .rank-item-two {
          flex: 0 1 240rpx;
          margin-top: -50rpx;
          z-index: 100;
          background: #fff;
          border-radius: 20rpx 20rpx 0 0;
          height: 384rpx;
          .ranking-cont{
            height: 70rpx;
            width: 100%;
            background: #fff;
            border-radius: 20rpx 20rpx 0 0;
            &__icon{
              padding-top: 28rpx;
              height: 52rpx;
              width: 60rpx;
              z-index: -1;
            }
          }
          .ranking-img{
            width: 140rpx;
            height: 140rpx;
            margin-bottom: 10rpx;
            z-index: 99999;
          }
        }
        .bg-block {
          position: absolute;
          top: 0;
          image{
            width: 265rpx;
            height: 197rpx;
          }
        }
      }
    }

    .scroll-data{
      height: 100%;
      background: #fff;
    }
    .data-list{
      border-radius: 40rpx 40rpx 0 0 ;
      padding-top: 24rpx;
      // height: 500rpx;
      background: #fff;
      flex: 1;
    // }
  }
  }
}
.isIpx {
  margin-bottom: 120rpx;
}
.mrg_bottom{
  margin-bottom: 110rpx;
}




</style>


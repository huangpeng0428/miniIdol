<template>
  <div class="page flex column">
    <div class="head flex column">
      <div
        class="input grow"
        @click="toDetail"
      >
        搜索你想找的明星
      </div>
      <div class="time-over">
        离打榜结束还剩于：4天2小时32分59秒
      </div>
      <div class="ranking-block flex j-center">
        <div
          v-for=" (item, index) in rankingList"
          :key="index"
          class="flex_1 text-center rank-item"
        >
          <div class="ranking-cont">
            <image
              class="ranking-cont__icon"
              src="/static/png/two.png"
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
            <div class="hot-number">
              2145万
            </div>
          </div>
          <common-Btn />
        </div>
      </div>
      <scroll-view
        class="flex_1"
        :scroll-y="true"
      />
    </div>
  </div>
</template>
<script>
import CommonBtn from "@/components/commonBtn";
import shareMix from "@/mixins/mixin";
import {
  getParams
} from "@/utils/index";
// import myEvent from "@/utils/event";
export default {
  name: "HomeCont",
  components: {
    CommonBtn
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
      rankingList: ['', '', '']
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
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  height: 93vh;
  background-color: #FE306B;
  .head{
    .input{
      margin:24rpx 44rpx;
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
    .ranking-block{
      box-sizing: border-box;
      padding: 10rpx 30rpx 30rpx 30rpx;
      width: 690rpx;
      height: 384rpx;
      margin: 100rpx auto 30rpx;
      background: #fff;
      border-radius: 20rpx;
      .rank-item{
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
    }
  }
  .UserList{
    background-color: #ffffff;
    margin: -45rpx 80rpx 0;
    text-align: center;
  }
  .pannel{
    height: 75vh;
    &__item{
      display:inline-block;
      margin:20rpx;
      width: 332rpx;
      height : 290rpx;
      background: #ffffff;
      border-radius: 24rpx;
      text-align: center;
      padding-top: 60rpx;
      .blue{
        font-size:44rpx;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(52,81,253,1);
      }
      p{
        margin-top:20rpx;
        margin-bottom: 20rpx;
      }
      span{
        margin-top: 50rpx;
        margin-left: 10rpx;
      }
      .iconfont{
        width: 72rpx;
        height:88rpx;
        margin: 0 auto;
        // margin-top: 50rpx;
      }
    }
  }
}




</style>


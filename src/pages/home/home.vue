<template>
  <div class="page flex column">
    <!-- 首页 -->
    <div class="head">
      <div
        class="input grow"
        @click="toDetail"
      >
        输入您想查询的设备ID或者关键字
      </div>
      <scroll-view
        style="{'height': '81vh'}"
        :scroll-y="true"
      />
    </div>
  </div>
</template>
<script>
// import AdressInfo from "@/components/adressInfo";
import shareMix from "@/mixins/mixin";
import {
  getParams
} from "@/utils/index";
// import myEvent from "@/utils/event";

// {
// 					"id": -1,
// 					"name": "首页",
// 					"pathName": "pages/home/index",
// 					"query": "tab=home",
// 					"scene": null
// 				},
export default {
  name: "Home",
  components: {
    // AdressInfo
  },
  mixins: [shareMix],
  data() {
    return {
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
      netType: ''
    };
  },
  onLoad(opt) {
    this.toPage = opt.toPage;
    this.tab = opt.tab;
  },
  onShow() {
    const value2 = wx.getStorageSync("userId");
    if(!value2){
      // wx.reLaunch({
      //   url: `/pages/login/index`
      // });
    } else {
      this.params = wx.getStorageSync('userAddress')
      this.getData();
      this.onTabChange(this.tab);
    }
  },

  methods: {
    onTabChange(tab = "home") {
      this.tab = tab;
      if (this.tab === "home") {
      }
      if (this.tab === "mail") {
      }
      if (this.tab === "mine") {
      }
    },
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
    getData(){
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
  height: 100vh;
  background-color: #FE306B;
  .head{
    .input{
      margin:44rpx;
      background-color:#ffffff;
      width: 662rpx;
      height: 80rpx;
      border-radius: 50rpx;
      text-align: center;
      line-height: 80rpx;
    }
  }
  .UserList{
    background-color: #ffffff;
    margin: -45rpx 80rpx 0;
    text-align: center;
  }
  .pannel{
    height: 81vh;
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


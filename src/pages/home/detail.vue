<template>
  <div class="page flex column">
    <div class="search-content">
      <div class="flex a-center j-between">
        <!-- @input="fetchSearch" -->
        <input
          v-model="starName"
          class="input"
          maxlength="40"
          placeholder="搜索你想找的明星"
          :focus="focusInput"
        >
        <div
          class="seacr-btn"
          @click="fetchSearch"
        >
          搜索
        </div>
      </div>
    </div>
    <div
      v-if="Array.isArray(starInfo) && !starInfo.length && !!starName"
      class="comBtn"
      @click="showMask = true"
    >
      <div class="no-idol">
        暂时还未收录该明星
      </div>
      <common-Btn
        :title="btnTitle"
        :btn-style="btnStyle"
      />
    </div>
    <scroll-view>
      <div
        v-if="!!(starInfo && starInfo.start_name)"
        class="data-list"
      >
        <common-Item
          :star-info="starInfo"
          @doBoard="doBoard"
        />
      </div>
    </scroll-view>
    <maskBox
      :is-show-message-box="showMask"
      title="输入需要收录的明星名字"
      :content="``"
      place="请输入需要收录的明星名字"
      @confirm="addStar"
      @close="showMask = false"
    />
  </div>
</template>
<script>
import commonItem from "@/components/commonItem";
import commonBtn from "@/components/commonBtn";
import maskBox from "@/components/mask-box";
import shareMix from "@/mixins/mixin";
import { promisify } from "@/utils/index";
import {
  getParams
} from "@/utils/index";
export default {
  name: "Detail",
  components: {
    commonBtn,
    maskBox,
    commonItem
  },
  mixins: [shareMix],
  data() {
    return {
      showMask: false,
      starName: "",
      starInfo: {},
      showStarlist: false,
      focusInput: true,
      btnTitle: '申请收录',
      btnStyle: {width: '184rpx;', height: '70rpx;', 'border-radius': '40rpx;' },
    }
  },
  onShow() {
    console.log(commonItem)
  if (this.toPage) {
    let toPage = this.toPage;
  }
  this.params = wx.getStorageSync('userAddress')
  },
  mounted() {
  },
  methods: {
    doBoard() {
      wx.showToast({
        title: '功能完善中...',
        icon: "none"
      });
    },
    addStar(val) {
      if(!val) {
        return wx.showToast({
          title: '请输入需要收录的明星姓名',
          icon: "none"
        });
      }
      this.$request.post('/app/included/insert', {
        start_name: val
      }).then(res => {
        // this.starInfo = res.data
        wx.showToast({
          title: res.msg,
          icon: "none"
        });
      }).catch(err => {
        return wx.showToast({
          title: err.msg,
          icon: "none"
        });
      })
    },
    fetchSearch() {
      if(!this.starName) {
        return wx.showToast({
          title: '请输入明星姓名搜索',
          icon: "none"
        });
      }
      this.$request.post('/app/start/search', {
        start_name: this.starName
      }).then(res => {
        this.starInfo = res.data
        console.log(this.starInfo)
        console.log(!!(this.starInfo && this.starInfo.start_name))
      }).catch(err => {
        return wx.showToast({
          title: err.msg,
          icon: "none"
        });
      })
    },
    bindUserId(e){
      console.log(this.starName)
      // let param = e.detail.value;
      // var reg = /\D/;    
      // this.isNumber = !reg.test(param); 
      // var pattern=new RegExp(reg);
      // let params = getParams(this.params);
      // params['userId'] = wx.getStorageSync('userId') || 2002131059424992;
      // params['param'] = param;

      // this.$request
      // .post("/search/likeSearch.do",params)
      // .then(res => {
      //  const data = res.list;
      //   this.Userlist = data;
      //   console.log('this.Userlist: ', this.Userlist);
      //   if(data.length !=0){
      //     this.showUserlist = true;
      //   }
      // })
      // .catch(err => {
      //   return wx.showToast({
      //     title: "获取失败",
      //     icon: "none"
      //   });
      // });
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
  },
};
</script>
<style lang="less" scoped>
.page {
  height: 100vh;
  background-color: #ffffff;
    .search-content{
      padding: 20rpx 30rpx;
      height: 70rpx;
      input{
        background-color:#F4F4F8;
        width: 556rpx;
        height: 70rpx;
        border-radius: 50rpx;
        line-height: 70rpx;
        padding-left: 40rpx;
      }
      .seacr-btn{
        font-size:32rpx;
        font-weight:bold;
        color: #333333;
      }
    }
    .comBtn{
      .no-idol{
        text-align: center;
        color: #999999;
        font-size:28rpx;
        font-weight:400;
        margin: 220rpx 0 30rpx 0;
      }
    }
    .data-list {
      flex: 1;
    }
  }

</style>

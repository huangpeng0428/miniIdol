<template>
  <div class="page flex column">
    <div class="search-content">
      <div class="flex a-center j-between">
        <input
          class="input"
          maxlength="40"
          placeholder="搜索你想找的明星"
          :focus="focusInput"
          :value="userId"
          @input="bindUserId"
        >
        <div class="seacr-btn">
          搜索
        </div>
      </div>
    </div>
    <!-- <scroll-view class="data-list">
      <common-Item />
    </scroll-view> -->
    <scroll-view>
      <div class="data-list">
        <common-Item />
        <common-Item />
        <common-Item />
        <common-Item />
        <common-Item />
        <common-Item />
        <common-Item />
        <common-Item />
        <common-Item />
        <common-Item />
        <common-Item />
        <common-Item />
        <common-Item />
        <common-Item />
        <common-Item />
        <common-Item />
      </div>
    </scroll-view>
  </div>
</template>
<script>
import commonItem from "@/components/commonItem";
import shareMix from "@/mixins/mixin";
import { promisify } from "@/utils/index";
import {
  getParams
} from "@/utils/index";
export default {
  name: "Detail",
  components: {
    commonItem
  },
  mixins: [shareMix],
  data() {
    return {
      userId:"", //userId,
      Userlist: [],
      showUserlist: true,
      focusInput: true
    }
  },
  onShow() {
    console.log(commonItem)
  if (this.toPage) {
    let toPage = this.toPage;
  }
  this.params = wx.getStorageSync('userAddress')
  },
  methods: {
    bindUserId(e){
      let param = e.detail.value;
      var reg = /\D/;    
      this.isNumber = !reg.test(param); 
      var pattern=new RegExp(reg);
      let params = getParams(this.params);
      params['userId'] = wx.getStorageSync('userId') || 2002131059424992;
      params['param'] = param;

      this.$request
      .post("/search/likeSearch.do",params)
      .then(res => {
       const data = res.list;
        this.Userlist = data;
        console.log('this.Userlist: ', this.Userlist);
        if(data.length !=0){
          this.showUserlist = true;
        }
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
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
    .data-list {
      flex: 1;
    }
  }

</style>

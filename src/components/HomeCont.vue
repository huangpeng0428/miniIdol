<template>
  <div>
    <scroll-view
      class="scroll-page"
      lower-threshold="100"
      scroll-y
      @scrolltolower="scrollToLower"
    >
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
                :key="item.start_id"
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
                  :src="item.start_avatar || '/static/png/imgLoading.png'"
                />
                <div
                  class="ranking-name"
                >
                  {{ item.start_name }}
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
                    {{ item.start_hot }}
                  </div>
                </div>
                <div @click="doBoardMask(item)">
                  <common-Btn />
                </div>
              </div>
              <div class="bg-block">
                <image src="/static/png/block.png" />
              </div>
            </div>
          </div>
      
          <div class="data-list">
            <common-Item
              v-for="item in dataList"
              :key="item.start_id"
              :star-info="item"
              @doBoard="doBoardMask(item)"
            />
          </div>
        </div>
      </div>
      <mask-box
        :is-show-message-box="showMask"
        @close="showMask = false"
      >
        <div class="mask-content">
          <div class="mask-img">
            <image
              class="mask-img"
              :src="starItemData.start_avatar ? starItemData.start_avatar : '/static/png/imgLoading.png'"
            />
          </div>
        
          <div class="mask-content__text">
            支持一下<span class="mask-content__name">{{ starItemData.start_name }}</span>
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
              {{ starItemData.start_hot }}
            <!-- {{ item.start_hot }} -->
            </div>
          </div>
          <div @click="doBoard">
            <common-Btn 
              title="看视频打榜"
              :btn-style="btnStyle"
            />
          </div>
          <div class="ticket">
            看一次视频支持<span>5票</span>
          </div>
          <div class="flex j-end check-conten">
            <checkbox-group @change="changeCb">
              <checkbox
                class="cb"
                color="#FE9730"
                :value="isTip"
                :checked="true"
              >
                <span>不再提示</span>
              </checkbox>
            </checkbox-group>
          </div>
        </div>
      </mask-box>
    </scroll-view>
    <div
      class="tab-position"
    >
      <div class="tab-bar flex j-between">
        <div
          v-for="(item, index) in tabList"
          :key="index"
          class="home-tab tab-com flex_1 flex column a-center j-center"
          :class="{'tab-isIpx': isIpx}"
          @click="parentsIsActive(index)"
        >
          <img
            class="tab-com-img"
            :src="indexAction == index? item.activeimgSrc : item.imgSrc"
          >
          <div :class="indexAction == index ? 'activeColor' : ''">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CommonBtn from "@/components/commonBtn";
import commonItem from "@/components/commonItem";
import maskBox from "@/components/mask-box";
import IndexTabbar from "@/components/IndexTabbar";
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
    maskBox,
    // IndexTabbar
  },
  mixins: [shareMix],
  data() {
    return {
      showMask: false,
      childUserAddress: null,
      userId:"", //userId,
      btnStyle: {width: '360rpx;', height: '80rpx;', 'border-radius': '40rpx;' },
      starItemData: {},
      pageno: 1,
      noMore: false,
      indexAction: 0,
      tabList: [{imgSrc: '/static/png/index.png', activeimgSrc: '/static/png/index-action.png', text: '榜单'},{imgSrc: '/static/png/mine.png',activeimgSrc: '/static/png/my-action.png', text: '我的'}],
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
      rankingList: [],
      dataList: [],
      statusBarHeight: this.$globalData.statusBarHeight,
      isIos: this.$globalData.isIos,
      isIpx: this.$globalData.isIpx,
      envType: this.$globalData.envType
    };
  },
  onLoad(opt) {
    console.log(opt)
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
    this.fetchRankList()
  },
  onShow() {
    console.log('show')
  },

  onReachBottom() {
    console.log(111)
  },

  methods: {
    fetchRankList(isPage) {
      wx.showLoading()
      this.$request.post('/app/start/rank', {pageno: this.pageno}).then(res => {
        if(isPage) {
          if(!res.data.length) this.noMore = true
          this.dataList = [...this.dataList, ...res.data]
        } else {
          this.rankingList = res.data.splice(0, 3)
          this.rankingList.splice(1, 0, ...this.rankingList.splice(0, 1))
          this.dataList = res.data
        }
        
        
        
        // this.$set(this, 'dataList', res.data)
        wx.hideLoading()
      })
    },
    toDetail(){
        wx.navigateTo({
          url: `/pages/home/detail`
        });
    },
    doBoardMask(data){
      if(wx.getStorageSync('noTip')) {
        this.doBoard()
      } else {
        this.starItemData = data
        console.log(this.starItemData)
        this.showMask = true
      }
    },
    doBoard() {
      wx.showToast({
        title: '功能完善中...',
        icon: "none"
      });
    },
    changeCb(val) {
      if(!val.detail.value.length) {
        wx.setStorage({
          key: 'noTip',
          data: true
        })
      }
    },
    
    scrollToLower() {
      if(this.noMore) return
      this.pageno += 1
      this.fetchRankList(true)
      console.log(111)
    },

    parentsIsActive(i) {
      this.$emit('jumpPage', i)
    }
  }
};
</script>
<style lang="less" scoped>
.scroll-page{
  height: 100vh;
}
.page {
  // height: 100%;
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
            border-radius: 50%;
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
.mask-content{
  position: relative;
  text-align: center;
  .mask-img{
    margin: -40rpx auto 10rpx;
    image{
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
    }
  }
  .hot-cont{
    margin: 5rpx auto 40rpx;
    .hot-icon{
      width: 30rpx;
      height: 30rpx;
    }
    .hot-number{
      font-size:32rpx;
      font-weight:bold;
      padding-left: 8rpx;
      color: #FE306B;
    }
  }
  &__text{
    color: #000000;
    font-size: 32rpx;
    font-weight: bold;
  }
  &__name{
    color: #FE306B;
  }
  .ticket{
    color: #999999;
    font-size: 24rpx;
    margin: 5px auto 10rpx;
    span{
      color: #FE306B;
    }
  }
  .check-conten{
    .cb{
      transform: scale(0.6,0.6);
    }
    span{
      color: #999;
      font-size: 34rpx;
    }
  }

}
.isIpx {
  margin-bottom: 120rpx;
}
.mrg_bottom{
  margin-bottom: 110rpx;
}
.tab-position{
  position: fixed;
  bottom: 0;
  width: 750rpx;
  border-top: 1px solid #D3DFEF;

  .tab-bar{
    // height: 98rpx;
    width: 750rpx;
    background: #fff;
    padding: 20rpx 0;
    .tab-com{
      color: #D2DEEF;
      font-size: 22rpx;
      .tab-com-img{
        height: 44rpx;
        width: 44rpx;
      }
    }
    .tab-isIpx{
      padding-bottom: 30rpx !important;

    }
    .activeColor{
      color: #FE306B;
    }
  }
}





</style>


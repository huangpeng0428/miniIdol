<template>
  <div
    v-show="isShowMessageBox"
    ref="messageBox"
    class="message-box"
  >
    <div
      class="mask"
      @click="cancel"
    />
    <div
      ref="messageBox"
      class="message-content"
    >
      <!-- <svg class="icon" aria-hidden="true" @click="cancel">
        <use xlink:href="#icon-delete"></use>
      </svg> -->
      <h3 class="title">
        {{ title }}
      </h3>
      <p
        v-if="isShowContent"
        class="content c-999"
      >
        {{ content }}
      </p>
      <div>
        <input
          v-if="isShowInput"
          ref="input"
          v-model="inputValue"
          :placeholder="place"
          type="text"
          class="txt"
          @blur="moveDown"
        >
      </div>
      <div class="btn-group flex cm-border cm-border-top lh-50">
        <button
          v-show="isShowCancelBtn"
          class="bn"
          @click="cancel"
        >
          {{ cancelBtnText }}
        </button>
        <button
          v-show="isShowConfimrBtn"
          class="btn-primary bn"
          @click="confirm"
        >
          {{ confirmBtnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>

// 公共弹窗学习
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    content: {
      type: String,
      default: '这是弹框内容'
    },
    place: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/require-default-prop
    isShowInput: {
        type: Boolean,
        default() {
            return true
        }
    },
    // eslint-disable-next-line vue/require-default-prop
    inputValue: {
        type: String,
        default() {
            return ''
        }
    },
    isShowCancelBtn: {
      type: Boolean,
      default: true
    },
    // eslint-disable-next-line vue/require-default-prop
    isShowContent: {
        type: Boolean,
        default() {
            return true
        }
    },
    isShowConfimrBtn: {
      type: Boolean,
      default: true
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    }
  },
  data() {
    return {
      isShowMessageBox: true,
      resolve: '',
      reject: '',
      promise: '' // 保存promise对象
    };
  },
  mounted() {
      console.log(11)
  },
  methods: {
    showBox() {
       this.isShowMessageBox = true
       return new Promise((resolve, reject) => {
         this.resolve = resolve
         this.reject = reject
       })
    },
    cancel() {
      console.log(1)
      this.isShowMessageBox = false
    },
    confirm() {
      this.isShowMessageBox = false
      if (this.isShowInput) {
        this.resolve(this.inputValue);
      } else {
        this.resolve('confirm');
      }
      this.remove();
    },
    moveDown() {
      setTimeout(function() {
        document.body.scrollTop = document.body.scrollHeight;
      }, 0);
    },
    remove: function() {
      setTimeout(() => {
        this.destroy();
      }, 300);
    },
    destroy: function() {
      this.$destroy();
      document.body.removeChild(this.$el);
    }
  }
};
</script>

<style lang='less' scoped>
.message-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1111;

  .mask {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .message-content {
    margin-left: 105rpx;
    // transform: translate(-50%, -50%);
    box-sizing: border-box;
    width:540rpx;
    padding: 40rpx 40rpx 0 40rpx;
    background: #fff;
    border-radius: 20rpx;
    margin-top: 480rpx;
    position: relative;

    .icon {
      position: absolute;
      right: -5px;
      top: -5px;
      width: 20px;
      height: 20px;
      background-size: cover;
    }
    .title {
      text-align: center;
      font-size: 32rpx;
      font-weight:bold;
    }
    .content {
      margin-top: 10px;
    }
    .txt {
      height: 80rpx;
      box-sizing: border-box;
      padding: 5px 10px;
      line-height: 40rpx;
      font-size: 30rpx;
      width: 100%;
      margin: 30rpx 0;
      background: #F2F2F2;
      border: none;
      border-radius:8rpx;
    }
    .btn-group {
      width: 100%;
      font-size: 32rpx;
      display: flex;
      line-height: 88rpx;
      height: 88rpx;
      border-top: 1px solid #f1f1f1;
      align-items: center;

      &.cm-border.cm-border-top:before {
        background: #f5f5f5;
      }

      .bn {
        width: 50%;
        background: #fff;
        border: none;
        border-radius: 6px;
        outline: none;
        font-size:32rpx;
      }
      .btn-primary {
        color: #FE9730;
      }
      &:after {
        position: relative;
        content: '';
        width: 1px;
        height: 22px;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        background: #f1f1f1;
      }
    }

    input {
      -webkit-appearance: none;
    //   border-radius: 0;
    }
  }
}
</style>

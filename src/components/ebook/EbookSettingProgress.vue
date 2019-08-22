<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTimeText()}}</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper" @click="prevSection()">
            <span class="icon-back"></span>
          </div>
          <input
            class="progress"
            type="range"
            max="100"
            min="0"
            step="1"
            @change="onProgressChange($event.target.value)"
            @input="onProgressInput($event.target.value)"
            :value="progress"
            :disabled="!bookAvailable"
            ref="progress"
          />
          <div class="progress-icon-wrapper" @click="nextSection()">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span>({{bookAvailable ? progress + '%' : '加载中...'}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";

export default {
  mixins: [ebookMixin],
  methods: {
    onProgressChange(progress) {
      //   this.setProgress(progress);
      //   this.displayProgress();
    },
    onProgressInput(progress) {
      this.setProgress(progress);
      this.displayProgress();
      this.updateProgressBg();
    },
    displayProgress() {
      // 通过百分比获取某一页的内容
      const cfi = this.currentBook.locations.cfiFromPercentage(
        this.progress / 100
      );
      // 渲染该页的内容
      this.display(cfi);
      // this.currentBook.rendition.display(cfi).then(()=>{
      //   this.refreshLocation()
      // });
    },
    updateProgressBg() {
      // ${this.progress}%  进度条左侧,即小球的左侧部分,
      // 100% 进度条右侧，即小球右侧，这里指右侧剩下的全部
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
    },
    prevSection() {
      // 章节大于0并且已经准备完成
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1);
        this.displaySection();
      }
    },
    nextSection() {
      // this.currentBook.spine.length 总章节，章节从0开始需要减1
      if (
        this.section < this.currentBook.spine.length - 1 &&
        this.bookAvailable
      ) {
        this.setSection(this.section + 1);
        this.displaySection();
      }
    },
    // 显示章节
    displaySection() {
      // 获取章节信息
      const sectionInfo = this.currentBook.section(this.section);
      if (sectionInfo && sectionInfo.href) {
        // 显示章节信息
        // this.currentBook.rendition.display(sectionInfo.href).then(() => {
        //   this.refreshLocation();
        // });
        this.display(sectionInfo.href);
      }
    }
  },
  computed: {
    // 获取章节名称
    getSectionName() {
      // if (this.section) {
      //   // 获取当前章节
      //   const sectionInfo = this.currentBook.section(this.section);
      //   if (sectionInfo && sectionInfo.href) {
      //     // 获取章节名称
      //     return this.currentBook.navigation.get(sectionInfo.href).label;
      //   }
      // }
      // return "";
      return this.section&&this.navigation ? this.navigation[this.section].label : "";
    }
  },
  updated() {
    this.updateProgressBg();
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/styles/mixin.less";
.setting-wrapper {
  position: absolute;
  bottom: 0.48rem;
  left: 0;
  z-index: 101;
  width: 100%;
  height: 0.9rem;
  background: white;
  box-shadow: 0 -0.08rem 0.08rem rgba(0, 0, 0, 0.15);
  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    .read-time-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 0.4rem;
      font-size: 0.12rem;
      .center();
    }
    .progress-wrapper {
      width: 100%;
      height: 100%;
      .center();
      padding: 0 0.15rem;
      box-sizing: border-box;
      .progress-icon-wrapper {
        font-size: 0.2rem;
      }
      .progress {
        width: 100%;
        -webkit-appearance: none;
        height: 0.02rem;
        margin: 0 0.1rem;
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 0.2rem;
          width: 0.2rem;
          border-radius: 50%;
          background: white;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
          border: 0.01rem solid #ddd;
        }
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: 0.1rem;
      width: 100%;
      color: #333;
      font-size: 0.12rem;
      padding: 0 0.15rem;
      box-sizing: border-box;
      .center();
      .progress-section-text {
        .ellipsis();
      }
    }
  }
}

.slide-up-enter,
.slide-up-leave-to {
  transform: translate3d(0, 100%, 0);
}
.slide-up-enter-to,
.slide-up-leave {
  transform: translate3d(0, 0, 0);
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s linear;
}
</style>

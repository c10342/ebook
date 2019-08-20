<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div
          class="ebook-popup-item"
          v-for="(item, index) in fontFamilyList"
          :key="index"
          @click="setFontFamily(item.font)"
        >
          <div class="ebook-popup-item-text" :class="{'selected': isSelected(item)}">{{item.font}}</div>
          <div class="ebook-popup-item-check" v-if="isSelected(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
import { FONT_FAMILY } from "../../utils/book";
import {saveFontFamily} from '../../utils/localStorage'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      fontFamilyList: FONT_FAMILY
    };
  },
  methods: {
    hide() {
      this.setFontFamilyVisible(false);
    },
    isSelected(item) {
      return item.font === this.defaultFontFamily;
    },
    setFontFamily(font) {
      this.setDefaultFontFamily(font);
      saveFontFamily(this.fileName,font)
      // 设置字体
      if (font == "Default") {
        this.currentBook.rendition.themes.font("Times New Roman");
      } else {
        this.currentBook.rendition.themes.font(font);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/styles/mixin.less";
.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  background: white;
  box-shadow: 0 -0.04rem 0.06rem rgba(0, 0, 0, 0.1);
  .ebook-popup-title {
    position: relative;
    padding: 0.15rem;
    box-sizing: border-box;
    border-bottom: 0.01rem solid #b8b9bb;
    text-align: center;
    .center();
    .ebook-popup-title-icon {
      position: absolute;
      left: 0.15rem;
      top: 0;
      height: 100%;
      font-size: 0.16rem;
      font-weight: bold;
      .center();
    }
    .ebook-popup-title-text {
      font-size: 0.14rem;
      font-weight: bold;
    }
  }
  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      display: flex;
      padding: 0.15rem;
      .ebook-popup-item-text {
        flex: 1;
        font-size: 0.14rem;
        text-align: left;
        &.selected {
          color: #346cb9;
          font-weight: bold;
        }
      }
      .ebook-popup-item-check {
        flex: 1;
        text-align: right;
        font-size: 0.14rem;
        font-weight: bold;
        color: #346cb9;
      }
    }
  }
}

.popup-slide-up-enter-active,
.popup-slide-up-leave-active {
  transition: all 0.3s linear;
}
.popup-slide-up-enter,
.popup-slide-up-leave-to {
  transform: translate3d(0, 100%, 0);
  opacity: 0;
}
.popup-slide-up-enter-to,
.popup-slide-up-leave,
.fade-slide-right-enter-to,
.fade-slide-right-leave {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
</style>
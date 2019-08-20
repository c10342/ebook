<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible===1">
      <div class="setting-theme">
        <div
          class="setting-theme-item"
          v-for="(item, index) in themeList"
          :key="index"
          @click="setTheme(index)"
        >
          <div
            class="preview"
            :style="{background: item.style.body.background}"
            :class="{'selected':item.name === defaultTheme}"
          ></div>
          <div class="text" :class="{'selected': item.name === defaultTheme}">{{item.alias}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
import {saveTheme} from '../../utils/localStorage'
export default {
  mixins: [ebookMixin],
  methods: {
    setTheme(index) {
      const theme = this.themeList[index];
      this.setDefaultTheme(theme.name);
      saveTheme(this.fileName,theme.name)
      this.currentBook.rendition.themes.select(this.defaultTheme)
      this.initGlobalStyle()
    }
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
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0.05rem;
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: 0.01rem solid #ccc;
        box-sizing: border-box;
        &.selected {
          box-shadow: 0 0.04rem 0.06rem 0 rgba(0, 0, 0, 0.1);
        }
      }
      .text {
        flex: 0 0 0.2rem;
        font-size: 0.14rem;
        color: #ccc;
        .center();
        &.selected {
          color: #333;
        }
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
<template>
  <div>
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow': !menuVisible || settingVisible>=0}" v-show="menuVisible">
        <div class="icon-wrapper">
          <span class="icon-menu icon" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress icon" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright icon" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-a icon" @click="showSetting(0)">A</span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
  </div>
</template>

<script>
import {ebookMixin} from '../../utils/mixin'
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopup from './EbookSettingFontPopup'
export default {
  mixins:[ebookMixin],
  components:{
    EbookSettingFont,
    EbookSettingFontPopup
  },
  methods: {
    showSetting(key) {
      this.setSettingVisible(key)
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/styles/mixin.less";
.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 102;
  display: flex;
  width: 100%;
  height: 0.48rem;
  background: white;
  box-shadow: 0 -0.08rem 0.08rem rgba(0, 0, 0, 0.15);
  &.hide-box-shadow {
    box-shadow: none;
  }
  .icon-wrapper {
    flex: 1;
    .center();
    .icon{
        font-size: @icon-fontSize;
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
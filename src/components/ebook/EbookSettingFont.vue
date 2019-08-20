<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible===0">
      <div class="setting-font-size">
        <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
        <div class="select">
          <div
            class="select-wrapper"
            v-for="(item, index) in fontSizeList"
            :key="index"
            @click="setFontSize(item.fontSize)"
          >
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point" v-show="defaultFontSize === item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div
          class="preview"
          :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}"
        >A</div>
      </div>
      <div class="setting-font-family" @click="showFontFamilyPopup">
          <div class="setting-font-family-text-wrapper">
              <span class="setting-font-family-text">{{defaultFontFamily}}</span>
          </div>
          <div class="setting-font-family-icon-wrappe">
              <span class="icon-forward"></span>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {FONT_SIZE_LIST} from '../../utils/book'
import {ebookMixin} from '../../utils/mixin'
import {saveFontSize} from '../../utils/localStorage'
export default {
    mixins:[ebookMixin],
    data(){
        return {
            fontSizeList:FONT_SIZE_LIST
        }
    },
    methods:{
        setFontSize(fontSize){
            this.setDefaultFontSize(fontSize)
            saveFontSize(this.fileName,fontSize)
            // 设置电子书字体
            this.currentBook.rendition.themes.fontSize(fontSize)
        },
        showFontFamilyPopup(){
            this.setFontFamilyVisible(true)
        }
    }
}
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
  display: flex;
  flex-direction: column;
  .setting-font-size {
      flex: 2;
    display: flex;
    height: 100%;
    .preview {
      flex: 0 0 0.4rem;
      .center();
    }
    .select {
      display: flex;
      flex: 1;
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
        .line {
          flex: 1;
          height: 0;
          border-top: 0.01rem solid #ccc;
        }
        .point-wrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: 0.07rem;
          border-left: 0.01rem solid #ccc;
          .point {
            position: absolute;
            top: -0.08rem;
            left: -0.1rem;
            width: 0.2rem;
            height: 0.2rem;
            border-radius: 50%;
            background: white;
            border: 0.01rem solid #ccc;
            box-shadow: 0 0.04rem 0.04rem rgba(0, 0, 0, 0.15);
            .center();
            .small-point {
              width: 0.05rem;
              height: 0.05rem;
              background: black;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .setting-font-family{
      flex:1;
      font-size: 0.14rem;
      .center();
      .setting-font-family-text-wrapper{
          .center();
          .setting-font-family-text{}
      }
      .setting-font-family-icon-wrappe{
          .center();
          .icon-forward{}
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
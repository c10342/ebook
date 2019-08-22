<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
      <transition name="slide-right" v-if="settingVisible === 3">
        <div class="content">
          <div class="content-page-wrapper" v-if="bookAvailable">
            <div class="content-page">
              <component :is="currentTab == 1?content:bookMark"></component>
            </div>
            <div class="content-page-tab">
              <div
                class="content-page-tab-item"
                :class="{'selected': currentTab === 1}"
                @click="selectTab(1)"
              >{{$t('book.navigation')}}</div>
              <div
                class="content-page-tab-item"
                :class="{'selected': currentTab === 2}"
                @click="selectTab(2)"
              >{{$t('book.bookmark')}}</div>
            </div>
          </div>
          <div class="content-empty" v-else>
            <ebook-loading></ebook-loading>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hideTitleAndMenu()"></div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
import EbookSlideContent from "./EbookSlideContent";
import EbookSlideBookmark from "./EbookSlideBookmark";
import EbookLoading from "./EbookLoading";
export default {
  mixins: [ebookMixin],
  components: {
    EbookLoading
  },
  data() {
    return {
      currentTab: 1,
      content: EbookSlideContent,
      bookMark: EbookSlideBookmark
    };
  },
  methods: {
    selectTab(index) {
      this.currentTab = index;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/styles/mixin.less";
.slide-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 300;
  display: flex;
  width: 100%;
  height: 100%;
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    .content-page-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        display: flex;
        flex: 0 0 0.48rem;
        width: 100%;
        height: 0.48rem;
        .content-page-tab-item {
          flex: 1;
          font-size: 0.12rem;
          .center();
        }
      }
    }
    .content-empty {
      width: 100%;
      height: 100%;
      .center();
    }
  }
  .content-empty {
    width: 100%;
    height: 100%;
    .center();
  }
  .content-bg {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
  }
}

.fade-enter-active,
.fade-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.slide-right-enter,
.slide-right-leave-to {
  transform: translate3d(-100%, 0, 0);
  opacity: 0;
}
.slide-right-enter-to,
.slide-right-leave {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
</style>
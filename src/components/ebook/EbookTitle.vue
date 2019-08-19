<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisible">
      <div class="left" @click="back">
        <span class="icon-back icon"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more icon"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    back() {}
  },
  computed: {
    ...mapGetters({
      menuVisible: "book/menuVisible"
    })
  }
};
</script>

<style lang='less' scoped>
@import "../../assets/styles/mixin.less";

.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  display: flex;
  width: 100%;
  height: 0.48rem;
  background: white;
  box-shadow: 0 0.08rem 0.08rem rgba(0, 0, 0, 0.15);
  .icon {
    font-size: @icon-fontSize;
  }
  .left {
    flex: 0 0 0.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 0.4rem;
      .center();
    }
  }
}

.slide-down-enter,
.slide-down-leave-to {
  transform: translate3d(0, -100%, 0);
}
.slide-down-enter-to,
.slide-down-leave {
  transform: translate3d(0, 0, 0);
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s linear;
}
</style>

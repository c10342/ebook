<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper">
      <book-mark :color="color" :width="15" :height="35"></book-mark>
    </div>
  </div>
</template>

<script>
import BookMark from '../common/BookMark'
export default {
    components:{
        BookMark
    },
    data(){
        return {
            text:'abc',
            color:'red'
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/mixin.less";
.ebook-bookmark {
  position: absolute;
  top: -0.35rem;
  left: 0;
  z-index: 200;
  width: 100%;
  height: 0.35rem;
  .ebook-bookmark-text-wrapper {
    position: absolute;
    right: 0.45rem;
    bottom: 0;
    display: flex;
    .ebook-bookmark-down-wrapper {
      font-size: 0.14rem;
      color: white;
      transition: all 0.2s linear;
      .center();
    }
    .ebook-bookmark-text {
      font-size: 0.14rem;
      color: white;
    }
  }
  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 0.15rem;
  }
}
</style>
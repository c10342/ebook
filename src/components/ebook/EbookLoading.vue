<template>
  <div class="ebook-loading">
    <div class="ebook-loading-wrapper">
      <div class="ebook-loading-item" v-for="(item, index) in data" :key="index">
        <div class="ebook-loading-line-wrapper" v-for="(subItem, subIndex) in item" :key="subIndex">
          <div class="ebook-loading-line" ref="line"></div>
          <div class="ebook-loading-mask" ref="mask"></div>
        </div>
      </div>
      <div class="ebook-loading-center"></div>
    </div>
  </div>
</template>

<script>
import { px2rem } from "../../utils/utils";
export default {
  data() {
    return {
      data: [[{}, {}, {}], [{}, {}, {}]],
      maskWidth: [
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 }
      ],
      lineWidth: [
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 }
      ],
      //  透明线或者白线，其中一条线运动标志位
      add: true,
      //   结束标志
      end: false
    };
  },
  mounted() {
    this.task = setInterval(() => {
      this.$refs.mask.forEach((item, index) => {
        const mask = this.$refs.mask[index];
        const line = this.$refs.line[index];
        // 透明线长度
        let maskWidth = this.maskWidth[index];
        // 白线长线
        let lineWidth = this.lineWidth[index];
        // 第一根透明线和白线
        if (index == 0) {
          // 透明线条运动
          if (this.add && maskWidth.value < 16) {
            maskWidth.value++;
            lineWidth.value--;
          } else if (!this.add && lineWidth.value < 16) {
            // 白线运动
            maskWidth.value--;
            lineWidth.value++;
          }
        } else {
          //其他线条
          // 透明线条运动
          if (this.add && maskWidth.value < 16) {
            //   获取上一条透明线条长度
            let PreMaskWidth = this.maskWidth[index - 1];
            if (PreMaskWidth.value >= 8) {
              // 上一条透明线条大于8才开始运动
              maskWidth.value++;
              lineWidth.value--;
            }
          } else if (!this.add && lineWidth.value < 16) {
            //   白色线条运动
            // 获取上一条白色线条长度
            let preLineWidth = this.lineWidth[index - 1];
            if (preLineWidth.value >= 8) {
              maskWidth.value--;
              lineWidth.value++;
            }
          }
        }
        mask.style.width = `${px2rem(maskWidth.value)}rem`;
        mask.style.flex = `0 0 ${px2rem(maskWidth.value)}rem`;
        line.style.width = `${px2rem(lineWidth.value)}rem`;
        line.style.flex = `0 0 ${px2rem(lineWidth.value)}rem`;
        if (index == this.maskWidth.length - 1) {
          if (this.add) {
            if (maskWidth.value == 16) {
              this.end = true;
            }
          } else {
            if (maskWidth.value === 0) {
              this.end = true;
            }
          }
        }
        if (this.end) {
          this.add = !this.add;
          this.end = false;
        }
      });
    }, 10);
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/styles/mixin.less";
.ebook-loading {
  position: relative;
  z-index: 400;
  width: 0.63rem;
  height: 0.4rem;
  background: transparent;
  border: 0.015rem solid #d7d7d7;
  border-radius: 0.03rem;
  .ebook-loading-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    .ebook-loading-item {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 0.07rem 0;
      box-sizing: border-box;
      .ebook-loading-line-wrapper {
        flex: 1;
        padding: 0 0.07rem;
        box-sizing: border-box;
        .left();
        .ebook-loading-line {
          flex: 0 0 0.16rem;
          width: 0.16rem;
          height: 0.02rem;
          background: #d7d7d7;
        }
        .ebook-loading-mask {
          flex: 0 0 0;
          width: 0;
          height: 0.02rem;
        }
      }
    }
    .ebook-loading-center {
      position: absolute;
      left: 50%;
      top: 0;
      width: 0.015rem;
      height: 100%;
      background: #d7d7d7;
    }
  }
}
</style>
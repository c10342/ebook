<template>
  <div class="bookmark" :style="style" ref="bookmark"></div>
</template>

<script>
  import { px2rem } from '../../utils/utils'

  export default {
    props: {
      width: Number,
      height: Number,
      color: String
    },
    computed: {
      style() {
        if (this.color) {
          return {
            borderColor: `${this.color} ${this.color} transparent ${this.color}`
          }
        } else {
          return {}
        }
      }
    },
    methods: {
      refresh() {
        if (this.height && this.width) {
          this.$refs.bookmark.style.borderWidth = `${px2rem(this.height - 5)}rem ${px2rem(this.width / 2)}rem ${px2rem(5)}rem ${px2rem(this.width / 2)}rem`
        }
      }
    },
    mounted() {
      this.refresh()
    }
  }
</script>

<style lang="less" scoped>
@import "../../assets/styles/mixin.less";
  .bookmark {
    width: 0;
    height: 0;
    border-width: 0.5rem 0.1rem 0.1rem 0.1rem;
    border-style: solid;
    border-color: white white transparent white;
  }
</style>
